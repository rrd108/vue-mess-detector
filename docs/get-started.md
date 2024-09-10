# Getting Started

Check your Vue and Nuxt projects for code smells and best practice violations with Vue Mess Detector.

:::tip
👉 You are welcome to join our [discord server](https://discord.gg/nXKwzk97jn)
:::

## 💡What is Static Code Analysis?

Static code analysis is a crucial tool for developers to automatically examine source code **without executing** it, helping identify potential bugs, vulnerabilities, and code quality issues early in the development process. By scanning for problematic patterns, it can catch best practice violations, all code paths, not just those executed during testing. While it has limitations like potential false positives and inability to detect runtime errors, static analysis tools are invaluable for improving code quality, maintainability, and security before the code ever runs.

## ❗Why Should You Care?

By incorporating static code analysis into your development workflow, you can:

- **Improve Code Quality**: Identify and address code smells, ensuring your codebase is maintainable, efficient, and easy to understand.
- **Reduce Bugs and Errors**: Catch potential issues before they become problems, saving time and resources in the long run.
- **Streamline Development**: Automate the process of checking for best practices and coding standards, freeing up time for more important tasks.
- **Foster Collaboration**: Establish a common understanding of coding standards and best practices among team members, promoting a culture of quality and consistency.
- **Reduce Technical Debt**: Identify areas of the codebase that need refactoring or improvement, allowing you to address them proactively and avoid accumulating technical debt.
- **Monitor Codebase Health**: Continuously track and assess the quality of your code to maintain high standards.


## ⬇️ Installation

### As a vscode extension

Launch VS Code Quick Open (Ctrl+P), paste the following command, and press enter.

```bash
ext install WebMania.vue-mess-detector
```

👉 https://marketplace.visualstudio.com/items?itemName=WebMania.vue-mess-detector

### From npm registry

::: code-group

```bash [pnpm]
pnpm add vue-mess-detector -D
```

```bash [yarn]
yarn add vue-mess-detector -D
```

```bash [npm]
npm install vue-mess-detector --save-dev
```

```bash [bun]
bun add @rrd/vue-mess-detector --dev
```

:::

### From JSR registry

::: code-group

```bash [deno]
deno add @rrd/vue-mess-detector
```

```bash [pnpm]
pnpm dlx jsr add @rrd/vue-mess-detector -D
```

```bash [yarn]
yarn dlx jsr add @rrd/vue-mess-detector -D
```

```bash [npm]
npx jsr add @rrd/vue-mess-detector --save-dev
```

```bash [bun]
bunx jsr add @rrd/vue-mess-detector --dev
```

:::

::: tip
✨ Well done! A browser window should automatically open for `http://localhost:3000`
:::

## ⚙️ Usage

Basic usage:

```bash
npx vue-mess-detector analyze [path]
```

Options:

| Option      | Description                                                  | Default   | Example                              |
| ----------- | ------------------------------------------------------------ | --------- | ------------------------------------ |
| `[path]`    | Specify directory or file to analyze                         | `./src`   | `./src/components/AppHeader.vue`     |
| `--exclude` | Exclude directories or files (comma-separated)               | None      | `--exclude=components,Gauranga.vue`  |
| `--apply`   | Apply **only** specific rulesets or rules (comma-separated)  | All rules | `--apply=vue-essential,magicNumbers` |
| `--ignore`  | Ignore **only** specific rulesets or rules (comma-separated) | -         | `--ignore=vue-caution,functionSize`  |
| `--group`   | Group results by `file` or `rule`                            | `rule`    | `--group=file`                       |
| `--sort`    | Order results `asc` or `desc`                                | `asc`     | `--sort=desc`                        |
| `--level`   | Show only specific level `error` or all         | all    | `--level=error`                                      |
| `--output`  | Output format `text` or `table` or `json`                    | `text`    | `--output=table`                     |
| `--file-output`  | The name of the file to save output to               | None  | `--file-output=analysis.txt`                |

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

![Output Image - Group By Rule](./public/results-per-rule.png)

#### With `--group=file` flag ⬇️

![Output Image - Group By File](./public/results-per-file.png)

## 🧾 Output explanation

**Group by Rule:** In this view, the first line is highlighted in blue, representing the rule being evaluated. Following this, you'll see blocks of information structured as follows: file path, description, and message.

**Group by File:** In this view, the first line displays the file path being evaluated. Below this, you'll see blocks of information with the following structure: rule, description, and message.

- **Rule**: The blue line that defines the specific rule being evaluated.
- **File**: Shows the path to the file where the rule is applied.
- **Description**: A concise explanation of the rule, often accompanied by a link to relevant documentation for further details.
- **Message**: Indicates the line of code where the rule was violated.

> [!IMPORTANT]
> Yellow messages are warnings, suggesting best practices, while red messages highlight errors that must be corrected.

## 📈 Code Health

![Output Image - Code Health](./public/code-health.png)

According to the number of errors and warnings, and the lines of code in your project, we calculate a health score for your project.
The code health is:

- **low** if the score is under 75%
- **medium** if the score is between 75% and 85%
- **ok** if the score is between 86% and 95%
- **good** if the score is above 95%

## 📋 Rulesets

There are five rulesets available in Vue Mess Detector. Each ruleset has a different purpose and level of strictness.

### ⭐ Vue Essential Ruleset ~ [vue-essential](/rules/vue-essential/index)

These rules help prevent errors, so learn and abide by them at all costs. Exceptions may exist, but should be very rare and only be made by those with expert knowledge of both JavaScript and Vue.

### 👍 Vue Strongly Recommended Ruleset ~ [vue-strong](/rules/vue-strong/index)

**Strongly Recommended** rules have been found to improve readability and/or developer experience in most projects. Your code will still run if you violate them, but violations should be rare and well-justified.

### ✅ Vue Recommended Ruleset ~ [vue-recommended](/rules/vue-recommended/index)

Where multiple, equally good options exist, an arbitrary choice can be made to ensure consistency. In these rules, we describe each acceptable option and suggest a default choice. That means you can feel free to make a different choice in your own codebase, as long as you're consistent and have a good reason. Please do have a good reason though!

### ⚠️ Vue Caution Ruleset ~ [vue-caution](/rules/vue-caution/index)

Some features of Vue exist to accommodate rare edge cases or smoother migrations from a legacy code base. When overused however, they can make your code more difficult to maintain or even become a source of bugs. These rules shine a light on potentially risky features, describing when and why they should be avoided.

### 💻 rrd Ruleset ~ [rrd](/rules/rrd/index)

A collection of rules that balances widely accepted best practices with more specific, opinionated guidelines, offering a comprehensive approach to code quality, allowing developers to choose the rules that best align with their project's style and goals.
