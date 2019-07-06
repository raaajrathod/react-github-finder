import React, {useState} from "react";
import PropTypes from "prop-types";

const Search = props => {
  const [text, setText] = useState("");

  const onChange = e => {
    setText(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    if (text === "") {
      props.showAlert("Please Enter Something", "light");
    } else {
      console.log(text);
      props.searchUsers(text);
      setText("");
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit} action='' className='form'>
        <input
          type='text'
          name='text'
          placeholder='Search Users...'
          value={text}
          onChange={onChange}
        />
        <input
          type='submit'
          value='Search'
          className='btn btn-dark btn-block'
        />
      </form>
    </div>
  );
};

Search.propTypes = {
  searchUsers: PropTypes.func.isRequired,
  showAlert: PropTypes.func.isRequired
};

export default Search;
