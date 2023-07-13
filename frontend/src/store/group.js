// this gonne be the reducer for group
import csrfFetch from "./csrf";
export const RECEIVE_GROUPS = "groups/RECEIVE_GROUPS";
export const RECEIVE_GROUP = "groups/RECEIVE_GROUP";
export const REMOVE_GROUP = "groups/REMOVE_GROUP";
// export const JOIN_GROUP = "groups/JOIN_GROUP";
// export const LEAVE_GROUP = "groups/LEAVE_GROUP";


const receiveGroups = (groups) => ({
  type: RECEIVE_GROUPS,
  groups,
});

const receiveGroup = (group) => ({
  type: RECEIVE_GROUP,
  group,
});

const removeGroup = (groupId) => ({
  type: REMOVE_GROUP,
  groupId,
});

// const joinGroupAction = (groupId) => ({
//   type: JOIN_GROUP,
//   groupId,
// });

// const leaveGroupAction = (groupId) => ({
//   type: LEAVE_GROUP,
//   groupId,
// });

// export const joinGroup = (groupId) => async (dispatch) => {
//   const res = await csrfFetch(`/api/groups/${groupId}/join`, {
//     method: "POST",
//   });
//   if (res.ok) {
//     dispatch(joinGroupAction(groupId));
//   }
// };

// export const leaveGroup = (groupId) => async (dispatch) => {
//   const res = await csrfFetch(`/api/groups/${groupId}/leave`, {
//     method: "POST",
//   });
//   if (res.ok) {
//     dispatch(leaveGroupAction(groupId));
//   }
// };

// export const getGroup = (groupId) => (state) => {
//   debugger
//   return state?.groups ? state.groups[groupId] : null
//   console.log({result})
//   return result

// }

export const getGroup = (groupId) => (state) => {
  // console.log('hi')
  // console.log(state, groupId)
  return state?.groups && state.groups[groupId] ? state.groups[groupId] : null;
};
// export const getGroup = (groupId) => (dispatch, getState) => {
//   const state = getState();
//   console.log(state, groupId);
//   return state?.groups ? state.groups[groupId] : null;
// };

export const getGroups = (state) => {
  return state?.groups ? Object.values(state.groups) : [];
};


export const fetchGroups = () => async (dispatch) => {
  const res = await fetch("/api/groups");
  const data = await res.json();
  dispatch(receiveGroups(data));
};

export const fetchGroup = (groupId) => async (dispatch) => {
  const res = await fetch(`/api/groups/${groupId}`);
  const data = await res.json();
  dispatch(receiveGroup(data));
};

export const createGroup = (group) => async (dispatch) => {
  // debugger
  const res = await csrfFetch("/api/groups", {
    method: "POST",
    body: JSON.stringify({ group }),
  });
  // debugger
  if (res.ok) {
    let data = await res.json();
    // debugger
    dispatch(receiveGroup(data));
  }
};

export const updateGroup = (group) => async (dispatch) => {
  const res = await csrfFetch(`/api/groups/${group.id}`, {
    method: "PATCH",
    body: JSON.stringify(group),
  });
  const data = await res.json();
  dispatch(receiveGroup(data));
};

export const deleteGroup = (groupId) => async (dispatch) => {
  const res = await csrfFetch(`/api/groups/${groupId}`, {
    method: "DELETE",
  });
  if (res.ok) {
    dispatch(removeGroup(groupId));
  }
};

const groupsReducer = (oldState = {}, action) => {
  switch (action.type) {
    default:
      return oldState;
    // case JOIN_GROUP:
    //   return {
    //     ...oldState,
    //     [action.groupId]: {
    //       ...oldState[action.groupId],
    //       members: [...oldState[action.groupId].members, action.userId],
    //     },
    //   };
    // case LEAVE_GROUP:
    //   return {
    //     ...oldState,
    //     [action.groupId]: {
    //       ...oldState[action.groupId],
    //       members: oldState[action.groupId].members.filter(
    //         (memberId) => memberId !== action.userId
    //       ),
    //     },
    //   };
    case RECEIVE_GROUP:
      // debugger
      return { ...oldState, [action.group.id]: action.group };
    case RECEIVE_GROUPS:
      return { ...oldState, ...action.groups };
    case REMOVE_GROUP:
      const newState = { ...oldState };
      delete newState[action.groupId];
      return newState;
  }
};

export default groupsReducer;
