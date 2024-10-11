# VMD Action

[![Release](https://img.shields.io/github/v/release/brenoepics/vmd-action?include_prereleases&sort=semver&logo=github)](https://github.com/brenoepics/vmd-action/releases)

:::tip
  To learn more details about the available options it has, check out the [official documentation](https://github.com/brenoepics/vmd-action).
:::

This GitHub Action integrates VMD into your CI pipeline, providing several key features:

- **Relative Analysis**: Highlights new issues in pull requests.
- **PR Comments**: Adds detailed comments on detected issues.
- **Action Summary**: Summarizes analysis results in the GitHub Actions tab.

## Usage

Here is an example on how to use it on your workflow using `npm`, `pnpm`, `yarn` or `bun`:

::: code-group

```yaml [npm]
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

```yaml [pnpm]
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

      - uses: pnpm/action-setup@v4  // [!code ++:5]
        name: Install pnpm
        with:
          run_install: false
          version: 'latest' # delete this line if you have packageManager defined in package.json

      - name: Install Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm' // [!code ++]

      - name: Vue Mess Detector Analysis
        uses: brenoepics/vmd-action@v0.0.6
```

```yaml [yarn]
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
          cache: 'yarn' // [!code ++]

      - name: Vue Mess Detector Analysis
        uses: brenoepics/vmd-action@v0.0.6
```

```yaml [bun]
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

      - name: Install Bun // [!code ++:4]
        uses: oven-sh/setup-bun@v2
        with:
          bun-version: 'latest'

      - name: Vue Mess Detector Analysis
        uses: brenoepics/vmd-action@v0.0.6
```

:::
