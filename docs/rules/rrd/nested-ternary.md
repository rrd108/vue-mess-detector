## Nested Ternary

Checks if the script has nested ternaries.

## ❓ Why it's good to follow this rule?

- **Readability:** Nested ternary operators can quickly become *confusing* due to their compact and complex nature. The reader has to carefully track the conditions and outcomes, which can lead to mistakes or misunderstandings.
- **Error-Prone:** With multiple levels of conditions, it's easy to introduce bugs, especially if the logic needs to be modified or extended later.
- **Difficult to Modify:** Adding new conditions or changing existing ones can become cumbersome. The nested structure often requires significant reworking of the existing code, increasing the risk of errors.
- **Debugging:** It's harder to set breakpoints and step through code that uses nested ternaries. The logic is compressed into a single line, making it difficult to isolate issues or understand the flow.

## 😱 Examples of code for which this rule will throw a warning

::: warning
The following code contains a nested ternary operato.
:::

```vue
<script setup>
const pass = 'Gauranga%)++/='
const isStrong = pass.length > 12 ? pass.includes('%') ? pass.includes('$') : false : false
</script>
```

In this example, the script contains a nested ternary operator.

## 🤩 How to fix it?

::: tip
To improve maintainability, consider refactoring the code by replacing the nested ternary with standalone ternaries, or `if` statements or using `AND` operators, or a dedicated `function`.
:::

```vue
<script setup>
const pass = 'Gauranga%)++/='
let isStrong = false 

// Using standalone ternaries
isStrong = pass.length > 12 ? true : false;
isStrong = isStrong && pass.includes('%') ? true : false

// Using if statements
if (pass.length > 12) {
    if (pass.includes('%')) {
        isStrong = pass.includes('$')
    }
}

// Using AND operators
const isStrong = pass.length > 12 && pass.includes('%') && pass.includes('$')

// Using a dedicated function (when it is much more complex then this example)
function isStrongPassword(pass) {
  if (pass.length < 12) {
    return false
  }
  if(!pass.includes('%')) {
    return false
  }
  return pass.includes('$')
}
</script>
```

All of the above examples are equivalent to the original nested ternary operator, but they are much easier to read and maintain.
