// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add additional webpack configurations.
// For more information refer the docs: https://storybook.js.org/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.

const path = require('path');

const DIR_APP_ROOT = path.resolve( __dirname, '..' );

module.exports = {
  plugins: [
    // your custom plugins
  ],
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
  }
};
