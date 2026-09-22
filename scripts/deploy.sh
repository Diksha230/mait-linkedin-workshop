#!/bin/bash
# Builds the deck and republishes it to https://diksha230.github.io/mait-linkedin-workshop/
set -e

cd "$(dirname "$0")/.."
REMOTE=$(git remote get-url origin)

npm run build

cd dist
rm -rf .git
touch .nojekyll
git init -b gh-pages -q
git add -A
git -c user.name="Diksha Singhal" -c user.email="dikshaa.singhal@gmail.com" commit -q -m "Deploy workshop deck"
git push -q --force "$REMOTE" gh-pages
rm -rf .git

echo "Live in about a minute: https://diksha230.github.io/mait-linkedin-workshop/"
