# No Ts Lang

Checks if the script section of a Vue component is using TypeScript (`lang="ts"`).

## ❓ Why it's good to follow this rule?

- **Type Safety**: TypeScript provides static typing, which helps catch errors early in development.
- **Better IDE Support**: TypeScript offers enhanced autocompletion, refactoring, and navigation features in most IDEs.
- **Improved Maintainability**: Type annotations make code more self-documenting and easier to understand.
- **Scalability**: As projects grow, TypeScript's features become increasingly valuable for managing complexity.

## 😱 Examples of code for which this rule will throw a warning

::: warning
The following code uses a plain JavaScript `<script setup>` block instead of TypeScript:
:::

```vue
<script setup>
import { ref } from 'vue'

const products = ref([{ name: 'Apple', price: 1 }, { name: 'Banana', price: 2 }])

// more content here...
</script>
```

## 🤩 How to fix it?

::: tip
Add `lang="ts"` to your `<script>` tag and use TypeScript syntax:
:::

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { Product } from '@/types/product'

const products: Product[] = ref([{ name: 'Apple', price: 1 }, { name: 'Banana', price: 2 }])

// more content here...
</script>
```

By using TypeScript, you gain the benefits of type checking, better tooling support, and improved code quality. This approach aligns with modern Vue.js best practices and helps prevent potential runtime errors by catching them at compile-time.