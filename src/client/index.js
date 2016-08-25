import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Splash from './splash-components/Splash';
import Auth from './auth-components/Auth';
import authHelper from './auth-components/auth-helpers';
import {LyftAuth, UberAuth, Logout} from './auth-components/AuthComponents';
import MainLayout from './layout-components/MainLayout';
import NoMatch from './layout-components/NoMatch';
import UserProfile from './profile-components/UserProfile';

import { Router, Route, browserHistory, IndexRoute } from 'react-router';

requireAll(require.context('./static/', true, /^\.\/.*/));
function requireAll(r) { r.keys().forEach(r); }

function requireAuth(nextState, replace) {
  if (!authHelper.loggedIn()) {
    replace({
      pathname: '/auth',
      state: { nextPathname: nextState.location.pathname }
    });
  }
}

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={MainLayout}>
      <IndexRoute component={Splash}></IndexRoute>
      <Route path="app" component={App} onEnter={requireAuth}></Route>
      <Route path="auth" component={Auth}></Route>
      <Route path="lyftAuth" component={LyftAuth}></Route>
      <Route path="uberAuth" component={UberAuth}></Route>
      <Route path=":userid/profile" component={UserProfile}></Route>
      <Route path="logout" component={Logout}></Route>
    </Route>
    <Route path="*" component={NoMatch}></Route>
  </Router>
, document.getElementById('app'));
