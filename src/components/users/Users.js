import React from "react";
import UserItem from "./UserItems";
import Spinner from "../spinner/Spinner";
import PropTypes from "prop-types";

const Users = props => {
  const users = props.users;
  const loading = props.loading;

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div style={userStyle}>
        {users.map(user => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
    );
  }
};

const userStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridGap: "1rem"
};

Users.prototype = {
  users: PropTypes.array.isRequired,
};

export default Users;
