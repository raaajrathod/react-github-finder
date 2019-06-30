import React, {Component} from "react";

export class Clear extends Component {
    render() {
        const {showthisBtn,clearUsers}=this.props;
        
    if (showthisBtn) {
      return (  
        <div>
          <button
            className='btn btn-block btn-light'
            onClick={clearUsers}>
            Clear
          </button>
        </div>
      );
    } else {
      return "";
    }
  } 
}

export default Clear;
