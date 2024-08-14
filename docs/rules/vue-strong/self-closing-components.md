# Self Closing Components

Checks if the template is using self-closing components. &nbsp;&nbsp;<br />
👉 https://vuejs.org/style-guide/rules-strongly-recommended.html#self-closing-components

## ❓ Why it's good to follow this rule?

- **Readability:** Self-closing components are easier to read and understand and result in a shorted code block.
- **Consistency:** Using self-closing components makes the code more consistent and easier to maintain.

## 😱 Examples of code for which this rule will throw a warning

::: warning
The following code does not use self-closing syntax for components that have no content. This can lead to cluttered and less readable code.
:::

```javascript
<template>
  <MyComponent></MyComponent>
</template>

// Or

<template>
  <MyComponent class="center"></MyComponent>
</template>
```

## 🤩 How to fix it?

::: tip
Refactor the components to use self-closing syntax when they have no content to ensure cleaner and more readable code:
:::

```javascript
<template>
  <MyComponent />
</template>

// Or

<template>
  <MyComponent class="center" />
</template>

```
