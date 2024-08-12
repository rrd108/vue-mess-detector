# Single Name Component

Checks if the component name is a single word. &nbsp;&nbsp;<br />
👉 https://vuejs.org/style-guide/rules-essential.html#use-multi-word-component-names

## ❓ Why it's good to follow this rule?

- **Consistency** the component name is consistent with the other components.
- **Readability** the component name is more descriptive about its goal.

## 😱 Examples of code for which this rule will throw a warning

::: warning
The following code defines a component with a single-word name, which does not comply with the recommended naming conventions for Vue components.
:::

```vue
// components/Header.vue
<script setup>
// Component logic here
</script>

<template>
  <h1>Header</h1>
</template>
```

## 🤩 How to fix it?

::: tip
Refactor the component name to use a multi-word format, which improves clarity and avoids potential naming conflicts.
:::

```vue
// components/AppHeader.vue
<script setup>
// Component logic here
</script>

<template>
  <h1>Header</h1>
</template>
```
