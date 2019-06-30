import React from "react";
import RepoItem from "./RepoItem";

const Repos = props => {
  const {repos} = props;
  return repos.map(repos => <RepoItem repo={repos} key={repos.id} />);
};

export default Repos;
