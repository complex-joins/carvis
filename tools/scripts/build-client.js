const config = require('../webpack.config');
const webpack = require('webpack');
const chalk = require('chalk');

webpack(config).run(function(err, stats) {
  if (err) {
    console.error('Failed to create a production build. Reason:');
    console.error(err.message || err);
    process.exit(1);
  }
  console.log(chalk.green('Compiled successfully.'));
  // console.log(stats);
  console.log();
});
