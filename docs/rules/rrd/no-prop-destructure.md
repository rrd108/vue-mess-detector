# Runtime Props Destructuring Breaks Reactivity

Vue 3.5 introduced Reactive Props Destructure: variables destructured directly from the `defineProps()` compiler macro remain reactive. Destructuring a runtime `props` object still creates plain variables and loses reactivity.

## 📖 What is unsafe props destructuring?

The Vue compiler can transform a direct `defineProps()` destructure in Vue 3.5+, but it cannot preserve reactivity when a props object is assigned first and destructured in a separate statement.

As a result:

- Changes to the original prop are not reflected in variables destructured from the runtime object.
- The code looks reactive even though it holds a stale value, which makes data flow harder to reason about.

## ❓ Why is this rule useful?

This rule catches only runtime props-object destructuring. Direct `defineProps()` destructuring is intentionally allowed for Vue 3.5+ projects.

## 😱 Example that triggers a warning

::: warning
The following separate destructuring statement loses reactivity.
:::

```vue
<script setup>
const props = defineProps(['propA', 'propB'])
const { propA, propB } = props
</script>
```

## 🤩 How to fix it

Access values through the runtime props object:

```vue
<script setup>
const props = defineProps(['propA', 'propB'])

console.log(props.propA, props.propB)
</script>
```

In Vue 3.5+, direct compiler-supported destructuring is also reactive:

```vue
<script setup>
const { propA, propB } = defineProps(['propA', 'propB'])
</script>
```

See Vue's [Reactive Props Destructure documentation](https://vuejs.org/guide/components/props.html#reactive-props-destructure) for details.
