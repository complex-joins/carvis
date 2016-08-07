const path = require('path');

const nodeModulesPath = path.join(__dirname, '/../node_modules');
const appSrcPath = path.join(__dirname, '/../src/client/index.js');
const appDistPath = path.join(__dirname, '/../dist/client/');
module.exports = {
  devtool: 'eval',
  entry: [
    // require.resolve('webpack-dev-server/client'),
    // require.resolve('webpack/hot/dev-server'),
    // require.resolve('./polyfills'),
    appSrcPath
  ],
  output: {
    // Next line is not used in dev but WebpackDevServer crashes without it:
    path: appDistPath,
    pathinfo: true,
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['', '.js', '.json'],
    alias: {
      // This `alias` section can be safely removed after ejection.
      // We do this because `babel-runtime` may be inside `react-scripts`,
      // so when `babel-plugin-transform-runtime` imports it, it will not be
      // available to the app directly. This is a temporary solution that lets
      // us ship support for generators. However it is far from ideal, and
      // if we don't have a good solution, we should just make `babel-runtime`
      // a dependency in generated projects.
      // See https://github.com/facebookincubator/create-react-app/issues/255
      // 'babel-runtime/regenerator': require.resolve('babel-runtime/regenerator')
    }
  },
  // resolveLoader: {
  //   root: paths.ownNodeModules,
  //   moduleTemplates: ['*-loader']
  // },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint',
        include: appSrcPath,
      }
    ],
    loaders: [
      { test: /\.html$/,
        loader: 'file?name=[name].[ext]'
      },
      {
        test: /\.css$/,
        include: [appSrcPath, nodeModulesPath],
        loader: 'style!css!postcss'
      },
      {
        test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)$/,
        include: [appSrcPath, nodeModulesPath],
        loader: 'file',
      },
      {
        test: /\.js$/,
        include: appSrcPath,
        loader: 'babel',
      },
    ]
  },
  eslint: {
    configFile: path.join(__dirname, 'eslint.js'),
    useEslintrc: false
  },
//   postcss: function() {
//     return [autoprefixer];
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       inject: true,
//       template: paths.appHtml,
//       favicon: paths.appFavicon,
//     }),
//     new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"development"' }),
//     // Note: only CSS is currently hot reloaded
//     new webpack.HotModuleReplacementPlugin()
//   ]
// };

};
