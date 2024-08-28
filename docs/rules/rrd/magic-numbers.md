# Magic Numbers

Check if there are magic numbers present.

## 📖 What are magic numbers?

Magic numbers are hard-coded numeric values that appear directly in your code without an obvious explanation of their meaning or purpose.

## ❓ Why it's good to follow this rule?

- **Readability:** Magic numbers obscure the meaning of the code. By replacing them with named constants or variables, the code becomes more self-explanatory and easier for others (or your future self) to understand.
- **Testability:** When magic numbers are replaced by named constants, it becomes easier to test the code. You can change the constant's value in one place, making it straightforward to test different scenarios without hunting down every instance of the magic number.
- **Maintainability:** If you need to update the value of a magic number, doing so across the codebase can be error-prone and tedious. By using named constants, you centralize the value, making maintenance easier and less risky.
- **Scalability:** As the project grows, more magic numbers can accumulate, making the code increasingly difficult to manage. Using named constants from the start ensures that the code remains scalable and that changes can be made efficiently.

## 😱 Examples of code for which this rule will throw a warning

::: warning
The following code contains magic numbers. What does 100 mean? Where it came from?
:::

```javascript
if (x > 100) {
  // do something
}
```

## 🤩 How to fix it?

::: tip
Refactor the code to use named constants or variables instead of magic numbers.
:::

```javascript
const MAX_CAPACITY = 100
if (x > MAX_CAPACITY) {
  // do something
}
```
