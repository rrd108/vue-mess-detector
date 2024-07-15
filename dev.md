# Deploy

## NPM

```
yarn build
git status
./deploy.sh minor publish
```

## JSR

`jsr.json` version number should be bumped.

```
npx jsr publish
```

TODO: set up GH Action https://jsr.io/docs/publishing-packages#publishing-from-github-actions
