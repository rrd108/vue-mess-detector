# Cyclomatic Complexity

Checks if the cyclomatic complexity of a component is too high. The default threshold is 5. Between 5 and 10 you get a warning, above 10 you get an error.

## 📖 What is cyclomatic complexity?

Complexity is determined by the number of decision points in a component's `script` block. The decision points are `if`, `else`, `while`, `for`, `while` and `case`. If the complexity is between 5 and 10, you get a warning. If it's above 10, you get an error.

The more decision points a component has, the more complex it is. High complexity can make your code harder to read, test, maintain, and debug. Components in general should be small, simple and focused.

## ❓ Why it's good to follow this rule?

- **Readability:** Components with high complexity are harder to read and understand. By keeping complexity low, you make your code easier to maintain and debug.
- **Testability:** Components with high complexity are harder to test. By keeping complexity low, you make your code easier to test.
- **Maintainability:** Components with high complexity are harder to maintain. By keeping complexity low, you make your code easier to maintain.
- **Scalability:** As your application grows, keeping complexity low helps manage complexity.
- **Performance:** Components with high complexity can be slower to render. By keeping complexity low, you can improve performance.

## 😱 Examples of code for which this rule will throw a warning

::: warning
The following code has a high cyclomatic complexity, which means it contains too many decision points (such as `if`, `for`, `while` statements). High complexity can make the code difficult to understand, maintain, and test.
:::

```vue
<script setup>
if (condition1) {
  if (condition2) {
    // code
  }
  else {
    // code
  }
}
else if (condition3) {
  for (let i = 0; i < 10; i++) {
    // code
  }
}
else {
  while (condition4) {
    // code
  }
}
</script>
```

In this example, the code's cyclomatic complexity is high due to multiple nested conditionals and loops, making the logic harder to follow and increasing the chances of bugs.

## 🤩 How to fix it?

::: tip
To improve the code, consider refactoring to reduce the number of decision points and simplify the logic. You can break down the logic into smaller, more focused functions or components, each with lower complexity.
:::

```vue
<script setup>
import handleCondition1 from './useHandleCondition1'
import handleCondition2 from './useHandleCondition2'

if (condition1) {
  handleCondition1(condition2)
}
else if (condition3) {
  for (let i = 0; i < 10; i++) {
    // simpler code
  }
}
else {
  handleCondition2(condition4)
}
</script>
```

In the refactored example, the complex nested logic is moved into separate functions or composables (`handleCondition1`, `handleCondition2`), reducing the overall cyclomatic complexity of the script. This makes the code more modular, easier to test, and maintain.
