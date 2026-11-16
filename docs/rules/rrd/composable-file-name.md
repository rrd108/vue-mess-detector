# Composable File Name

Checks that a composable's file name matches the name of the composable it exports.

A file is treated as a composable when its name starts with `use` and it is a `.ts` or `.js` file. If the file exports at least one function whose name starts with `use`, one of them must have the same name as the file (without the extension).

The rule recognizes `export function useFoo`, `export default function useFoo`, `export const useFoo =` and `export { useFoo }`.

## ❓ Why it's good to follow this rule?

- **Discoverability:** when `useCounter` lives in `useCounter.ts`, you can find it from its name alone, without searching the codebase.
- **Consistency:** Vue's own documentation and most Vue projects name composable files after the composable they export.
- **Auto-imports:** tools such as Nuxt and `unplugin-auto-import` expose composables by their exported name. A mismatched file name makes it harder to see where an auto-imported composable comes from.
- **Refactoring safety:** a mismatch is often left behind after a composable is renamed and its file is not.

## 😱 Examples of code for which this rule will throw a warning

::: warning
The following file is named `useCounter.ts`, but the composable it exports is called `useCount`.
:::

```ts
// composables/useCounter.ts
import { ref } from 'vue'

export function useCount() {
  const count = ref(0)
  const increment = () => count.value++
  return { count, increment }
}
```

## 🤩 How to fix it?

::: tip
Rename either the file or the exported function so the two match.
:::

```ts
// composables/useCounter.ts
import { ref } from 'vue'

export function useCounter() {
  const count = ref(0)
  const increment = () => count.value++
  return { count, increment }
}
```

A composable file can still export helper composables, as long as one of its exports matches the file name:

```ts
// composables/useCounter.ts
export function useCounter() { /* ... */ }
export function useCounterHistory() { /* ... */ }
```
