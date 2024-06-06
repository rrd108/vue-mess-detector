#!/bin/bash

RED='\e[1;41m'
GREEN='\e[1;42m'
NC='\033[0m' # No Color

# Check if a version type (minor or patch) and dry-run flag are provided as command-line arguments
if [ -z "$1" ] || [ -z "$2" ]; then
  echo "Usage: $0 patch|minor dry-run|publish"
  exit 1
fi

# Check if the provided version type is valid
if [ "$1" != "patch" ] && [ "$1" != "minor" ]; then
  echo "Invalid version type: $1"
  echo "version_type should be 'patch' or 'minor'"
  exit 1
fi

# Check if the provided dry-run flag is valid
if [ "$2" != "dry-run" ] && [ "$2" != "publish" ]; then
  echo "Invalid dry-run flag: $2"
  echo "dry-run flag should be 'dry-run' or 'publish'"
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

    # Perform publishing, pushing, and release creation only if the dry-run flag is not set
    if [ "$2" == "publish" ]; then
      echo "👉 Publishing the new version to npmjs.com"
      yarn publish --new-version "$1"

      # Capture the new version number
      new_version=$(node -p "require('./package.json').version")
      
      echo "👉 Pushing new version to git: $new_version"
      git push vue-mess-detector "v$new_version"

      echo "👉 Creating a new release on GitHub"
      gh release create "v$new_version" --notes "$release_notes"

      # Update the version field in jsr.json
      jq ".version = \"$new_version\"" jsr.json > tmp.json && mv tmp.json jsr.json

      echo "👉 jsr.json updated with the new version: $new_version"

      # Commit the changes to Git
      git add jsr.json
      git commit -m "Bump version to $new_version"

      echo "👉 Changes committed to Git"

      npx jsr publish
      echo "👉 Published the new version to JSR"
    else
      echo "Dry run mode. No publishing or pushing will be performed."
    fi

  else
    echo -e $'\n' "${RED} \u2a2f Repository is not clean. ${NC} Please commit or stash your changes before running this script." $'\n'
    exit 1
  fi
fi