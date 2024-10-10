# VMD Action

Here is an example on how to use it on your workflow using `pnpm`, `npm`, `yarn` or `bun`:

<details>
<summary>pnpm</summary>

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

      - uses: pnpm/action-setup@v4
        name: Install pnpm
        with:
          run_install: false
          version: 'latest' # delete this line if you have packageManager defined in package.json

      - name: Install Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'

      - name: Vue Mess Detector Analysis
        uses: brenoepics/vmd-action@v0.0.6
```

</details>

<details>
<summary>npm</summary>

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

</details>

<details>
<summary>yarn</summary>

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
          cache: 'yarn'

      - name: Vue Mess Detector Analysis
        uses: brenoepics/vmd-action@v0.0.6
```

</details>

<details>
<summary>bun</summary>

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

      - name: Install Bun
        uses: oven-sh/setup-bun@v2
        with:
          bun-version: 'latest'

      - name: Vue Mess Detector Analysis
        uses: brenoepics/vmd-action@v0.0.6
```
</details>

:::tip
  To learn more details about the available options it has, check out the [official documentation](https://github.com/brenoepics/vmd-action).
:::
