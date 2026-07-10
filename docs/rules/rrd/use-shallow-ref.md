# Use Shallow Ref

Suggests using `shallowRef()` instead of `ref()` when the `.value` is never reassigned.

## ❓ Why it's good to follow this rule?

- **Performance:** `shallowRef()` avoids deep reactivity tracking, reducing overhead for objects and arrays that are only read, never mutated.
- **Memory:** Shallow refs use less memory since Vue does not need to create reactive proxies for nested properties.
- **Clarity:** Using `shallowRef()` signals to other developers that the value is intended to be read-only or replaced wholesale, not mutated in place.
- **Simplicity:** Avoids unnecessary deep reactivity for static configuration objects, constant data, or values that are only set once.

## 😱 Examples of code for which this rule will throw a warning

::: warning
The following code uses `ref()` but the `.value` is never reassigned, so `shallowRef()` would be more efficient:
:::

```vue
<script setup>
import { ref } from 'vue'

const config = ref({ theme: 'dark', lang: 'en' })
console.log(config.value.theme)
</script>
```

## 🤩 How to fix it?

::: tip
Use `shallowRef()` instead of `ref()` when you only need to track the top-level reference, not deep mutations:
:::

```vue
<script setup>
import { shallowRef } from 'vue'

const config = shallowRef({ theme: 'dark', lang: 'en' })
console.log(config.value.theme)
</script>
```

If you later need to update the value, replace it wholesale:

```vue
<script setup>
import { shallowRef } from 'vue'

const config = shallowRef({ theme: 'dark', lang: 'en' })
function updateTheme() {
  config.value = { ...config.value, theme: 'light' }
}
</script>
```