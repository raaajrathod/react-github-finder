import React from "react";

const Clear = props => {
  const {showthisBtn, clearUsers} = props;

  if (showthisBtn) {
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
