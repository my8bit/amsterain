DEPLOY_OUTPUT="$(netlify deploy -e stage -t $NETLIFY_TOKEN)"
echo $DEPLOY_OUTPUT
URL=$(grep -iIohE 'http?://[^[:space:]]+' <<< $DEPLOY_OUTPUT)
#URL=${URL/http/https}
echo $URL
node node_modules/lighthouse-ci/runlighthouse.js $URL
