# Too Many Props

Checks if the component got more then 5 props.

## 😱 Examples of code for which this rule will throw a warning

::: warning
The following code contains a `<script>` block with too many props defined in a component, making it difficult to manage and potentially leading to overly complex components. The recommended maximum number of props is 5.
:::

```vue
<script setup>
const props = defineProps({
  title: String,
  likes: Number,
  link: String,
  shares: Number,
  show: Boolean,
  published: Date
})
</script>
```

In this example, the component defines 6 props, which exceeds the recommended limit of 5. This can make the component harder to maintain and may indicate that the component is handling too much responsibility.

## 🤩 How to fix it?

::: tip
To improve maintainability, consider refactoring the component to reduce the number of props. This can be achieved by either breaking the component into smaller, more focused components, or by grouping related props into a single object prop.
:::

```vue
<script setup>
// Group related props into a single object prop
const props = defineProps({
  meta: {
    title: String,
    link: String,
    published: Date
  },
  interaction: {
    likes: Number,
    shares: Number,
    show: Boolean
  }
})
</script>
```

In the refactored example, the props are grouped into two objects, meta and interaction, reducing the overall number of props and making the component easier to manage and understand.

## 🛠 How to override?

The default max props count for this rule is **5**.

You can override through the new `override` option in `vue-mess-detector.json` ⬇️

```json
{
  "override": {
    "maxPropsCount": 7
  }
}
