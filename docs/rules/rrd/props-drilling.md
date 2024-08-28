# Props Drilling

Check if props are being forwarded unmodified to child components.

## 📖 What is props drilling?

Props drilling refers to the practice of passing props from a parent component to a child component without the child component using them directly. Instead, the child component merely forwards these props to its own children, which can lead to unnecessary complexity and decreased maintainability.

👉 Checkout this article [Effective State Management](https://michaelnthiessen.com/effective-state-management) by [Michael Thiessen](https://michaelnthiessen.com/)

## ❓ Why it's good to follow this rule?

- **Clarity:** Forwarding props unmodified can obscure the data flow within your components. By ensuring that props are only passed when necessary, your code becomes clearer and easier to understand.
- **Performance:** Unused props can lead to unnecessary re-renders in child components. Avoiding props drilling can help optimize your application's performance by reducing the number of props that need to be tracked and updated.
- **Maintainability:** When components are designed to manage their own data instead of passing it blindly to children, it becomes easier to maintain and refactor the codebase. This practice reduces dependencies between components, leading to a more modular architecture.
- **State Management:** If a prop is consistently passed down without being modified, it may be a sign that state management should be handled differently—using Vue's `provide/inject` or a store can help streamline data flow.

## 😱 Examples of code for which this rule will throw a warning

::: warning
The following code forwards the `items` prop to `ChildComponent` without modifying it. What does the `items` prop represent? It should be handled differently.
:::

```vue
<script setup>
const props = defineProps(['items'])
</script>

<template>
  <ChildComponent :items="props.items" />
</template>
```

## 🤩 How to fix it?

::: tip
Refactor the code to avoid drilling the prop unmodified. You can either use the prop directly in the parent or use a state management solution (like Pinia or provide/inject) to manage the prop.
:::

```vue
<script setup>
import { computed } from 'vue'
const props = defineProps(['items'])
const filteredItems = computed(() => props.items.filter(item => item.active))
</script>

<template>
  <ChildComponent :items="filteredItems" />
</template>
```
