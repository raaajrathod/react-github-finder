import React, {Component} from "react";
import UserItem from "./UserItems";

class Users extends Component {
  state = {
    users: [
      {
        id: "1",
        login: "Raj",
        avatar_url: "https://avatars0.githubusercontent.com/u/1?v=4",
        html_url: "https://github.com/octocat"
      },
      {
        id: "2",
        login: "Raj",
        avatar_url: "https://avatars0.githubusercontent.com/u/1?v=4",
        html_url: "https://github.com/octocat"
      },
      {
        id: "3",
        login: "Raj",
        avatar_url: "https://avatars0.githubusercontent.com/u/1?v=4",
        html_url: "https://github.com/octocat"
      }
    ]
  };
  render() {
    return (
        <div style={userStyle}>
        {this.state.users.map(user => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
    );
  }
}

const userStyle={
    display: "grid",
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap : "1rem"
}

export default Users;
