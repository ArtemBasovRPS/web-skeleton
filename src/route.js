import React, {Component} from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import Core from './components/Core';
import Home from './components/Home';
import About from './components/About';

const routes =(	
	<Route path="/" component={Core}>
    <IndexRoute component={Home}/>
    <Route path="home" component={Home}/>
    <Route path="about" component={About}/>
    <Route path="*" component={Home}/>
  </Route>
)

const Root = () => (
	<Router history={browserHistory} key={Math.random()}>
		{ routes }
	</Router>
)

export default Root;
