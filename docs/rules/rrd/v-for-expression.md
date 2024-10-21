# Vfor Expression

Checks if the `v-for` expression is using an expression.

## ❓ Why it's good to follow this rule?

- **Readability:** Expressions in `v-for` make the code harder to read and understand.
- **Maintainability:** Expressions in `v-for` make the code harder to maintain.
- **Performance:** Expressions in `v-for` make the code harder to optimize.

## 😱 Examples of code for which this rule will throw a warning

::: warning
The following code contains an expression in the `v-for` directive.
:::

```vue
<template>
  <div v-for="item in items.filter((config) => config.level === 2)" :key="item.id">
    {{ item.name }}
  </div>
</template>
```

## 🤩 How to fix it?

::: tip
Refactor the code to move the expression to a calculated property.
:::

```vue
<script setup>
const configItems = computed(() => items.filter((config) => config.level === 2))
</script>

<template>
<div v-for="item in configItems" :key="item.id">
  {{ item.name }}
</div>
</template>
```
