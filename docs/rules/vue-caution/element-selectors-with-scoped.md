# Element Selectors with Scoped

Prefer class selectors over element selectors in scoped styles, because large numbers of element selectors are slow. &nbsp;&nbsp;<br />
👉 https://vuejs.org/style-guide/rules-use-with-caution.html#element-selectors-with-scoped

### 📊 Benchmark

We created a [benchmarking tool](https://github.com/David-Pena/element-class-selector-benchmark) to compare the performance of class selectors versus element selectors in JavaScript.

The benchmark results clearly indicate that **class selectors consistently outperform element selectors** in terms of speed when applying styles in JavaScript. As the number of HTML elements increases, the time difference between the two selector types becomes more pronounced. Specifically:

- With **10,000 HTML elements**, class selectors are approximately **17% faster (2.5ms)** than element selectors.
- With **20,000 HTML elements**, class selectors are around **12% faster (2.9ms)** than element selectors.
- With **50,000 HTML elements**, class selectors are about **18% faster (13.5)** than element selectors.

> [!IMPORTANT]
> These findings suggest that using class selectors can lead to more efficient performance, especially in scenarios with a large number of elements. Therefore, for better performance in styling large-scale web applications **class selectors should be preferred** over element selectors.

## 😱 Examples of code for which this rule will throw a warning

::: warning
Using element selectors within scoped styles can lead to performance issues and conflicts. The following example demonstrates how element selectors are being used incorrectly within scoped styles:
:::

```vue
<style scoped>
button {
  background-color: blue;
}

div {
  color: red;
}

/* Imagine 10k div-s on the page */
</style>
```

In this example, the `button` and `div` element selectors are applied within a `scoped style` block. This can be problematic because it increases the specificity and the likelihood of performance degradation, especially when there are many such selectors.

## 🤩 How to fix it?

::: tip
To improve performance and avoid conflicts, replace element selectors with class selectors. This ensures that styles are scoped more effectively and are less likely to impact other parts of the application.
:::

```vue
<template>
  <button class="custom-button">
    Click me
  </button>
  <div class="custom-div">
    Content goes here
  </div>
</template>

<style scoped>
.custom-button {
  background-color: blue;
}

.custom-div {
  color: red;
}
</style>
```

In the refactored example, the element selectors have been replaced with class selectors (`.custom-button`, `.custom-div`). This reduces the risk of style conflicts and improves the maintainability and performance of the scoped styles.
