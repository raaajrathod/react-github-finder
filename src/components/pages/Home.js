import React, {Fragment} from "react";
import Users from "../users/Users";
import Search from "../users/Search";
import Clear from "../users/Clear";

const Home = () => (
  <Fragment>
    <Search />
    <Clear />
    <Users />
  </Fragment>
);

export default Home;
