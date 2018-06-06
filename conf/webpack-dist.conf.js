const webpack = require('webpack');
const conf = require('./gulp.conf');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SplitByPathPlugin = require('webpack-split-by-path');
const autoprefixer = require('autoprefixer');
const OfflinePlugin = require('offline-plugin');
// require('offline-plugin/runtime').install();
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  module: {
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'eslint'
      }
    ],
    loaders: [
      {
        test: /\.(css|scss|sass)$/,
        loaders: [
          'style',
          'css',
          'postcss',
          'sass?sourceMap'
        ]
      },
      {
        test: /.json$/,
        loaders: [
          'json'
        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: [
          'babel'
        ]
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new CopyWebpackPlugin([
      {from: path.resolve(__dirname, '../src/robots.txt')},
      {from: path.resolve(__dirname, '../src/sitemap.txt')},
      {from: path.resolve(__dirname, '../src/_redirects')},
      {from: path.resolve(__dirname, '../src/static'), to: 'static'},
      {from: path.resolve(__dirname, '../src/manifest.json')},
    ]),
    new HtmlWebpackPlugin({
      template: conf.path.src('index.html'),
      inject: true
    }),
    new webpack.DefinePlugin({
      FIREBASE_API_KEY: JSON.stringify(process.env.WEER_FIREBASE_API_KEY),
      FIREBASE_AUTH_DOMAIN: JSON.stringify(process.env.WEER_FIREBASE_AUTH_DOMAIN),
      FIREBASE_DATABASE_URL: JSON.stringify(process.env.WEER_FIREBASE_DATABASE_URL),
      FIREBASE_PROJECT_ID: JSON.stringify(process.env.WEER_FIREBASE_PROJECT_ID),
      FIREBASE_STORAGE_BUCKET: JSON.stringify(process.env.WEER_FIREBASE_STORAGE_BUCKET),
      FIREBASE_MESSEGING_SENDER_ID: JSON.stringify(process.env.WEER_FIREBASE_MESSEGING_SENDER_ID)
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {unused: true, dead_code: true} // eslint-disable-line camelcase
    }),
    new SplitByPathPlugin([{
      name: 'vendor',
      path: path.join(__dirname, '../node_modules')
    }]),
    new OfflinePlugin({
      excludes: ['_redirects']
    })
  ],
  postcss: () => [autoprefixer],
  resolve: {
    packageMains: [
      'module'
    ],
    alias: {
      config: path.resolve(__dirname, `../${conf.path.src('config.json')}`)
    }
  },
  output: {
    path: path.join(process.cwd(), conf.paths.dist),
    filename: '[name]-[chunkhash].js',
    chunkFilename: '[name]-[chunkhash].js'
  },
  entry: {
    app: `./${conf.path.src('index.jsx')}`
  }
};
