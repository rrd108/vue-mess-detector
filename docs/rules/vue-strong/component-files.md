# Component Files

Checks if all components has their own files. &nbsp;&nbsp;<br />
👉 https://vuejs.org/style-guide/rules-strongly-recommended.html#component-files

## ❓ Why it's good to follow this rule?

- **Maintainability:** This helps you to more quickly find a component when you need to edit it or review how to use it.

## 😱 Examples of code for which this rule will throw a warning

::: warning
The following code defines multiple components within a single file. This is against the rule that states each component should be in its own file to maintain clarity and separation of concerns.
:::

```vue
<script setup>
app.component('TodoList', {
  // ...
})

app.component('TodoItem', {
  // ...
})
</script>
```

## 🤩 How to fix it?

::: tip
Refactor the code by creating separate files for each component to adhere to best practices. Here’s how to organize them:
:::

```vue
<!-- components/TodoList.vue -->
<script setup>
// TodoList component logic
</script>
```
```vue
<!-- components/TodoItem.vue -->
<script setup>
// TodoItem component logic
</script>
```
