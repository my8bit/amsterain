netlify_output=$(netlify deploy -e stage -t $NETLIFY_TOKEN)
url=$(grep -Eo -m 1 '(http|https)://[^/"]+' <<< "$netlify_output")
node node_modules/lighthouse-ci/runlighthouse.js $url