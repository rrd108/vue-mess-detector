# VFor with Index Key

Checks if there are indexes being used as `key` in `v-for`.

## ❓ Why it's good to follow this rule?

- **Avoid Rendering Issues:** Using unique keys prevents issues with item reordering and re-rendering, ensuring stable and predictable updates.
- **Improve Performance:** Unique keys help Vue.js efficiently update and manage list items, leading to better performance.
- **Enhance Debugging:** Unique keys make it easier to track and resolve rendering issues, simplifying the debugging process.

## 😱 Examples of code for which this rule will throw a warning

::: warning
The following code contains a `v-for` directive that uses the loop index as the `:key`, which is discouraged because it can cause rendering issues when the array changes.
:::

```vue
<template>
  <div v-for="(item, index) in products" :key="index">
    <p>{{ item.name }}</p>
  </div>
</template>
```

## 🤩 How to fix it?

::: tip
To ensure stable rendering and improve performance, use a unique identifier from the items themselves as the `:key`. This could be an id or another unique property.
:::

```vue
<template>
  <div v-for="item in products" :key="item.id">
    <p>{{ item.name }}</p>
  </div>
</template>
```
