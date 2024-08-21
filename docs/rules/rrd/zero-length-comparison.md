# Zero Length Comparison

Check if there is an array or string comparing its length to zero.

## 📖 What is Zero Length Comparison?

Zero Length Comparison refers to the practice of checking if an array or string has any elements by comparing its length to zero (e.g.,` array.length > 0`). While this approach is technically correct, it's not the most idiomatic or efficient way to perform this check in JavaScript.

## ❓ Why it's good to follow this rule?

- **Simplicity:** Using `array.length` directly as a condition (e.g., `if (array.length)`) is simpler and more concise than comparing it to zero. In JavaScript, any number greater than 0 is truthy, so this shorter form achieves the same result.
- **Readability:** The simplified form `if (array.length)` is more idiomatic in JavaScript and immediately conveys the intent to check if the array is non-empty. This makes the code more readable to experienced JavaScript developers.
- **Consistency:** Adopting this rule promotes consistent coding practices across your project. When all developers follow the same pattern for checking non-empty arrays or strings, it becomes easier to read and maintain the codebase.

## 😱 Examples of code for which this rule will throw a warning

::: warning
The following code uses an explicit comparison to zero when checking for a non-empty array. This is unnecessarily verbose and less idiomatic in JavaScript.
:::

```js
if (results.length > 0) {
  console.log('You Won')
}
```

## 🤩 How to fix it?

::: tip
Simplify the condition by using the array's length property directly as a boolean condition. In JavaScript, any number greater than 0 is truthy, so this achieves the same result more concisely.
:::

```js
if (results.length) {
  console.log('You Won')
}
```
