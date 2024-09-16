# Script Length

Checks if the script section of a Vue component is too long. The default threshold is **100** lines. Between 100 and 200 lines you get a warning, above **200** lines you get an error.

## ❓ Why it's good to follow this rule?

- **Simple Responsibility**: A script that is too long is likely doing too many things. It is better to split your component into smaller components and/or composables.
- **Readability**: Shorter scripts are easier to read and understand. When a script is over 50 lines it does not fit on a single screen, which makes it harder to read. When it is over 100 lines you have to scroll to read it.
- **Maintainability**: Shorter scripts are easier to maintain and refactor.
- **Testability**: Shorter scripts are easier to test.

## 😱 Examples of code for which this rule will throw a warning

::: warning
The following code contains a `<script>` block that exceeds the recommended maximum length of lines. This often indicates that the component is handling too much logic, making it difficult to maintain and understand. It's a sign that the component's responsibilities could be better organized or divided into smaller, more focused components.
:::

```vue
<script setup>
// A long script with complex logic and multiple responsibilities
function fetchData() {
  // Fetching data logic
  // ...
}

function processUserData(user) {
  // Processing user data
  // ...
}

function setupEventListeners() {
  // Setting up event listeners
  // ...
}

// Repetitive and complex code handling multiple concerns
fetchData()
processUserData()
setupEventListeners()
// ...more lines...
</script>
```

In this example, the `<script>` block handles multiple responsibilities, making it challenging to navigate and understand. This can lead to bugs, difficulties in debugging, and a higher chance of introducing errors when modifying the script. Such a script can also be an indication that the component is trying to do too much.

## 🤩 How to fix it?

::: tip
To improve readability and maintainability, consider breaking down the logic into smaller, focused components or moving some of the code to composable functions or utility files. This not only keeps the script block concise but also adheres to the Single Responsibility Principle, where each component or function handles a specific concern.
:::

```js
// utils.js
export function processUserData(user) {
  // Processing user data
  // ...
}

export function setupEventListeners() {
  // Setting up event listeners
  // ...
}
```

```vue
<!-- MyComponent.vue -->
<script setup>
import { processUserData } from './userData'
import { setupEventListeners } from './eventListeners'

processUserData(user)
setupEventListeners()
</script>
```

## 🛠 How to override?
The default max length for this rule is **100** for the warning threshold, and **twice that value** for the error threshold.

You can override through the new `override` option in `vue-mess-detector.json` ⬇️

```json
  {
    // Other flags...
    "override": {
      "maxScriptLength": 250 // the error threshold would be 2 * 250
    }
  }
```
