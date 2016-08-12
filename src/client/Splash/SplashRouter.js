import React from 'react';
import ReactDOM from 'react-dom';
import Splash from './Splash';
import MainLayout from '../layout-components/MainLayout';
import NoMatch from '../layout-components/NoMatch';
import Auth from './auth-components/Auth';
import { Router, Route, browserHistory, IndexRoute} from 'react-router';

function requireAll(r) { r.keys().forEach(r); }
requireAll(require.context('../static/splash', true, /^\.\/.*/));
requireAll(require.context('../static/shared', true, /^\.\/.*/));

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={MainLayout}>
      <IndexRoute component={Splash}></IndexRoute>
      <Route path="auth" component={Auth}></Route>
    </Route>
    <Route path="*" component={NoMatch}></Route>
  </Router>
, document.getElementById('splash'));
