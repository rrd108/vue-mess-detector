# Plain Script

Checks if the script section of a Vue component is not using `<script setup>`

## 😱 Examples of code for which this rule will throw a warning

::: warning
The following code uses a plain `<script>` block instead of the recommended `<script setup>`. This can limit the advantages provided by the new Vue 3 Single File Component (SFC) syntax.
:::

```vue
<script>
export default {
  data() {
    return {
      message: 'Hello, world!',
    }
  },
  methods: {
    greet() {
      console.log(this.message)
    }
  }
}
</script>
```

## 🤩 How to fix it?

::: tip
Convert the plain `<script>` block to `<script setup>` to take full advantage of Vue 3's Composition API and the simplified SFC syntax.
:::

```vue
<script setup>
import { ref } from 'vue'

const message = ref('Hello, world!')

function greet() {
  console.log(message.value)
}
</script>
```

By using `<script setup>`, the code becomes more concise, and you gain the benefits of the Composition API, such as automatic imports and better performance. This approach also aligns with Vue 3's best practices and future-proofing your codebase.
