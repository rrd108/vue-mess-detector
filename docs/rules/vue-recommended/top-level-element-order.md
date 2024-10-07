# Single-file Component Top-level Element Order

Checks if the component always uses `script setup`, `template`, and `style scoped` tags' order consistently. &nbsp;&nbsp;<br /><br />
👉 https://vuejs.org/style-guide/rules-recommended.html#single-file-component-top-level-element-order

## ❓ Why it's good to follow this rule?

- **Consistency:** The rule encourages consistent ordering of `script setup`, `template`, and `style scoped` tags within Vue single-file components. Consistency in code structure makes it easier for developers to navigate and understand the codebase quickly.
- **Readability:** A consistent order of elements improves readability. Developers can quickly locate specific sections of the component without having to search through the entire file.
- **Maintainability:** When all components follow the same structure, it becomes easier to maintain and update the codebase. Developers can expect to find certain elements in specific locations, reducing cognitive load.
- **Collaboration:** A standardized component structure facilitates better collaboration among team members. Everyone knows where to expect certain elements, leading to smoother code reviews and easier pair programming.

## 😱 Examples of code for which this rule will throw a warning

::: warning
Single-File Components (SFCs) should maintain a consistent order of top-level elements: `<script>`, `<template>`, and `<style>`. The following examples illustrate cases where the order is incorrect or missing.
:::

### Example 1: Incorrect Order

```javascript
<template>
  <h1 class="age-input">{{ age }}</h1>
</template>

<script setup>
import { ref } from 'vue';
let age = ref(22);
</script>

<style scoped>
.age-input {
  color: white;
}
</style>
```

In this example, the `<template>` tag appears before the `<script>` tag, which violates the recommended order of top-level elements.

### Example 2: Missing Top-Level Element
```vue
<template>
  <h1 class="age-input">
    22
  </h1>
</template>

<style scoped>
.age-input {
  color: white;
}
</style>
```

In this example, the `<script>` tag is missing entirely, which is also a violation of the required top-level element order.

## 🤩 How to fix it?

:::tip
To comply with the recommended order, ensure that the top-level elements in your SFC are arranged as follows: `<script>`, followed by `<template>`, and then `<style>`.
:::

### Fixing Incorrect Order

```vue
<script setup>
import { ref } from 'vue'
const age = ref(22)
</script>

<template>
  <h1 class="age-input">
    {{ age }}
  </h1>
</template>

<style scoped>
.age-input {
  color: white;
}
</style>
```

### Fixing Missing Top-Level Element

```vue
<script setup>
import { ref } from 'vue'
const age = ref(22)
</script>

<template>
  <h1 class="age-input">
    {{ age }}
  </h1>
</template>

<style scoped>
.age-input {
  color: white;
}
</style>
```

By maintaining the correct order of top-level elements in your SFC, you ensure clarity and consistency, making it easier for others (and yourself) to navigate the code.

## 🛠 How to override?

The default correct order is `script setup`, `template`, and `style scoped`.

There are two possible values for this rule:
- `script-template-style`
- `template-script-style`

You can override through the new `override` option in `.config/vue-mess-detector.json` ⬇️

```json
{
  "override": {
    "topLevelElementOrder": "template-script-style"
  }
}
```
