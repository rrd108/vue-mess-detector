# Keyed `v-for`

Checks if the component is using `v-for` without a `key` property. &nbsp;&nbsp;<br />
👉 https://vuejs.org/style-guide/rules-essential.html#use-keyed-v-for

## ❓ Why it's good to follow this rule?

- **Performance** adding a `key` property to the `v-for` loop helps Vue to identify the elements and update only the changed elements.
- In certain situations a missing `key` property can lead to unexpected behavior.

## 😱 Examples of code for which this rule will throw a warning

::: warning
The following code uses `v-for` without a key property, which can lead to rendering issues and decreased performance.
:::

```vue
<template>
  <ul>
    <li v-for="todo in todos">
      {{ todo.text }}
    </li>
  </ul>
</template>
```

## 🤩 How to fix it?

::: tip
Add a `:key` property to the `v-for` directive to uniquely identify each element in the loop.
:::

```vue /3/
<template>
  <ul>
    <li v-for="todo in todos" :key="todo.id">
      {{ todo.text }}
    </li>
  </ul>
</template>
```
