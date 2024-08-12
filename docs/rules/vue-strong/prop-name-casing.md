# Prop Name Casing

Checks if the props name is in camelCase. &nbsp;&nbsp;<br />
👉 https://vuejs.org/style-guide/rules-strongly-recommended.html#prop-name-casing

## ❓ Why it's good to follow this rule?

- **Readability**: CamelCase prop names are easier to read and understand.
- **Consistency**: CamelCase prop names are consistent with the naming of files and folders.

## 😱 Examples of code for which this rule will throw a warning

::: warning
The following code defines props using a naming convention that does not comply with `camelCase`. This is not in line with best practices for prop naming.
:::

```vue
<script setup>
const props = defineProps({
  'greeting-text': String, // This should be in camelCase
})
</script>

<template>
  <div>{{ greetingText }}</div>
</template>
```

## 🤩 How to fix it?

::: tip
Refactor the prop names to use `camelCase`, which is the standard convention for naming props in Vue:
:::

```vue
<script setup>
const props = defineProps({
  greetingText: String, // Now in camelCase
})
</script>

<template>
  <div>{{ greetingText }}</div>
</template>
```
