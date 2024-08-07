# Element Selectors with Scoped

Prefer class selectors over element selectors in scoped styles, because large numbers of element selectors are slow. &nbsp;&nbsp;<br />
👉 https://vuejs.org/style-guide/rules-use-with-caution.html#element-selectors-with-scoped

### 📊 Benchmark

We created a [benchmarking tool](https://github.com/David-Pena/element-class-selector-benchmark) to compare the performance of class selectors versus element selectors in JavaScript.

The benchmark results clearly indicate that **class selectors consistently outperform element selectors** in terms of speed when applying styles in JavaScript. As the number of HTML elements increases, the time difference between the two selector types becomes more pronounced. Specifically:

- With **10,000 HTML elements**, class selectors are approximately **17% faster** than element selectors.
- With **20,000 HTML elements**, class selectors are around **12% faster** than element selectors.
- With **50,000 HTML elements**, class selectors are about **18% faster** than element selectors.

> [!IMPORTANT]
> These findings suggest that using class selectors can lead to more efficient performance, especially in scenarios with a large number of elements. Therefore, for better performance in styling large-scale web applications **class selectors should be preferred** over element selectors.
