import React from 'react';

function Loader() {
  return (
    <div className="loader center" style={{fontSize : "100px" , fontWeight : "200"}}>
      <i className="fa fa-cog fa-spin" />
    </div>
  );
}

export default Loader;