import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import MainLayout from '../layout-components/MainLayout';
import NoMatch from '../layout-components/NoMatch';
import LyftAuth from './configuration-components/Lyft/LyftAuth';
import UberAuth from './configuration-components/Uber/UberAuth';
import UserDashboard from './dashboard-components/UserDashboard';
import Order from './order-components/Order';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

requireAll(require.context('../static/', true, /^\.\/.*/));
function requireAll(r) { r.keys().forEach(r); }

ReactDOM.render(
  <Router history={browserHistory}>
    <Route component={MainLayout}>
      <Route path="/" component={App}>
        <Route path=":userid/config" component={UserDashboard}>
          <Route path="lyftAuth" component={LyftAuth}></Route>
          <Route path="uberAuth" component={UberAuth}></Route>
        </Route>
        <Route path=":userid/dashboard" component={UserDashboard}></Route>
        <Route path=":userid/order" component={Order}></Route>
      </Route>
      <Route path="*" component={NoMatch}></Route>
    </Route>
  </Router>
, document.getElementById('app'));
