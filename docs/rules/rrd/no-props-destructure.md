# Props Destructuring

Check if props are being destructured in a way that might affect readability, maintainability, or functionality.

## 📖 What is props destructuring?

Props destructuring refers to the practice of extracting individual properties from a props object within a Vue component. This is commonly done to simplify code and make it more readable by directly accessing the specific props needed.

### Basic Use Case:

Destructuring props can make the code cleaner by allowing direct access to individual properties:

```
const { someProp, anotherProp } = defineProps();

```

### Vue Specific Considerations:

While destructuring can simplify code in many cases, it can lead to issues with Vue's reactivity system. When props are destructured, Vue may not be able to track changes to the destructured properties. This is because destructuring creates separate variables that do not maintain a reactive relationship with the original props object.

As a result:

- Reactivity Issues: Changes to the original props may not be reflected in the destructured variables, potentially leading to outdated or incorrect data being used in the component.
- Data Flow: Destructuring can obscure the data flow within the component, making it harder to trace how props are being used or modified.

## ❓ Why it's good to follow this rule?

- Readability: Destructuring props can make the code cleaner and more readable by directly accessing individual properties. This can help in understanding the component’s requirements and logic more quickly.
- Maintainability: While destructuring can make the code more readable, excessive or incorrect use of it can obscure where props are coming from and how they are used. This can make maintaining and refactoring the code more difficult.
- Consistency: Using destructuring consistently helps to align with the component’s requirements. However, inconsistent destructuring or using it inappropriately might lead to code that is hard to follow and debug.
- Avoid Overuse: Destructuring too many props or doing it in complex ways might lead to code that’s harder to manage. It’s important to balance between simplifying code and keeping it understandable.
  😱 Examples of code for which this rule will throw a warning

::: warning
The following code destructures the items prop directly inside the setup function without any additional handling. This can lead to confusion about where items are coming from and how they are used.
:::

```vue
<script setup>
const { items } = defineProps();
</script>

<template>
  <ChildComponent :items="items" />
</template>
```

## 🤩 How to fix it?

::: tip Refactor the code to ensure that props are handled appropriately. You can either destructure props in a way that makes their usage clear or handle them in a more controlled manner. Ensure that destructuring is
done consistently and in a way that enhances code readability and maintainability.
:::

```vue
<script setup>
import { computed } from 'vue';
const props = defineProps(['items']);
const filteredItems = computed(() => props.items.filter((item) => item.active));
</script>

<template>
  <ChildComponent :items="filteredItems" />
</template>
```
