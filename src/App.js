import React, {Fragment, Component} from "react";
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

class App extends Component {
  state = {
    users: [],
    user: {},
    repos : [],
    loading: false,
    alert: null
  };
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
  searchUsers = async text => {
    console.log(text);
    this.setState({loading: true});

    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    console.log(process.env.REACT_APP_GITHUB_CLIENT_ID);
    console.log(res);
    this.setState({loading: false, users: res.data.items});
  };

  // Get Single Git hub user
  getUser = async userName => {
    this.setState({loading: true});

    const res = await axios.get(
      `https://api.github.com/users/${userName}?client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    console.log(process.env.REACT_APP_GITHUB_CLIENT_ID);
    console.log(res);
    this.setState({loading: false, user: res.data});
  };


  // Get User Repos 
  getRepos = async userName => {
    this.setState({loading: true});
 
    const res = await axios.get(
      `https://api.github.com/users/${userName}/repos?per_page=5&sorts=created:asc&client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    console.log(process.env.REACT_APP_GITHUB_CLIENT_ID);
    console.log(res);
    this.setState({loading: false, repos: res.data});
  }; 
  // Clear Users

  clearUsers = () => {
    this.setState({users: [], loading: false});
  };

  // show alert
  showAlert = (msg, type) => {
    this.setState({
      alert: {
        msg: msg,
        type: type
      }
    });

    setTimeout(() => this.setState({alert: null}), 2000);
  };

  render() {
    const {users, loading, alert, user, repos} = this.state;
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
                    <Search
                      searchUsers={this.searchUsers}
                      showAlert={this.showAlert}
                    />
                    <Clear
                      clearUsers={this.clearUsers}
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
                    getUser={this.getUser}
                    user={user}
                    loading={loading}
                    getRepos={this.getRepos}
                    repos={repos}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
