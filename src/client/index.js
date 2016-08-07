import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

requireAll(require.context('./static/', true, /^\.\/.*/));
function requireAll(r) { r.keys().forEach(r); }

ReactDOM.render(<App />, document.getElementById('app'));
