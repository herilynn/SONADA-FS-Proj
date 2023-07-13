// // import { async } from "regenerator-runtime";
// import csrfFetch from "./csrf";
// import { RECEIVE_GROUP, REMOVE_GROUP } from "./group";

// export const RECEIVE_MEMBERSHIP = "memberships/RECEIVE_MEMBERSHIP";
// export const REMOVE_MEMBERSHIP = "memberships/REMOVE_MEMBERSHIP";

// export const receiveMembership = (membership) => ({
//     type: RECEIVE_MEMBERSHIP,
//     membership
// })

// export const removeMembership = (membershipId) => ({
//     type: REMOVE_MEMBERSHIP,
//     membershipId
// })

// export const joinGroup = (groupId) => async (dispatch) => {
//     const res = await csrfFetch(`/api/groups/${groupId}/memberships`, {
//         method: "POST",
//         body: JSON.stringify(groupId),
//     });
//     if (res.ok) {
//         let data = await res.json();
//         dispatch(receiveMembership(data));
//     }
// }

// export const leaveGroup = (groupId) => async (dispatch) => {
//     const res = await csrfFetch(`api/memberships/${groupId}`, {
//         method: "DELETE",
//     });
//     if (res.ok) {
//         let data = await res.json();
//         dispatch(removeMembership(data.id));
//     }
// }

// const membershipsReducer = (oldState = {}, action) => {
//     const newState = { ...oldState };
//     switch (action.type) {
//         default:
//             return oldState;
//         case REMOVE_GROUP:
//             for(let membershipId in newState) {
//                 if(newState[membershipId].groupId === action.groupId) 
//                     delete newState[membershipId];
//             }
//             return newState;
//         case RECEIVE_MEMBERSHIP:
//             newState[action.membership.id] = action.membership;
//             return newState;
//         case RECEIVE_GROUP:
//             for(let m_id in action.memberships) {
//                 newState[m_id] ||= action.memberships[m_id];
//             }
//             return newState;
//         case REMOVE_MEMBERSHIP:
//             delete newState[action.membershipId];
//             return newState;
//     }
// };

// export default membershipsReducer;

import csrfFetch from "./csrf";
import { RECEIVE_GROUP, REMOVE_GROUP } from "./group";

export const ADD_MEMBERSHIP = 'memberships/ADD_MEMBERSHIP';
export const REMOVE_MEMBERSHIP = 'memberships/REMOVE_MEMBERSHIP';

export const addMembership = (membership) => ({
    type: ADD_MEMBERSHIP,
    payload: membership
})

export const removeMembership = (membershipId) => ({
    type: REMOVE_MEMBERSHIP,
    membershipId
})

export const joinGroup = (groupId) => async (dispatch) => {
    const response = await csrfFetch(`/api/groups/${groupId}/memberships`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });

    const data = await response.json();

        dispatch(addMembership(data));
}

export const leaveGroup = (groupId) => async (dispatch) => {
    const response = await csrfFetch(`/api/memberships/${groupId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });

    const data = await response.json();
        dispatch(removeMembership(data.id));
}

export const getMemberStatus = (memberId, groupId) => (state) => {
    let grpMemberships = Object.values(state.memberships).filter((mb) => mb.groupId === Number(groupId));
    return !!grpMemberships.find((ele) => ele.memberId === Number(memberId));
}



const membershipsReducer = (state = {}, action) => {
    Object.freeze(state);
    const newState = { ...state };
    switch(action.type) {
        case REMOVE_GROUP:
            for(let membershipId in newState) {
                if(newState[membershipId].groupId === action.groupId) delete newState[membershipId];
            }
            return newState;
        case ADD_MEMBERSHIP:
            newState[action.payload.id] = action.payload;
            return newState;
        case RECEIVE_GROUP:
            for(let m_id in action.payload.memberships) {
                newState[m_id] ||= action.payload.memberships[m_id];
            }
            return newState;
        case REMOVE_MEMBERSHIP:
            delete newState[action.membershipId];
            return newState;
        default:
            return state;

    }
}
export default membershipsReducer;