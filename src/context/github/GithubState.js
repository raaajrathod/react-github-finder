import React, {useReducer} from "react";
import axios from "axios";
import GithubContext from "./githubContext";
import GithubReducer from "./githubReducer";
import {
  SEARCH_USERS,
  SET_ALERT,
  CLEAR_USERS,
  SET_LOADING,
  GET_REPOS,
  GET_USERS,
  REMOVE_ALERT
} from "../types";
  

const GithubState = props => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: null
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  // search Users
  const searchUsers = async text => {
    console.log(text);
    setLoading();

    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    console.log(process.env.REACT_APP_GITHUB_CLIENT_ID);
    console.log(res);

    dispatch({
      type: SEARCH_USERS,
      payload: res.data.items
    });
  };
  // get user
  const getUser = async userName => {
    setLoading();
    const res = await axios.get(
      `https://api.github.com/users/${userName}?client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    console.log(process.env.REACT_APP_GITHUB_CLIENT_ID);
    console.log(res);

    dispatch({
      type: GET_USERS,
      payload: res.data
    });
  };
  // get repos
  const getRepos = async userName => {
    setLoading();
    const res = await axios.get(
      `https://api.github.com/users/${userName}/repos?per_page=5&sorts=created:asc&client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    console.log(process.env.REACT_APP_GITHUB_CLIENT_ID);
    console.log(res);

    dispatch({
      type: GET_REPOS,
      payload: res.data
    });
  };

  // clear users
  const clearUsers = () => {
    dispatch({
      type: CLEAR_USERS,
      payload: []
    });
  };

  // set loading

  const setLoading = () => {
    dispatch({type: SET_LOADING});
  };

  // show alert
  const showAlert = (msg, type) => {
    dispatch({
      type: SET_ALERT,
      payload: {
        msg: msg,
        type: type
      }
    });

    setTimeout(() => {
      dispatch({
        type: REMOVE_ALERT
      });
    }, 2000);
  };

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        alert: state.alert,
        searchUsers,
        clearUsers,
        getUser,
        getRepos,
        showAlert
      }}>
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
