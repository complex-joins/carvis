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
  console.log();
  //
  // console.log('File sizes after gzip:');
  // console.log();
  // var assets = stats.toJson().assets
  //   .filter(asset => /\.(js|css)$/.test(asset.name))
  //   .map(asset => {
  //     var fileContents = fs.readFileSync(paths.appBuild + '/' + asset.name);
  //     return {
  //       name: asset.name,
  //       size: gzipSize(fileContents)
  //     };
  //   });
  // assets.sort((a, b) => b.size - a.size);
  // assets.forEach(asset => {
  //   console.log(
  //     '  ' + chalk.dim('build' + path.sep) + chalk.cyan(asset.name) + ': ' +
  //     chalk.green(filesize(asset.size))
  //   );
  // });
  // console.log();
  //
  // var openCommand = process.platform === 'win32' ? 'start' : 'open';
  // var homepagePath = require(paths.appPackageJson).homepage;
  // if (homepagePath) {
  //   console.log('You can now publish them at ' + homepagePath + '.');
  //   console.log('For example, if you use GitHub Pages:');
  //   console.log();
  //   console.log('  git commit -am "Save local changes"');
  //   console.log('  git checkout -B gh-pages');
  //   console.log('  git add -f build');
  //   console.log('  git commit -am "Rebuild website"');
  //   console.log('  git filter-branch -f --prune-empty --subdirectory-filter build');
  //   console.log('  git push -f origin gh-pages');
  //   console.log('  git checkout -');
  //   console.log();
  // } else {
  //   console.log('You can now serve them with any static server.');
  //   console.log('For example:');
  //   console.log();
  //   console.log('  npm install -g pushstate-server');
  //   console.log('  pushstate-server build');
  //   console.log('  ' + openCommand + ' http://localhost:9000');
  //   console.log();
  // }
  // console.log();
});
