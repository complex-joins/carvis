const indexConfig = require('../webpack/webpack.config.app');
const splashConfig = require('../webpack/webpack.config.splash');
const webpack = require('webpack');
const chalk = require('chalk');

webpack(indexConfig).watch({}, function(err, stats) {
  if (err) {
    console.error('Failed to create a production build. Reason:');
    console.error(err.message || err);
    process.exit(1);
  }
  console.log(stats.toString('errors-only'));

  console.log(chalk.green('Webpack Results: App compiled successfully.'));
  // console.log(stats);
  console.log();
});

webpack(splashConfig).watch({}, function(err, stats) {
  if (err) {
    console.error('Failed to create a production build. Reason:');
    console.error(err.message || err);
    process.exit(1);
  }
  console.log(stats.toString('errors-only'));
  console.log(chalk.green('Webpack Results: Splash compiled successfully.'));
  // console.log(stats);
  console.log();
});
