# Simple Props Definitions

Checks if the component is using simple props definitions. &nbsp;&nbsp;<br />
👉 https://vuejs.org/style-guide/rules-essential.html#use-detailed-prop-definitions

## ❓ Why it's good to follow this rule?

- **Readability** the component is easier to understand in details.

## 😱 Examples of code for which this rule will throw a warning

::: warning
The following code uses simple props definitions without specifying types, which can lead to unclear prop validation and potential runtime errors.
:::

```vue
<script setup>
const props = defineProps(['status'])
</script>
```

## 🤩 How to fix it?

::: tip
Refactor the code to use detailed props definitions with type annotations to ensure better type safety and clarity.
:::

```vue
<script setup>
const props = defineProps({
  status: String
})
</script>
```
