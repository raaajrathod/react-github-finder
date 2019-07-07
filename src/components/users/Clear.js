import React, {useContext} from "react";
import GithubContext from "../../context/github/githubContext";

const Clear = props => {
  const githubContext = useContext(GithubContext);
  const {clearUsers} = githubContext;

  if (githubContext.users.length > 0) {
    return (
      <div>
        <button className='btn btn-block btn-light' onClick={clearUsers}>
          Clear
        </button>
      </div>
    );
  } else {
    return "";
  }
};

export default Clear;
