import {
  SEARCH_USERS,
  SET_ALERT,
  CLEAR_USERS,
  SET_LOADING,
  GET_REPOS,
  GET_USERS,
  REMOVE_ALERT
} from "../types";

// const GithubReducer=() => {};

export default (state, action) => {
  switch (action.type) {
    case SET_ALERT:
      return {
        ...state,
        alert: action.payload
      };

    case REMOVE_ALERT:
      return {
        ...state,
        alert: null
      };
    case GET_REPOS:
      return {
        ...state,
        repos: action.payload,
        loading: false
      };
    case GET_USERS:
      return {
        ...state,
        user: action.payload,
        loading: false
      };
    case CLEAR_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false
      };
    case SEARCH_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };

    default:
      return state;
  }
};
