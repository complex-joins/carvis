process.env.NODE_ENV = 'development';

var path = require('path');
var chalk = require('chalk');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var execSync = require('child_process').execSync;
var opn = require('opn');
var config = require('../webpack.config');

// Tools like Cloud9 rely on this
const SERVER_PORT = process.env.PORT || 8000;
const WEBPACK_PORT = 3030;


var compiler;

// TODO: hide this behind a flag and eliminate dead code on eject.
// This shouldn't be exposed to the user.


var friendlySyntaxErrorLabel = 'Syntax error:';

function isLikelyASyntaxError(message) {
  return message.indexOf(friendlySyntaxErrorLabel) !== -1;
}

// This is a little hacky.
// It would be easier if webpack provided a rich error object.

function formatMessage(message) {
  return message
    // Make some common errors shorter:
    .replace(
      // Babel syntax error
      'Module build failed: SyntaxError:',
      friendlySyntaxErrorLabel
    )
    .replace(
      // Webpack file not found error
      /Module not found: Error: Cannot resolve 'file' or 'directory'/,
      'Module not found:'
    )
    // Internal stacks are generally useless so we strip them
    .replace(/^\s*at\s.*:\d+:\d+[\s\)]*\n/gm, '') // at ... ...:x:y
    // Webpack loader names obscure CSS filenames
    .replace('./~/css-loader!./~/postcss-loader!', '');
}


function openBrowser(port) {
  if (process.platform === 'darwin') {
    try {
      // Try our best to reuse existing tab
      // on OS X Google Chrome with AppleScript
      execSync('ps cax | grep "Google Chrome"');
      execSync(
        'osascript ' +
        path.resolve(__dirname, '../chrome.applescript') +
        ' http://localhost:' + port + '/'
      );
      return;
    } catch (err) {
      // Ignore e`rrors.
    }
  }
  // Fallback to opn
  // (It will always open new tab)
  opn('http://localhost:' + port + '/');
}

function runDevServer(serverPort, webpackPort) {
  new WebpackDevServer(webpack(config), {
    historyApiFallback: true,
    hot: true, // Note: only CSS is currently hot reloaded
    publicPath: '/',
    quiet: true,
    watchOptions: {
      ignored: /node_modules/
    }
  }).listen(webpackPort, (err, result) => {
    if (err) {
      return console.log(err);
    }

    console.log(chalk.cyan('Starting the development server...'));
    console.log();
    openBrowser(serverPort);
  });
}

runDevServer(SERVER_PORT, WEBPACK_PORT);
