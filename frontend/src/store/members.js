import { RECEIVE_GROUP } from "./group"; 
import { SET_CURRENT_USER } from "./session";

export const getUser = (id) => (state) => {
    if (!state.users) return null;
    return state.users[id];
}

export const getUsers = () => (state) => {
    if (!state.users) return null;
    return state.users;
}

export const usersInGroup = (groupId) => (state) => {
    const members = [];
    if(!state.memberships || !state.users) return [];
    for(let membershipId in state.memberships) {
        let mb = state.memberships[membershipId];

        if(mb.groupId === Number(groupId)) members.push(state.users[mb.memberId]);

    }
    return members;
}

const usersReducer = (oldState = {}, action) => {
    Object.freeze(oldState);
    const newState = { ...oldState};

    switch(action.type) {
        case SET_CURRENT_USER:
            if(action.payload) newState[action.payload.id] = action.payload;
            return newState;
        case RECEIVE_GROUP:
            Object.keys(action.payload.users).forEach(userId => {
                newState[userId] = newState[userId] || action.payload.users[userId];
            });
            return newState;
        default:
            return oldState;
    }

}
export default usersReducer;