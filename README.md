# Vue Mess Detector

A static code analysis tool for detecting code smells and best practice violations in Vue.js and Nuxt.js projects.

## 👥 Core Team

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

## ⬇️ Installation

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
pnpm dlx jsr add @rrd/vue-mess-detector -D

# using yarn
yarn dlx jsr add @rrd/vue-mess-detector -D

# using npm
npx jsr add @rrd/vue-mess-detector --save-dev

# using bun
bunx jsr add @rrd/vue-mess-detector --dev
```

## ⚙️ Usage

If you want to analyze your full project directory.

```bash
npx vue-mess-detector analyze
```

If you want to analyze only your `src/components` directory.

```bash
npx vue-mess-detector analyze ./src/components
```

If you want to analyze only your `src/components/AppHeader.vue` file.

```bash
npx vue-mess-detector analyze ./src/components/AppHeader.vue
```

If you want to exclude some directories add the `--exclude` flag with comma separated list of directories and files to exclude.

```bash
npx vue-mess-detector analyze ./src --exclude=components,Gauranga.vue
```

If you want to ignore *some* rulesets add the `--ignore` flag with comma separated list of rulesets to ignore.

```bash
npx vue-mess-detector analyze ./src --ignore=vue-caution,rrd
```

If you want to apply *only* some rulesets add the `--apply` flag with comma separated list of rulesets to apply.

```bash
npx vue-mess-detector analyze ./src --apply=vue-caution,rrd
```

If you want to *group* the results by file add the `--group` flag with one of the allowed options `file | rule`

```bash
npx vue-mess-detector analyze ./src --group=file
```

If you want to *order* the results by the most problematic file add the `--order` flag with `desc`

```bash
npx vue-mess-detector analyze ./src --group=file --order=desc
```

If you want to see only *errors* add the `--level` flag with `error`

```bash
npx vue-mess-detector analyze ./src --group=file --level=error
```

If you want to store your flags in a configuration file, you can create a `vue-mess-detector.json` file in the root of your project with the following content:

```json
{
  "apply": "vue-strong,rrd",
  "level": "error"
}
```

Then you can run the command without flags:

```bash
npx vue-mess-detector analyze
```

All flags will be read from the configuration file. All missing flags will be set to their default values except if you provide them as flags in the command line.

## 📊 Example output

#### Without `--group` flag (default behavior is to group per rule) ⬇️
![Output Image - Group By Rule](./docs/public/results-per-rule.png)

#### With `--group=file` flag ⬇️
![Output Image - Group By File](./docs/public/results-per-file.png)

## ℹ️ Output explanation

**Group by Rule:** In this view, the first line is highlighted in blue, representing the rule being evaluated. Following this, you'll see blocks of information structured as follows: file path, description, and message.

**Group by File:** In this view, the first line displays the file path being evaluated. Below this, you'll see blocks of information with the following structure: rule, description, and message.

- **Rule**: The blue line that defines the specific rule being evaluated.
- **File**: Shows the path to the file where the rule is applied.
- **Description**: A concise explanation of the rule, often accompanied by a link to relevant documentation for further details.
- **Message**: Indicates the line of code where the rule was violated.

> [!IMPORTANT]
> Yellow messages are warnings, suggesting best practices, while red messages highlight errors that must be corrected.

## 📚 Documentation

> 👉 For more information, see the [documentation](https://vue-mess-detector.webmania.cc/).

## 🤝 How to contribute?

See [CONTRIBUTING.md](https://github.com/rrd108/vue-mess-detector/blob/main/CONTRIBUTING.md) file.
