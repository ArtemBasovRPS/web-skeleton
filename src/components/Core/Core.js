import React from 'react';

import Menu from '../Menu';

const Core = (props) => {
  return (
    	<div className="container">
	      <Menu/>
	      {props.children}
      </div>
  )
}

export default Core;
