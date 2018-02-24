const request = require('request');
const {
  LIGHTHOUSE_API_KEY, DEPLOY_PRIME_URL, REVIEW_ID, COMMIT_REF,
  REPO_OWNER, REPO_NAME
} = process.env;

exports.handler = (event, context, callback) => {
  callback(null, {
    statusCode: 200,
    body: ''
  });
  request({
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': LIGHTHOUSE_API_KEY
    },
    json: true,
    url: 'https://lighthouse-ci.appspot.com/run_on_chrome',
    body: {
      testUrl: DEPLOY_PRIME_URL,
      output: 'json',
      addComment: true,
      repo: {
        owner: REPO_OWNER,
        name: REPO_NAME
      },
      pr: {
        number: REVIEW_ID,
        sha: COMMIT_REF
      }
    }
  }, (err, res) => {
    console.log(event);
    console.log(LIGHTHOUSE_API_KEY, DEPLOY_PRIME_URL, REVIEW_ID, COMMIT_REF, REPO_OWNER, REPO_NAME);// eslint-disable-line no-console
    console.log(res.body); // eslint-disable-line no-console
  });
};
