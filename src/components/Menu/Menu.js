import React, {Component} from 'react';
import { Link, browserHistory } from 'react-router';

import './menu.scss';

class Menu extends Component {
  constructor() {
    super()
    
  }

  handleClick = (e) => {
    if (browserHistory.getCurrentLocation().pathname === e.nativeEvent.target.pathname) {
      e.preventDefault()
    }
  }

  render() {
    return (
      <div className="menu">
        <Link onClick={this.handleClick} to='/home' activeStyle={{color:'#53acff'}} >Home</Link>
        <Link onClick={this.handleClick} to='/about' activeStyle={{color:'#53acff'}} >About</Link>
      </div>
    )
  }
}

export default Menu;
