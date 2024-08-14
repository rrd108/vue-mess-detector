# Template Simple Expressions

Checks if the template is using only simple expressions. &nbsp;&nbsp;<br />
👉 https://vuejs.org/style-guide/rules-strongly-recommended.html#simple-expressions-in-templates

## ❓ Why it's good to follow this rule?

- **Simplicity:** Simple expressions are easier to read and understand.
- **Readability:** Simple expressions are easier to read and understand.
- **Consistency:** Using simple expressions makes the code more consistent and easier to maintain.

## 😱 Examples of code for which this rule will throw a warning

::: warning
The following code contains complex expressions within the template, which should be refactored into computed properties or methods.
:::

```vue
<template>
  {{
    fullName.split(' ').map((word) => {
      return word[0].toUpperCase() + word.slice(1)
    }).join(' ')
  }}
</template>
```

## 🤩 How to fix it?

::: tip
Refactor complex expressions into computed properties or methods to improve readability and maintainability.
:::

```vue
<!-- Correct: Simple expression in template -->
<script setup>
const normalizedFullName = computed(() => {
  return fullName.split(' ').map((word) => {
    return word[0].toUpperCase() + word.slice(1)
  }).join(' ')
})
</script>

<template>
  {{ normalizedFullName }}
</template>
```
