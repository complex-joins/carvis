import React from 'react';
import ReactDOM from 'react-dom';
import Splash from './Splash';
import MainLayout from '../layout-components/MainLayout';
import Auth from './auth-components/Auth';
import { Router, Route, browserHistory, IndexRoute} from 'react-router';

requireAll(require.context('../static/', true, /^\.\/.*/));
function requireAll(r) { r.keys().forEach(r); }

ReactDOM.render(
  <Router history={browserHistory}>
    <IndexRoute component={Splash}></IndexRoute>
    {/* <Route component={MainLayout}> */}
    {/* <Route path="auth" component={Auth}></Route> */}
    {/* </Route> */}
    <Route path="*" component={NoMatch}></Route>
  </Router>
  , document.getElementById('app'));
