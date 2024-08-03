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
