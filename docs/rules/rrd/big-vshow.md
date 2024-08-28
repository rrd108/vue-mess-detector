# Big `v-show`

Checks if the template has a `v-show` with more than 10 lines (warning) or 20 lines (error).
Big `v-show` can be moved out to its own component.

## ❓ Why it's good to follow this rule?

- **Readability**: Big `v-show` can be hard to read and understand.
- **Maintainability**: Big `v-show` can be hard to maintain.
- **Testability**: Big `v-show` can be hard to test.

## 😱 Examples of code for which this rule will throw a warning

::: warning
The following code contains a big `v-show` with 14 lines.
:::

```vue
<template>
  <div v-show="!isReady">
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
Move out the `v-show` block to its own component.
:::

```vue
<template>
  <ItemsTable v-show="!isReady" :data="items" />
</template>
```
