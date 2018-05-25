/**
 *  This file contains the variables used in other gulp files
 *  which defines tasks
 *  By design, we only put there very generic config values
 *  which are used in several places to keep good readability
 *  of the tasks
 */

const path = require('path');

/**
 *  The main paths of your project handle these with care
 */
const paths = {
  src: 'src',
  dist: 'dist',
  tmp: '.tmp',
  e2e: 'e2e',
  tasks: 'gulp_tasks'
};

exports.paths = paths;
exports.path = {};

for (const pathName in paths) {
  if (Object.prototype.hasOwnProperty.call(paths, pathName)) {
    const pathJoin = function (...funcArgs) {
      const pathValue = exports.paths[pathName];
      const joinArgs = [pathValue].concat(funcArgs);
      return path.join.apply(this, joinArgs);
    };
    exports.path[pathName] = pathJoin;
  }
}

/**
 *  Common implementation for an error handler of a Gulp plugin
 */
exports.errorHandler = function (title) {
  return function (err) {
    console.log(`[${title}]`, err.toString()); // eslint-disable-line no-console
    this.emit('end');
  };
};
