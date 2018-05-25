const webpack = require('webpack');
const {env: {COMMIT_REF, REVIEW_ID, DEPLOY_PRIME_URL}} = process;

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      COMMIT_REF,
      REVIEW_ID,
      DEPLOY_PRIME_URL
    })
  ]
};
