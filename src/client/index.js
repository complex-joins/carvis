import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Splash from './splash-components/Splash';
import Auth from './auth-components/Auth';
import {LyftCode, LyftAuth, UberAuth, Login} from './auth-components/AuthComponents';
import MainLayout from './layout-components/MainLayout';
import Order from './order-components/Order';
import NoMatch from './layout-components/NoMatch';

import { Router, Route, browserHistory, IndexRoute } from 'react-router';

requireAll(require.context('./static/', true, /^\.\/.*/));
function requireAll(r) { r.keys().forEach(r); }

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={MainLayout}>
      <IndexRoute component={Splash}></IndexRoute>
      <Route path="app" component={App}>
        <Route path="order" component={Order}></Route>
      </Route>
      <Route path="auth" component={Auth}>
        <Route path="login" component={Login}></Route>
        <Route path="lyftPhoneNumber" component={LyftAuth}></Route>
        <Route path="lyftCode" component={LyftCode}></Route>
        <Route path="uberAuth" component={UberAuth}></Route>
      </Route>
    </Route>
    <Route path="*" component={NoMatch}></Route>
  </Router>
, document.getElementById('app'));
