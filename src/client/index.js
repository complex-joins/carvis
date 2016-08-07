
// Copy over HTML files
// require('./main.html');
// require('./codeForm.html');
// require('./phoneForm.html');
// require('./splash.html');
// require('./success.html');
requireAll(require.context('./static/', true, /^\.\/.*/));
// requireAll(require.context('./static/', true, /^\.\/.*\.(jpg|png)$/));


// /\.(html|css|less|scss|js|jpg)$/


// ("./" + expr + "")
function requireAll(r) { r.keys().forEach(r); }
