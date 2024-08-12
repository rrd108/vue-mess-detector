# Component File Name Casing

Checks if the component file name is in PascalCase or kebab-case. &nbsp;&nbsp;<br />
👉 https://vuejs.org/style-guide/rules-strongly-recommended.html#single-file-component-filename-casing

## ❓ Why it's good to follow this rule?

- **Consistency**: It's easier to find a component when you know how it's named.
- **Predictability**: It's easier to predict the name of the component when you know the naming convention.

## 😱 Examples of code for which this rule will throw a warning

::: warning
The following component file name is written in a casing that is neither PascalCase nor kebab-case. This can lead to inconsistencies in naming conventions.
:::

```vue
// Incorrect filename
components/myheader.vue
```

## 🤩 How to fix it?

::: tip
Rename the component file to follow either PascalCase or kebab-case conventions to ensure consistency. Here are examples of valid filenames:
:::

```vue
// Valid filenames
components/MyHeader.vue  // PascalCase
components/my-header.vue  // kebab-case
```
