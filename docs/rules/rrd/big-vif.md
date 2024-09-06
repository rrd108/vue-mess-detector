# Big `v-if`

Checks if the template has a `v-if` with more than 10 lines (warning) or 20 lines (error).
Big `v-if` can be moved out to its own component.

👉 Checkout this article [The Extract Conditional Pattern in Vue](https://michaelnthiessen.com/extract-conditional-pattern) by [Michael Thiessen](https://michaelnthiessen.com/)

## ❓ Why it's good to follow this rule?

- **Readability**: Big `v-if` can be hard to read and understand.
- **Maintainability**: Big `v-if` can be hard to maintain.
- **Testability**: Big `v-if` can be hard to test.

## 😱 Examples of code for which this rule will throw a warning

::: warning
The following code contains a big `v-if` with 14 lines.
:::

```vue
<template>
  <div v-if="!isReady">
    Processing <span>data</span>
    <table>
      <thead>
        <tr>
          <th>data</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items">
          <td>{{ item }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
```

## 🤩 How to fix it?

::: tip
Move out the `v-if` block to its own component.
:::

```vue
<template>
  <ItemsTable v-if="!isReady" :data="items" />
</template>
```
