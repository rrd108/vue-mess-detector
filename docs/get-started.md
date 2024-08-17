#  Getting Started

Check your Vue and Nuxt projects for code smells and best practice violations with Vue Mess Detector.

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

If you want to analyze your full project directory.

```bash
npx vue-mess-detector analyze
```

If you want to analyze only your `src/components` directory.

```bash
npx vue-mess-detector analyze ./src/components
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

## 📊 Example output

#### Without `--group` flag (default behavior is to group per rule) ⬇️
![Output Image - Group By Rule](./public/results-per-rule.png)

#### With `--group=file` flag ⬇️
![Output Image - Group By File](./public/results-per-file.png)

## ℹ️ Output explanation

**Group by Rule:** In this view, the first line is highlighted in blue, representing the rule being evaluated. Following this, you'll see blocks of information structured as follows: file path, description, and message.

**Group by File:** In this view, the first line displays the file path being evaluated. Below this, you'll see blocks of information with the following structure: rule, description, and message.

- **Rule**: The blue line that defines the specific rule being evaluated.
- **File**: Shows the path to the file where the rule is applied.
- **Description**: A concise explanation of the rule, often accompanied by a link to relevant documentation for further details.
- **Message**: Indicates the line of code where the rule was violated.

> [!IMPORTANT]
> Yellow messages are warnings, suggesting best practices, while red messages highlight errors that must be corrected.

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
