import React, {Fragment, useState} from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Navbar from "./components/layouts/Navbar";
import Alert from "./components/layouts/Alert";
import Users from "./components/users/Users";
import User from "./components/users/User";
import Search from "./components/users/Search";
import Clear from "./components/users/Clear";
import About from "./components/pages/About";
import axios from "axios";
import "./App.css";

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  // state = {
  //   users: [],
  //   user: {},
  //   repos : [],
  //   loading: false,
  //   alert: null
  // };
  // async componentDidMount() {
  //   this.setState({loading: true});
  //   const res = await axios.get(
  //     `https://api.github.com/users?client_id=${
  //       process.env.REACT_APP_CLIENT_ID
  //     }&client_secret=${process.env.REACT_APP_CLIENT_SECRET}`
  //   );
  //   this.setState({loading: false, users: res.data});
  //   console.log(res.data);
  // }
  // Search Github users
  const searchUsers = async text => {
    console.log(text);
    setLoading(true);

    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    console.log(process.env.REACT_APP_GITHUB_CLIENT_ID);
    console.log(res);
    // this.setState({loading: false, users: res.data.items});
    setUsers(res.data.items);
    setLoading(false);
  };

  // Get Single Git hub user
  const getUser = async userName => {
    // this.setState({loading: true});
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/users/${userName}?client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    console.log(process.env.REACT_APP_GITHUB_CLIENT_ID);
    console.log(res);
    // this.setState({loading: false, user: res.data});
    setUser(res.data);
    setLoading(false);
  };

  // Get User Repos
  const getRepos = async userName => {
    // this.setState({loading: true});
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/users/${userName}/repos?per_page=5&sorts=created:asc&client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    console.log(process.env.REACT_APP_GITHUB_CLIENT_ID);
    console.log(res);
    // this.setState({loading: false, repos: res.data});
    setRepos(res.data);
    setLoading(false);
  };
  // Clear Users

  const clearUsers = () => {
    // this.setState({users: [], loading: false});
    setLoading(false);
    setUsers([]);
  };

  // show alert
  const showAlert = (msg, type) => {
    // this.setState({
    //   alert: {
    //     msg: msg,
    //     type: type
    //   }

    // });

    setAlert({
      msg: msg,
      type: type
    });

    setTimeout(
      () =>
        // this.setState({alert: null})
        setAlert(null),
      2000
    );
  };

  // const {users, loading, alert, user, repos} = this.state;
  return (
    <Router>
      <div className='App'>
        <Navbar />
        <div className='container'>
          <Alert alert={alert} />
          <Switch>
            <Route
              exact
              path='/'
              render={props => (
                <Fragment>
                  <Search searchUsers={searchUsers} showAlert={showAlert} />
                  <Clear
                    clearUsers={clearUsers}
                    showthisBtn={users.length > 0 ? true : false}
                  />
                  <Users loading={loading} users={users} />
                </Fragment>
              )}
            />
            <Route exact path='/about' component={About} />

            <Route
              exact
              path='/user/:login'
              render={props => (
                <User
                  {...props}
                  getUser={getUser}
                  user={user}
                  loading={loading}
                  getRepos={getRepos}
                  repos={repos}
                />
              )}
            />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
