# VMD Action

Here is an example on how to use it on your workflow using `npm`:

:::tip
  To learn how to use it with `pnpm`, `yarn` or `bun`, and more details about the available options it has, check out the [official documentation](https://github.com/brenoepics/vmd-action).
:::

```yaml
name: VMD Analysis

on:
  workflow_dispatch:
  pull_request:
    branches:
      - main
  push:
    branches:
      - main

permissions:
  contents: read
  pull-requests: write

jobs:
  detect-mess:
    runs-on: ubuntu-latest
    name: Detect Vue Mess
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Install Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Vue Mess Detector Analysis
        uses: brenoepics/vmd-action@v0.0.6
```