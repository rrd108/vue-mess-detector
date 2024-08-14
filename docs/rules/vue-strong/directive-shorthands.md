# Directive Shorthands

Checks if the template is using directive shorthands. &nbsp;&nbsp;<br />
👉 https://vuejs.org/style-guide/rules-strongly-recommended.html#directive-shorthands

::: warning
This rule enforces using directive shorthands for better readability. While the official style guide allows using shorthands "**always** or **never**", this rule will flag non-shorthands as code smell.
:::

## ❓ Why it's good to follow this rule?

- **Readability:** Directive shorthands are easier to read and understand and result in a shorter block of code.
- **Consistency:** Using shorthands makes the code more consistent and easier to maintain.

## 😱 Examples of code for which this rule will throw a warning

::: warning
The following code uses full directive syntax instead of shorthands. This goes against the recommended practice of using directive shorthands for clarity and brevity.
:::

```js
<template v-slot:header> // [!code warning]
  <input
    v-bind:value="newTodoText" // [!code warning]
    v-on:input="addTodo" // [!code warning]
  >
</template>
```

## 🤩 How to fix it?

::: tip
Refactor the code to use directive shorthands. This improves readability and aligns with Vue best practices:
:::

```vue{1,3,4}
<template #header>
  <input
    :value="newTodoText"
    @input="addTodo"
  >
</template>
```
