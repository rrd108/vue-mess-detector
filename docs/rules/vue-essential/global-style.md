# Global Styles

Checks if the component is using global styles instead of `scoped` styles. &nbsp;&nbsp;<br />
👉 https://vuejs.org/style-guide/rules-essential.html#use-component-scoped-styling

## ❓ Why it's good to follow this rule?

- **Maintainability** limiting the `css` for the actual component makes it easier to maintain and understand.
- **Isolation** the component is isolated and has no unwanted effect on the other parts of the application.
- **Reusability** the component can be reused in other parts of the application with exactly the same look and feel.

## 😱 Examples of code for which this rule will throw a warning

::: warning
The following code contains global styles, which may affect other components unintentionally.
:::

```js
<template>
  <h3>Hello World</h3>
</template>

<style> // [!code warning]
h3 {
  background: pink;
}
</style>
```

## 🤩 How to fix it?

::: tip
Refactor the code to use scoped styles by adding the scoped attribute to the `<style>` block.
:::

```js
<template>
  <h3>Hello World</h3>
</template>

<style scoped> // [!code ++]
h3 {
  background: pink;
}
</style>
```
