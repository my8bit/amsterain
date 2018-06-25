const webpack = require('webpack');
const conf = require('./gulp.conf');
const path = require('path');
const OfflinePlugin = require('offline-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const filenamePrefix = process.env.DEVELOPMENT === 'true' ? '.dev' : '';
const configFileName = `config${filenamePrefix}.json`;
const configPath = `../${conf.path.src(configFileName)}`;

module.exports = {
  module: {
    noParse: [
      /${conf.paths.tmp}/
    ],
    eslint: {
      rules: {
        'no-warning-comments': 'off',
        'no-debugger': 'off',
        'no-console': 'off',
        'no-alert': 'off'
      }
    },
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'eslint'
      }
    ],
    loaders: [
      {
        test: /.json$/,
        loaders: [
          'json'
        ]
      },
      {
        test: /\.(css|scss|sass)$/,
        loaders: [
          'style',
          'css',
          'sass',
          'postcss'
        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: [
          'react-hot',
          'babel-loader?presets[]=react,presets[]=es2015'
        ]
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      FIREBASE_API_KEY: JSON.stringify(process.env.WEER_FIREBASE_API_KEY),
      FIREBASE_AUTH_DOMAIN: JSON.stringify(process.env.WEER_FIREBASE_AUTH_DOMAIN),
      FIREBASE_DATABASE_URL: JSON.stringify(process.env.WEER_FIREBASE_DATABASE_URL),
      FIREBASE_PROJECT_ID: JSON.stringify(process.env.WEER_FIREBASE_PROJECT_ID),
      FIREBASE_STORAGE_BUCKET: JSON.stringify(process.env.WEER_FIREBASE_STORAGE_BUCKET),
      FIREBASE_MESSEGING_SENDER_ID: JSON.stringify(process.env.WEER_FIREBASE_MESSEGING_SENDER_ID),
      DOMAIN: JSON.stringify(process.env.URL) || '\'amsterdam-neerslag.nl\''
    }),
    new HtmlWebpackPlugin({
      template: conf.path.src('index.html'),
      inject: true
    }),
    new PreloadWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new OfflinePlugin()
  ],
  postcss: () => [autoprefixer],
  debug: true,
  devtool: 'eval', // "eval-cheap-module-source-map"
  output: {
    path: path.join(process.cwd(), conf.paths.tmp),
    filename: 'index.js'
  },
  resolve: {
    alias: {
      config: path.resolve(__dirname, configPath)
    }
  },
  entry: [
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client',
    `./${conf.path.src('index.jsx')}`
  ]
};
