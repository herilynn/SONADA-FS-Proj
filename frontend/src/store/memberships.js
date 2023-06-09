// // import { async } from "regenerator-runtime";
import csrfFetch from "./csrf";
import { RECEIVE_GROUP, REMOVE_GROUP } from "./group";

export const RECEIVE_MEMBERSHIP = "memberships/RECEIVE_MEMBERSHIP";
export const REMOVE_MEMBERSHIP = "memberships/REMOVE_MEMBERSHIP";

export const receiveMembership = (membership) => ({
    type: RECEIVE_MEMBERSHIP,
    membership
})

export const removeMembership = (membershipId) => ({
    type: REMOVE_MEMBERSHIP,
    membershipId
})

export const joinGroup = (groupId) => async (dispatch) => {
    const res = await csrfFetch(`/api/groups/${groupId}/memberships`, {
        method: "POST",
        body: JSON.stringify(groupId),
    });
    if (res.ok) {
        let data = await res.json();
        dispatch(receiveMembership(data));
    }
}

export const leaveGroup = (groupId) => async (dispatch) => {
    const res = await csrfFetch(`/api/memberships/${groupId}`, {
        method: "DELETE",
    });
    if (res.ok) {
        let data = await res.json();
        dispatch(removeMembership(data.id));
    }
}

export const getMemberStatus = (memberId, groupId) => (state) => {
    let grpMemberships = Object.values(state.memberships).filter((mb) => mb.groupId === Number(groupId));
    return !!grpMemberships.find((ele) => ele.memberId === Number(memberId));
}

const membershipsReducer = (oldState = {}, action) => {
    Object.freeze(oldState);
    const newState = { ...oldState };
    switch (action.type) {
        default:
            return oldState;
        case REMOVE_GROUP:
            for(let membershipId in newState) {
                if(newState[membershipId].groupId === action.groupId) 
                    delete newState[membershipId];
            }
            return newState;
        case RECEIVE_MEMBERSHIP:
            newState[action.membership.id] = action.membership;
            return newState;
        case RECEIVE_GROUP:
            for(let m_id in action.memberships) {
                newState[m_id] ||= action.memberships[m_id];
            }
            return newState;
        case REMOVE_MEMBERSHIP:
            delete newState[action.membershipId];
            return newState;
    }
};

export default membershipsReducer;
