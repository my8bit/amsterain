DEPLOY_OUTPUT="$(netlify deploy -e stage -t $NETLIFY_TOKEN)"
URL=$(grep -iIohE 'http?://[^[:space:]]+' <<< $DEPLOY_OUTPUT)
URL=${URL/http/https}
node node_modules/lighthouse-ci/runlighthouse.js $URL
