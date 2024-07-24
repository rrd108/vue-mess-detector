# Vue Mess Detector

A static code analysis tool for detecting code smells and best practice violations in Vue.js and Nuxt.js projects.

## Contributors

<table>
  <tr>
    <td align="center" style="border: none;">
      <a href="https://github.com/rrd108">
        <img src="https://github.com/rrd108.png?size=100" width="100px;" alt="rrd"/>
        <br />
        <sub><b>rrd</b></sub>
      </a>
    </td>
    <td align="center" style="border: none;">
      <a href="https://github.com/David-Pena">
        <img src="https://github.com/David-Pena.png?size=100" width="100px;" alt="David-Pena"/>
        <br />
        <sub><b>David Pena</b></sub>
      </a>
    </td>
  </tr>
</table>

## Installation

### As a vscode extension

Launch VS Code Quick Open (Ctrl+P), paste the following command, and press enter.

```
ext install WebMania.vue-mess-detector
```

More info: https://marketplace.visualstudio.com/items?itemName=WebMania.vue-mess-detector

### From npm registry

```bash
# using pnpm
pnpm add vue-mess-detector -D

# using yarn
yarn add vue-mess-detector -D

# using npm
npm install vue-mess-detector --save-dev

# using bun
bun add @rrd/vue-mess-detector --dev
```

### From JSR registry

```bash
# using deno
deno add @rrd/vue-mess-detector

# using pnpm
pnpm pnpm dlx jsr add @rrd/vue-mess-detector -D

# using yarn
yarn dlx jsr add @rrd/vue-mess-detector -D

# using npm
npx jsr add @rrd/vue-mess-detector --save-dev

# using bun
bunx jsr add @rrd/vue-mess-detector --dev
```

## Usage

If you want to analyze your full project directory.

```bash
npx vue-mess-detector analyze
```

If you want to analyze only your `src/components` directory.

```bash
npx vue-mess-detector analyze ./src/components
```

## How to contribute?

See [CONTRIBUTING.md](https://github.com/rrd108/vue-mess-detector/blob/main/CONTRIBUTING.md) file.

## Example output

![Output Image](output.png)

## Rules

### Single Name Component (vue-essential)

Checks if the component name is a single word.
See: https://vuejs.org/style-guide/rules-essential.html#use-multi-word-component-names

### Simple Props Definitions (vue-essential)

Checks if the component is using simple props definitions.
See: https://vuejs.org/style-guide/rules-essential.html#use-detailed-prop-definitions

### Keyed `v-for` (vue-essential)

Checks if the component is using `v-for` without a `key` property.
See: https://vuejs.org/style-guide/rules-essential.html#use-keyed-v-for

### `v-if` With `v-for` (vue-essential)

Checks if the component is using `v-if` with `v-for`.
See: https://vuejs.org/style-guide/rules-essential.html#avoid-v-if-with-v-for

### Global Styles (vue-essential)

Checks if the component is using global styles instead of `scoped` styles.
See: https://vuejs.org/style-guide/rules-essential.html#use-component-scoped-styling

### Component File Name Casing (vue-strong)

Checks if the component file name is in PascalCase or kebab-case.
See: https://vuejs.org/style-guide/rules-strongly-recommended.html#single-file-component-filename-casing

### Self Closing Components (vue-strong)

Checks if the template is using self-closing components.
See: https://vuejs.org/style-guide/rules-strongly-recommended.html#self-closing-components

### Prop Name Casing (vue-strong)

Checks if the props name is in camelCase.
See: https://vuejs.org/style-guide/rules-strongly-recommended.html#prop-name-casing

### Template Simple Expressions (vue-strong)

Checks if the template is using only simple expressions.
See: https://vuejs.org/style-guide/rules-strongly-recommended.html#simple-expressions-in-templates

### Quoted Attribute Values (vue-strong)

Checks if the template is using quoted attribute values.
See: https://vuejs.org/style-guide/rules-strongly-recommended.html#quoted-attribute-values

### Directive Shorthands (vue-strong)

Checks if the template is using directive shorthands.
See: https://vuejs.org/style-guide/rules-strongly-recommended.html#directive-shorthands

> This rule enforces using directive shorthands for better readability. While the official style guide allows using shorthands "**always** or **never**", this rule will flag non-shorthands as code smell.

### Simple computed properties (vue-strong)

Checks if any computed properties are bigger then 5 lines
See: https://vuejs.org/style-guide/rules-strongly-recommended.html#simple-computed-properties

### Cyclomatic Complexity (rrd)

Checks if the cyclomatic complexity of a component is too high. The default threshold is 5. Between 5 and 10 you get a warning, above 10 you get an error.

### Deep Indentation (rrd)

Checks if the indentation of the component is too deep. The default for `tabs` is 5, for `spacees` is 15.

### `else` conditions (rrd)

Checks if there are any `else` condition in the `<script>` block. This is a code smell because it can be hard to read and understand.

### Function Size (rrd)

Checks if functions inside `<script setup>` block are less than 20 lines of code. It handles regular and arrow functions.

### Parameter Count (rrd)

Checks if functions inside `<script setup>` block have less than 4 parameters. It handles regular and arrow functions.

### Plain Script (rrd)

Checks if the script section of a Vue component is not using `<script setup>`

### Script Length (rrd)

Checks if the script section of a Vue component is too long. The default threshold is 100 lines. Between 100 and 200 lines you get a warning, above 200 lines you get an error.

### Short Variable Name (rrd)

Checks if variable names inside `<script setup>` block have less than 4 chars.

### Too many props (rrd)

Checks if the component got more then 5 props.
