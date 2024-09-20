# Huge Files

Checks if the combined length of script, template, and CSS in a Vue component is too long. The default threshold for a warning is **300** lines, and for an error is **twice that length**.

## ❓ Why it's good to follow this rule?

- **Maintainability**: Smaller files are easier to maintain and understand.
- **Readability**: Shorter files are easier to read and navigate.
- **Testability**: Smaller components are easier to test.
- **Reusability**: Smaller, more focused components are more likely to be reusable.

## 😱 Examples of code for which this rule will throw a warning

::: warning
A Vue component file with more than 300 lines of combined script, template, and style content.
:::

## 🤩 How to fix it?

- Split the component into smaller, more focused components.
- Extract complex logic into separate composable functions.
- Move styles to separate CSS files or use a CSS-in-JS solution.
- Consider using mixins or extending base components for shared functionality.

## 🛠 How to override?

The default max file size for this rule is **300** lines for the warning threshold, and **twice that value** for the error threshold.

You can override through the new `override` option in `vue-mess-detector.json` ⬇️

```json
{
  "override": {
    "maxFileSize": 400
  }
}