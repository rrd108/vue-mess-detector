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

## 📋 Rulesets

There are five rulesets available in Vue Mess Detector. Each ruleset has a different purpose and level of strictness.

### ⭐ Vue Essential Ruleset ~ [vue-essential](/rules/vue-essential)

These rules help prevent errors, so learn and abide by them at all costs. Exceptions may exist, but should be very rare and only be made by those with expert knowledge of both JavaScript and Vue.

### 👍 Vue Strongly Recommended Ruleset ~ [vue-strong](/rules/vue-strong)

**Strongly Recommended** rules have been found to improve readability and/or developer experience in most projects. Your code will still run if you violate them, but violations should be rare and well-justified.

### ✅ Vue Recommended Ruleset ~ [vue-recommended](/rules/vue-recommended)

Where multiple, equally good options exist, an arbitrary choice can be made to ensure consistency. In these rules, we describe each acceptable option and suggest a default choice. That means you can feel free to make a different choice in your own codebase, as long as you're consistent and have a good reason. Please do have a good reason though!

### ⚠️ Vue Caution Ruleset ~ [vue-caution](/rules/vue-caution)

Some features of Vue exist to accommodate rare edge cases or smoother migrations from a legacy code base. When overused however, they can make your code more difficult to maintain or even become a source of bugs. These rules shine a light on potentially risky features, describing when and why they should be avoided.

### 💻 rrd Ruleset ~ [rrd](/rules/rrd)

Opinionated rules that enforce a specific style of coding. These rules are not recommended for general use, but can be useful in specific cases.
