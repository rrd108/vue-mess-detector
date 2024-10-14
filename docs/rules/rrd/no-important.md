# No Direct Dom Access

Checks if a component's styles are using the `!important` declaration to enforce styles.

## ❓ Why it's good to follow this rule?

Direct DOM manipulation in Vue components can lead to several issues:

Using `!important` in CSS can lead to several issues:

1. It complicates the cascade of styles, making it harder to understand which styles are being applied.
2. It increases the specificity of rules, leading to maintenance challenges when updating styles.
3. It can make debugging more difficult, as the usual cascade and inheritance rules of CSS are bypassed.
4. It promotes poor coding practices by encouraging developers to rely on `!important` rather than properly managing specificity.

## 😱 Examples of code for which this rule will throw a warning

::: warning
The following code contains the use of `!important`, which is discouraged:
:::


```vue
<template>
  <div class="button">Click Me</div>
</template>

<style scoped>
.button {
  background-color: blue !important; /* Disallowed */
  color: white;
}
</style>
```

## 🤩 How to fix it?

::: tip
Refactor your CSS to avoid using `!important` by managing specificity through proper selectors. Here's how to fix the previous examples:
:::

```vue
<template>
  <div class="button">Click Me</div>
</template>

<style>
.button {
  background-color: blue; /* Removed !important */
  color: white;
}

.special-button {
  background-color: red; /* More specific selector */
}
</style>
```

In this fixed example:

1. We removed the `!important` declaration from the `.button` class.
2. We created a more specific selector (`.special-button`) to override styles when necessary.
3. By relying on proper specificity and structure, we maintain clearer and more manageable CSS.

This approach enhances maintainability, readability, and performance while ensuring that styles are applied correctly without unnecessary overrides.