# No Inline Styles

Checks if in an element within the template of an SFC uses a inline style 

## ❓ Why it's good to follow this rule?

**Maintainability:** External CSS makes updates easier and keeps the codebase clean.
**Performance:** Reduces HTML file size and leverages browser caching.
**Consistency:** Ensures a uniform style across the entire website or application.

## 😱 Examples of code for which this rule will throw a warning

::: warning
The following code contains inline `styles` which are not recommended because they increase the html code and do not take advantage of browser caching 
:::

```vue
<template>
  <div style="background-color: #ff0000;">
    <!-- ... -->
  </div>
</template>
```

## 🤩 How to fix it?

::: tip
Using `style` with the `scoped` attribute and creating the necessary classes for the style you want to apply can be a good option.
:::

```vue
<template>
  <div class="bg-primary">
    <!-- ... -->
  </div>
</template>

<style scoped>
.bg-primary {
  background-color: #ff0000;
}
</style>
```
