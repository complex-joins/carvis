import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Splash from './Splash';
import Login from './auth-components/Login';
import Order from './order-components/Order';
import NoMatch from './shared-components/NoMatch';

import { Router, Route, browserHistory, IndexRoute } from 'react-router';

requireAll(require.context('./static/', true, /^\.\/.*/));
function requireAll(r) { r.keys().forEach(r); }

require('bootstrap/dist/css/bootstrap.css');
require('font-awesome/css/font-awesome.css');
require('jquery/dist/jquery.js');
require('bootstrap/dist/js/bootstrap.js');

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Splash}></IndexRoute>
      <Route path="login" component={Login}></Route>
      <Route path="order" component={Order}></Route>
    </Route>
    <Route path="*" component={NoMatch}></Route>
  </Router>
, document.getElementById('app'));

{/* <Route path="/user/:userId" component={User}></Route> */}
