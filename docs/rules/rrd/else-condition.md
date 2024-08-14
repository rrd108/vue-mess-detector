# `else` conditions

Checks if there are any `else` condition in the `script` block. This is a code smell because it can be hard to read and understand.

## ❓ Why it's good to follow this rule?

- **Readability**: Code without `else` conditions is easier to read and understand.
- **Maintainability**: Code without `else` conditions is easier to maintain and refactor.
- **Testability**: Code without `else` conditions is easier to test.

## 😱 Examples of code for which this rule will throw a warning

::: danger
The following code contains an else clause. It indicates that the logic could potentially be simplified to avoid using the else statement altogether.
:::

```javascript
function checkUserStatus(isLoggedIn) {
  if (isLoggedIn) {
    console.log('Welcome back!')
  }
  else {
    console.log('Please log in.')
  }
}
```

## 🤩 How to fix it?

::: tip
Refactor the code to avoid the else clause by using a guard clause or combining the conditions into a single if statement. This will enhance readability and reduce complexity.
:::

```javascript
function checkUserStatus(isLoggedIn) {
  if (!isLoggedIn) {
    console.log('Please log in.')
    return // Early return to eliminate else
  }
  console.log('Welcome back!')
}
```
