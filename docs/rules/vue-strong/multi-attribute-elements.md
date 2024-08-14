# Multi-Attribute Elements

Checks that elements with multiple attributes span multiple lines, with one attribute per line.
👉 https://vuejs.org/style-guide/rules-strongly-recommended.html#multi-attribute-elements

## ❓ Why it's good to follow this rule?

- **Readability**: Spreading attributes across multiple lines makes it easier to read and understand the code.
- **Maintainability**: When attributes are on separate lines, it's simpler to add, remove, or modify them without affecting other attributes.
- **Consistency**: Following this convention helps maintain a consistent style across components, making it easier for teams to collaborate.
- **Debugging**: Having one attribute per line makes it easier to identify issues related to specific attributes, especially when debugging.

## 😱 Examples of code for which this rule will throw a warning

::: warning
The following code contains elements with multiple attributes on the same line, which should be refactored so that each attribute is on a separate line.
:::

```vue
<template>
  <div id="app" class="container" style="color: red;" />
  <button type="button" class="btn" @click="handleClick">
    Click me
  </button>
</template>
```

## 🤩 How to fix it?

::: tip
Refactor elements with multiple attributes so that each attribute is placed on its own line to improve readability and maintainability.
:::

```vue
<template>
  <div
    id="app"
    class="container"
    style="color: red;"
  />
  <button
    type="button"
    class="btn"
    @click="handleClick"
  >
    Click me
  </button>
</template>
```
