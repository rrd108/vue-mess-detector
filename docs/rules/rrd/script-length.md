# Script Length

Checks if the script section of a Vue component is too long. The default threshold is 100 lines. Between 100 and 200 lines you get a warning, above 200 lines you get an error.

## ❓ Why it's good to follow this rule?

- **Simple Responsibility**: A script that is too long is likely doing too many things. It is better to split your component into smaller components and/or composables.
- **Readability**: Shorter scripts are easier to read and understand. When a script is over 50 lines it does not fit on a single screen, which makes it harder to read. When it is over 100 lines you have to scroll to read it.
- **Maintainability**: Shorter scripts are easier to maintain and refactor.
- **Testability**: Shorter scripts are easier to test.

## 😱 Examples of code for which this rule will throw a warning

::: warning
The following code contains a `<script>` block that exceeds the recommended maximum length of lines, making it difficult to maintain and understand. Long scripts are often a sign that the logic could be better organized or broken down into smaller, more manageable pieces.
:::

```vue
<script setup>
// A long script with repetitive code
console.log('Hello 0')
console.log('Hello 1')
console.log('Hello 2')
console.log('Hello 3')
console.log('Hello 4')
// ...more lines...
console.log('Hello 100')
console.log('Hello 101')
</script>
```

In this example, the `<script>` block contains over 100 lines of code, which can make it challenging to navigate and understand. This can lead to bugs, difficulties in debugging, and a higher chance of introducing errors when modifying the script.

## 🤩 How to fix it?

::: tip
To improve readability and maintainability, consider breaking down the logic into smaller functions or moving some of the code to separate files or composable functions. This keeps the script block concise and easier to manage.
:::

```javascript
// helloMessages.js
export function logHelloMessages(count) {
  for (let i = 0; i < count; i++) {
    console.log(`Hello ${i}`)
  }
}
```

```vue
<script setup>
import { logHelloMessages } from './helloMessages'

logHelloMessages(102)
</script>
```
