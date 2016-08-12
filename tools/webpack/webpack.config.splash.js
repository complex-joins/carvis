const path = require('path');

const nodeModulesPath = path.join(__dirname, '/../../node_modules');
const appSrcPath = path.join(__dirname, '/../../src/client/Splash/SplashRouter.js');
const appDistPath = path.join(__dirname, '/../../dist/client/');

module.exports = {
  devtool: 'eval',
  entry: appSrcPath,
  output: {
    path: appDistPath,
    pathinfo: true,
    filename: 'splash.bundle.js',
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
        test: /\.min\.css$/,
        include: [appSrcPath, nodeModulesPath],
        loader: 'style!css'
      },
      {
        test: /\.less$/,
        loader: 'style!css!less'
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      }
    ]
  },
  eslint: {
    configFile: path.join(__dirname, 'eslint.js'),
    useEslintrc: false
  },
};
