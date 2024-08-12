# `v-if` With `v-for`

Checks if the component is using `v-if` with `v-for`. &nbsp;&nbsp;<br />
👉 https://vuejs.org/style-guide/rules-essential.html#avoid-v-if-with-v-for

## ❓ Why it's good to follow this rule?

- **Performance** using `v-if` with `v-for` can lead to performance issues.
- **Readability** the component is easier to understand and maintain.

## 😱 Examples of code for which this rule will throw a warning

::: warning
The following code uses `v-if` together with `v-for`, which is not recommended as it can lead to performance issues and inefficient rendering.
:::

```vue
<template>
  <ul>
    <li
      v-for="user in users"
      v-if="user.isActive"
      :key="user.id"
    >
      {{ user.name }}
    </li>
  </ul>
</template>
```

## 🤩 How to fix it?

::: tip
Refactor the code to use a computed property that filters the users before rendering them, eliminating the need for `v-if` within the loop.
:::

```vue
<script setup>
import { computed } from 'vue'

const users = [
  { id: 1, name: 'John Doe', isActive: true },
  { id: 2, name: 'Jane Doe', isActive: false },
  // more users...
]

const activeUsers = computed(() => users.filter(user => user.isActive))
</script>

<template>
  <ul>
    <li v-for="user in activeUsers" :key="user.id">
      {{ user.name }}
    </li>
  </ul>
</template>
```
