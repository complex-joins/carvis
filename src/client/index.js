import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Splash from './splash-components/Splash';
import MainLayout from './layout-components/MainLayout';
import NoMatch from './layout-components/NoMatch';
import UserDashboard from './app-dashboard-components/UserDashboard';
import Order from './app-order-components/Order';
import UberAuth from './app-auth-components/UberAuth/UberAuth';
import LyftAuth from './app-auth-components/LyftAuth/LyftAuth';
import AuthFlow from './app-auth-components/AuthFlow';

import { Router, Route, browserHistory, IndexRoute } from 'react-router';

requireAll(require.context('./static/', true, /^\.\/.*/));
function requireAll(r) { r.keys().forEach(r); }

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={MainLayout}>
      <IndexRoute component={Splash}></IndexRoute>
      <Route path="app" component={App}>
        <Route path="authFlow/:firstAuthVendor/" component={AuthFlow}></Route>
        <Route path="lyftAuth" component={LyftAuth}></Route>
        <Route path="uberAuth" component={UberAuth}></Route>
        <Route path=":userid/dashboard" component={UserDashboard}></Route>
        <Route path=":userid/order" component={Order}></Route>
      </Route>
    </Route>
    <Route path="*" component={NoMatch}></Route>
  </Router>
, document.getElementById('app'));
