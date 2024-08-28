# Props Destructing break reactivity

In Vue, destructuring props lead to reactivity issues and should be avoided. Destructuring props will inadvertently break Vue's reactivity system because Vue relies on accessing properties through the original props object to maintain reactivity.

## 📖 What is props destructuring?

Props destructuring refers to the practice of extracting individual properties from a props object within a Vue component. This is often done to simplify code and make it more readable by directly accessing specific props.

### Vue Specific Considerations:

While destructuring can simplify code in many cases, it lead to issues with Vue's reactivity system. When props are destructured, Vue not be able to track changes to the destructured properties. This is because destructuring creates separate variables that do not maintain a reactive relationship with the original props object.

As a result:

- Reactivity Issues: Changes to the original props will not be reflected in the destructured variables, potentially leading to outdated or incorrect data being used in the component.
- Data Flow: Destructuring can obscure the data flow within the component, making it harder to trace how props are being used or modified.

## ❓ Why it's good to follow this rule?

Destructuring props is not recommended in Vue due to the fact of breaking reactivity and making data flow less transparent. It is best to use the props object directly to ensure correct functionality and maintainability.

## 😱 Examples of code for which this rule will throw a warning

::: warning
The following code destructures props in a Vue component, which will lead to reactivity issues.
:::

```vue
<script setup>
const { propA, propB } = defineProps(['propA', 'propB'])
</script>
```

## 🤩 How to fix it?

::: tip
Do not destructure props in Vue components. Instead, access props directly from the `props` object.
:::

```vue
<script setup>
const props = defineProps(['propA', 'propB'])

const propA = props.propA
const propB = props.propB
</script>
```
