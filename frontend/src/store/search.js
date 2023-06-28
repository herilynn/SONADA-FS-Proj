import csrfFetch from "./csrf";

export const SEARCH_GROUPS = "groups/SEARCH_GROUPS";

export const getSearchedGroupData = (state) => { //
  const groups = state.search
  if (groups) {
    return Object.values(groups)
  }
  else {
    return null
  }
};

export const filteredGroups = (filtered) => ({
    type: SEARCH_GROUPS,
    filtered,
  });

  export const searchGroups = (query) => async (dispatch) => {
    const res = await csrfFetch("/api/groups/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(query),
    });
    const data = await res.json();
    // debugger;
    dispatch(filteredGroups(data));
    return { res, data };
  };

const searchReducer = (oldState = {}, action) => {
    switch (action.type) {
        default:
            return oldState;
        case SEARCH_GROUPS:
            return { ...action.filtered};
    }
}

export default searchReducer;