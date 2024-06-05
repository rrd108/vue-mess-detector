# Vue Mess Detector

A static code analysis tool for detecting code smells and best practice violations in Vue.js and Nuxt.js projects.

## Installation

```bash
# using pnpm
pnpm add vue-mess-detector -D

# using yarn
yarn add vue-mess-detector -D

# using npm
npm install vue-mess-detector --save-dev
```

## Usage

If you want to analyze your full `src` directory.

```bash
npx vue-mess-detector analyze
```

If you want to analyze only your `src/components` directory.

```bash
npx vue-mess-detector analyze ./src/components
```

## Example output

![Output Image](output.png)

## Rules

### Check Single Name Component (vue-essential)

Checks if the component name is a single word.
See: https://vuejs.org/style-guide/rules-essential.html#use-multi-word-component-names

### Check Global Styles (vue-essential)

Checks if the component is using global styles instead of `scoped` styles.
See: https://vuejs.org/style-guide/rules-essential.html#use-component-scoped-styling

### Check Simple Props Definitions (vue-essential)

Checks if the component is using simple props definitions.
See: See: https://vuejs.org/style-guide/rules-essential.html#use-detailed-prop-definitions

### Check Script Length (rrd)

Checks if the script section of a Vue component is too long. The default threshold is 100 lines. Between 100 and 200 lines you get a warning, above 200 lines you get an error.

### Check Plain Script (rrd)

Checks if the script section of a Vue component is not using `<script setup>`

### Check Cyclomatic Complexity (rrd)

Checks if the cyclomatic complexity of a component is too high. The default threshold is 5. Between 5 and 10 you get a warning, above 10 you get an error.

### Check `else` conditions (rrd)

Checks if there are any `else` condition in the `<script>` block. This is a code smell because it can be hard to read and understand.
