# Computed Side Effects

Checks if computed properties have side effects.

## ❓ Why it's good to follow this rule?

- **Predictability:** Computed properties without side effects are more predictable, making the code easier to reason about.
- **Testability:** Pure computed properties are easier to test as they don't modify external state.
- **Debugging:** When computed properties only calculate and return values, it's easier to debug issues related to reactivity.
- **Performance:** Vue can better optimize computed properties that don't have side effects.
- **Maintainability:** Separating calculations from side effects leads to cleaner, more maintainable code.
- **Reactivity:** Side effects in computed properties can lead to unexpected reactivity issues and hard-to-track bugs.

## 😱 Examples of code for which this rule will throw a warning

::: warning
The following code contains a computed property with a side effect:
:::

```vue
<script setup>
import { computed } from 'vue'

const someVariable = ref('old value')

const computedValue = computed(() => {
  someVariable.value = 'new value'
  return someVariable
})
</script>
```

## 🤩 How to fix it?

::: tip
Refactor the computed property to remove side effects. Move any state modifications or side effects to methods or watchers.
:::

```vue
<script setup>
import { ref, computed } from 'vue'

const someVariable = ref('old value')

const computedValue = computed(() => someVariable.value)

function updateSomeVariable() {
someVariable.value = 'new value'
}
</script>
```

In this fixed example, we've removed the side effect from the computed property. The `computedValue` now only returns the current value of `someVariable` without modifying it. We've added a separate function `updateSomeVariable()` to handle the state modification when needed.