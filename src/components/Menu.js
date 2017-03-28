import React, {Component} from 'react';
import { Link, browserHistory } from 'react-router';

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
      <div>
        <Link onClick={this.handleClick} to='/home' activeStyle={{color:'#53acff'}} style={{marginRight: '30px'}}>Home</Link>
        <Link onClick={this.handleClick} to='/about' activeStyle={{color:'#53acff'}} >About</Link>
      </div>
    )
  }
}

export default Menu;
