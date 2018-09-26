const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Define paths
const DIR_APP_ROOT = __dirname;

const DIR_PUBLIC = path.resolve( DIR_APP_ROOT, 'public' );
const DIR_SRC = path.resolve( DIR_APP_ROOT, 'client' );

// Webpack configuration
module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: ['react-hot-loader/patch', path.join( DIR_SRC, 'index.js')],
  // entry: path.join(paths.JS, 'index.js'),

  output: {
    path: DIR_PUBLIC,
    filename: 'bundles/app.bundle.js',
    publicPath: '/'
  },

  devServer: {
    contentBase: DIR_PUBLIC,
    hot: true
  },

  // Tell webpack to use html plugin
  plugins: [
  ],
  
  // Loaders configuration telling webpack to use "babel-loader" for .js and .jsx files
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [
          path.resolve( DIR_APP_ROOT, 'client'),
          path.resolve( DIR_APP_ROOT, 'stories'),
          path.resolve( DIR_APP_ROOT, 'node_modules', '@pixel-inspiration' )
        ],
        use: ['babel-loader?compact=false'],
      },
      // CSS loader to CSS files
      {
        test: /\.disable.css|styl$/,
        include: [
          path.resolve( DIR_APP_ROOT, 'client'),
          path.resolve( DIR_APP_ROOT, 'stories'),
          path.resolve( DIR_APP_ROOT, 'node_modules', '@pixel-inspiration' )
        ],
        use: [
          'style-loader', 
          'css-loader?-url&importLoader=1&modules&localIdentName=[path]___[name]__[local]___[hash:base64:5]', 
          'stylus-loader'
        ]
      }
    ],
  },

  // Enable importing JS files without specifying their extenstions
  // So we can write: import MyComponent from './my-component';
  // Instead of: import MyComponent from './my-component.jsx';
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
