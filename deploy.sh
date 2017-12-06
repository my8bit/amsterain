DEPLOY_OUTPUT="$(node_modules/netlify-cli/bin/cli.js deploy -t $NETLIFY_TOKEN -d)"
URL=$(grep -iIohE 'https://[^[:space:]]+' <<< $DEPLOY_OUTPUT)
echo "\033[1mSite is deployed:\033[0m"
echo $URL
node node_modules/lighthouse-ci/runlighthouse.js $URL
