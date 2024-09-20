# Deep Indentation

Checks if the indentation of the component is too deep. The default for `tabs` is 5, for `spaces` is 15.

## 😱 Examples of code for which this rule will throw a warning

::: warning
The following code contains deep indentation, which can make the code harder to read and maintain. Excessive indentation often indicates that the code is doing too much in a single function or component, and it may benefit from refactoring.
:::

```vue
<script setup>
function init() {
  if (condition) {
    for (let i = 0; i < 10; i++) {
      while (anotherCondition) {
        // deeply nested code here
      }
    }
  }
}
</script>
```

In this example, the code inside the `<script>` block is indented too deeply, making it difficult to follow the logic and increasing the chances of errors or misunderstandings.

## 🤩 How to fix it?

::: tip
To improve readability and maintainability, consider refactoring the code by breaking down the logic into smaller, more focused functions or components. This will reduce the need for deep indentation and make the code easier to understand.
:::

```vue
<script setup>
import useHandleCondition from './useHandleCondition'

if (condition) {
  handleLoops()
}

function handleLoops() {
  for (let i = 0; i < 10; i++) {
    useHandleCondition()
  }
}
</script>
```

In the refactored example, the deeply nested logic is moved into a separate function or even a custom composable (like useHandleCondition), which reduces the indentation level and makes the main code more concise and easier to read.

## 🛠 How to override?

The default max tabs for this rule is **5**.

You can override through the new `override` option in `vue-mess-detector.json` ⬇️

```json
{
  "override": {
    "maxTabs": 3
  }
}