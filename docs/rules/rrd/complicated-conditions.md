# Complicated Conditions

Checks if the conditions in the script and template are too complicated. The conditions are evaluated based on the number of logical operations and comparisons. If a condition has more than 4 operations/comparisons, it will report a warning. If it has more than 8, it will report an error.

## ❓ Why it's good to follow this rule?

- **Readability:** Complicated conditions with multiple logical operators and comparisons can be difficult to understand at a glance. This can lead to confusion and potential misinterpretation of the code's intent.
- **Maintainability:** As conditions become more complex, they become harder to modify or extend. Adding new logic or changing existing conditions can be error-prone and time-consuming.
- **Testability:** Complex conditions often require numerous test cases to cover all possible scenarios, making thorough testing more challenging and time-consuming.
- **Debugging:** When issues arise, complicated conditions make it harder to isolate the problem and understand which part of the condition is causing unexpected behavior.
- **Cognitive Load:** Developers need to keep track of multiple variables and their relationships when working with complex conditions, increasing the mental effort required to understand and work with the code.
- **Code Reusability:** Overly complex conditions are often specific to a particular use case, making it difficult to reuse or adapt the logic for other situations.

## 😱 Examples of code for which this rule will throw a warning

::: warning
The following code contains complicated conditions.
:::

```vue
<script setup>
if (isGauranga && !isDisabled && hasPermission && (isAdmin || isModerator) && checkCondition(x, y)) {
  doSomething()
}
</script>

<template>
  <div v-if="(isGauranga && !isDisabled && hasPermission && isModerator) || checkCondition(x, y)">
    {{ message }}
  </div>
</template>
```

## 🤩 How to fix it?

::: tip
Refactor the complicated conditions by breaking them down into smaller, more manageable parts. Use descriptive variable names or functions to encapsulate complex logic and improve readability.
:::

```vue
<script setup>
const hasAccess = hasPermission && (isAdmin || isModerator)
const isEditable = isGauranga && !isDisabled
if (isEditable && hasAccess && checkCondition(x, y)) {
  doSomething()
}
</script>

<template>
  <div v-if="isGauranga && hasAccess || checkCondition(x, y)">
    {{ message }}
  </div>
</template>
```
