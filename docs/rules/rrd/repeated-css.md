# Repeated Css

Checks if any CSS `property: value` pair is repeated in the codebase. 

## ❓ Why it's good to follow this rule?

Repeating CSS properties across multiple components or files can lead to:
1. Inconsistent styling
2. Increased maintenance and change difficulty
3. Larger bundle size

By avoiding repeated CSS, you can improve code maintainability, reduce file sizes, and ensure consistent styling throughout your application.

## 😱 Examples of code for which this rule will throw a warning

::: warning
The following code contains repeated CSS properties in different components:
:::

```vue
<template>
  <div class="component-a">
    <!-- Component content -->
  </div>
</template>

<style scoped>
div {
  background-color: #000;
  color: red;
}
</style>
```

```vue
<template>
  <div class="component-b">
    <!-- Component content -->
  </div>
</template>

<style scoped>
div {
  background-color: #000;
  color: red;
}
</style>
```

Both components have `background-color: #000;` and `color: red;` CSS properties.

## 🤩 How to fix it?

::: tip
Refactor repeated CSS by creating a shared CSS class or CSS variables.
:::

```vue
<template>
  <div class="warning">
    <!-- Component content -->
  </div>
</template>
```

### Use a shared CSS class.

By creating a shared CSS class, you can avoid repeating the same styles across multiple components.

```css
/* style.css */
.warning {
  background-color: #000;
  color: red;
}
```

### Use CSS variables

CSS variables allow you to define custom properties in the CSS file and reuse them across multiple components, classes or files.

```css
/* style.css */
:root {
  --warning-background-color: #000;
  --warning-color: red;
}

.warning {
  background-color: var(--warning-background-color);
  color: var(--warning-color);
}
```



