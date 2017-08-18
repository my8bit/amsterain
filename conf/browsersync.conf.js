const conf = require('./gulp.conf');
const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConf = require('./webpack.conf');
const webpackBundler = webpack(webpackConf);

module.exports = function () {
  let main = {
    server: {
      baseDir: [
        conf.paths.tmp,
        conf.paths.src
      ],
      middleware: [
        webpackDevMiddleware(webpackBundler, {
          // IMPORTANT: dev middleware can't access config, so we should
          // provide publicPath by ourselves
          publicPath: webpackConf.output.publicPath,

          // Quiet verbose output in console
          quiet: true
        }),

        // bundler should be the same as above
        webpackHotMiddleware(webpackBundler)
      ]
    },
    open: false
  };
  if (process.env.PORT &&
    process.env.IP) {
    main = Object.assign(main, {
      port: process.env.PORT,
      host: process.env.IP
    });
  }
  if (process.env.TOMATOES_SERVER_KEY &&
    process.env.TOMATOES_SERVER_CRT) {
    main = Object.assign(main, {
      https: {
        key: path.resolve(process.env.TOMATOES_SERVER_KEY),
        cert: path.resolve(process.env.TOMATOES_SERVER_CRT)
      }
    });
  }
  return main;
};
