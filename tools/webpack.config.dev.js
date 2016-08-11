const path = require('path');
const webpack = require('webpack');

const nodeModulesPath = path.join(__dirname, '/../node_modules');
const appSrcPath = path.join(__dirname, '/../src/client/index.js');
const appDistPath = path.join(__dirname, '/../dist/client/');

module.exports = {
  devtool: 'eval',
  entry: [
    require.resolve('webpack-dev-server/client') + '?/',
    require.resolve('webpack/hot/dev-server'),
    appSrcPath
  ],
  output: {
    path: appDistPath,
    pathinfo: true,
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['', '.jsx', '.js', '.json'],
  },
  resolveLoader: {
    root: nodeModulesPath,
    moduleTemplates: ['*-loader']
  },
  module: {
    loaders: [
      { test: /\.(html)$/,
        loader: 'file?name=[name].[ext]'
      },
      {
        test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)$/,
        loader: 'file?name=[path][name].[ext]&context=./src/client/static',
      },
      {
        test: /\.css$/,
        include: [appSrcPath, nodeModulesPath],
        loader: 'style!css'
      },
      {
        test: /\.less$/,
        loader: 'style!css!less'
      },
      {
        test: /\.jsx?/,
        loader: 'babel',
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ]
};
