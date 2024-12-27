#!/bin/bash

RED='\e[1;41m'
GREEN='\e[1;42m'
NC='\033[0m' # No Color

# Check if a version type (minor or patch) is provided as a command-line argument
if [ -z "$1" ]; then
  echo "Usage: $0 patch|minor"
  exit 1
fi

# Check if the provided version type is valid
if [ "$1" != "patch" ] && [ "$1" != "minor" ]; then
  echo "Invalid version type: $1"
  echo "version_type should be 'patch' or 'minor'"
  exit 1
fi

echo $'\n' "Running Frontend Tests" $'\n'
yarn test
if [ $? -eq 0 ]; then
  echo -e $'\n' "${GREEN} \u2714 All frontend tests passed ${NC}" $'\n'
  PREV_STEP=1
else
  echo -e $'\n' "${RED} \u2a2f Some frontend tests failed ${NC}" $'\n'
  PREV_STEP=0
fi

if [ $PREV_STEP -eq 1 ];then
  echo $'\n' "Check docs for missing rules" $'\n'
  yarn docs:missing
fi

if [ $PREV_STEP -eq 1 ];then
  echo $'\n' "Check rules for missing parts" $'\n'
  yarn rules:missing
fi

if [ $PREV_STEP -eq 1 ];then
  echo $'\n' "Run linter" $'\n'
  yarn lint
fi

if [ $PREV_STEP -eq 1 ];then
  echo $'\n' "Run build to generate dist files" $'\n'
  yarn build
fi

if [ $PREV_STEP -eq 1 ];then
  # Run git status and capture the output
  git_status=$(git status --porcelain)

  # Check if the repository is clean
  if [ -z "$git_status" ]; then
    # Collect release notes from commits since the last release
    last_release=$(git describe --tags --abbrev=0)
    release_notes=$(git log "${last_release}..HEAD" --pretty="%s" | awk -v prefix="* " '/^(feat|fix|docs|test|chore|refactor|style)/{print prefix $0}')

    echo "👉 Publishing the new version to npmjs.com"
    yarn publish --new-version "$1"

    # Capture the new version number
    new_version=$(node -p "require('./package.json').version")
    
    # Update the version field in jsr.json
    jq ".version = \"$new_version\"" jsr.json > tmp.json && mv tmp.json jsr.json

    echo "👉 jsr.json updated with the new version: $new_version"
    # Commit the changes to Git
    git add jsr.json package.json
    git commit -m "Bump version to $new_version"

    echo "👉 Pushing new version to git: $new_version"
    git push origin main
    git push vue-mess-detector "v$new_version"

    echo "👉 Creating a new release on GitHub"
    gh release create "v$new_version" --notes "$release_notes"

  else
    echo -e $'\n' "${RED} \u2a2f Repository is not clean. ${NC} Please commit or stash your changes before running this script." $'\n'
    exit 1
  fi
fi