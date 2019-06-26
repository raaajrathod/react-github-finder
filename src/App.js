import React, {Component} from "react";
import Navbar from "./components/layouts/Navbar";
import Alert from "./components/layouts/Alert";
import Users from "./components/users/Users";
import Search from "./components/users/Search";
import Clear from "./components/users/Clear";
import axios from "axios";
import "./App.css";

class App extends Component {
  state = {
    users: [],
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
    const {users, loading, alert} = this.state;
    return (
      <div className='App'>
        <Navbar />
        <div className='container'>
          <Alert alert={alert} />
          <Search searchUsers={this.searchUsers} showAlert={this.showAlert} />
          <Clear
            clearUsers={this.clearUsers}
            showthisBtn={users.length > 0 ? true : false}
          />
          <Users loading={loading} users={users} />
        </div>
      </div>
    );
  }
}

export default App;
