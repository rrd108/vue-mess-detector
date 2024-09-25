# No Direct Dom Access

Checks if a component is directly accessing the DOM using methods like `getElementById`, `getElementsByClassName`, `getElementsByTagName`, `querySelector`, or `querySelectorAll`.

## ❓ Why it's good to follow this rule?

Direct DOM manipulation in Vue components can lead to several issues:

1. It bypasses Vue's reactive system, potentially causing inconsistencies between the component's state and the DOM.
2. It makes components less reusable and harder to test, as they become tightly coupled to specific DOM structures.
3. It can lead to performance issues, as Vue's virtual DOM diffing algorithm is bypassed.
4. It makes code harder to maintain and reason about, as the component's behavior is split between template/reactive data and imperative DOM manipulations.

## 😱 Examples of code for which this rule will throw a warning

::: warning
The following code contains direct DOM access, which is discouraged in Vue components:
:::

```vue
<script setup>
function handleClick() {
  const element = document.getElementById('myElement')
  element.style.color = 'red'
}
</script>
```

## 🤩 How to fix it?

::: tip
Refactor your code to use Vue's reactive system and template bindings instead of direct DOM manipulation. Here's how to fix the previous example:
:::

```vue
<script setup>
import { ref } from 'vue'

const elementColor = ref('black')

function handleClick() {
  elementColor.value = 'red'
}
</script>

<template>
  <div :style="{ color: elementColor }">My Element</div>
</template>
```

In this fixed example:

1. We use a template binding (`:style`) to control the element's color.
2. We create a reactive `ref` called `elementColor` to store the color state.
3. Instead of directly manipulating the DOM, we update the `elementColor` ref.
4. Vue's reactivity system automatically updates the DOM when the `elementColor` value changes.

This approach leverages Vue's strengths, making the code more maintainable, reusable, and performant. It also ensures that the component's state and the DOM remain in sync.