// this gonne be the reducer for group 
import csrfFetch from "./csrf"
export const RECEIVE_GROUPS = 'groups/RECEIVE_GROUPS'
export const RECEIVE_GROUP = 'groups/RECEIVE_GROUP'
export const REMOVE_GROUP = 'groups/REMOVE_GROUP'
export const SEARCH_GROUPS = 'groups/SEARCH_GROUPS'


const receiveGroups = (groups) => ({
  type: RECEIVE_GROUPS,
  groups
})

const receiveGroup = (group) => ({
  type: RECEIVE_GROUP,
  group
})

const removeGroup = (groupId) => ({
  type: REMOVE_GROUP,
  groupId
})

const addSearchGroups = (payload) => ({
  type: SEARCH_GROUPS,
  payload
})

export const getGroup = (groupId) => (state) => {
  return state?.groups ? state.groups[groupId] : null
}

export const getGroups = (state) => {
  return state?.groups ? Object.values(state.groups) : []
}

export const searchGroups = (query) => async (dispatch) => {
  const res = await csrfFetch('/api/groups/search', {
    method: 'POST',
    headers: {
      'Content-Type': "application/json",
      'Accept': "application/json"
    },
    body: JSON.stringify(query)
  });
  const data = await res.json();
  dispatch(addSearchGroups(data));
  return {res, data}
}

export const fetchGroups = () => async (dispatch) => {
  const res = await fetch('/api/groups')
  const data = await res.json()
  dispatch(receiveGroups(data))
}

export const fetchGroup = (groupId) => async (dispatch) => {
  const res = await fetch(`/api/groups/${groupId}`)
  const data = await res.json()
  dispatch(receiveGroup(data))
}

export const createGroup = (group) => async (dispatch) => {
  const {userId, title, description, location} = group; 
  const res = await csrfFetch('/api/groups', {
    method: 'POST',
    body: JSON.stringify({
      owner_id: userId,
      title,
      description,
      location,
    }),
  });
  if (res.ok) {
    let data = await res.json()
    dispatch(receiveGroup(data))
  }
}

export const updateGroup = (group) => async (dispatch) => {
  const res = await csrfFetch(`/api/groups/${group.id}`, {
    method: 'PATCH',
    body: JSON.stringify(group)
  })
  const data = await res.json()
  dispatch(receiveGroup(data))
}

export const deleteGroup = (groupId) => async (dispatch) => {
  const res = await csrfFetch(`/api/groups/${groupId}`, {
    method: 'DELETE'
  })
  dispatch(removeGroup(groupId))
}

const groupsReducer = (oldState = {}, action) => {
  switch (action.type) {
    default:
      return oldState;
    case RECEIVE_GROUP:
      return {...oldState, [action.group.id]: action.group};
    case RECEIVE_GROUPS:
      return {...oldState, ...action.groups};
    case REMOVE_GROUP:
      const newState = {...oldState}
      delete newState[action.groupId]
      return newState;
    case SEARCH_GROUPS:
      return {...oldState, searchGroups: action.payload};
  }
}

export default groupsReducer