# No Axios or Fetch in Nuxt

Checks for direct HTTP calls made with `axios` (such as `axios.get` or `axios.post`) or the native `fetch()` function in Nuxt projects.

This rule runs only when the project is detected as a Nuxt project. Nuxt's own `$fetch` is not reported.

## ❓ Why it's good to follow this rule?

Nuxt renders pages on the server and then hydrates them in the browser. Its data-fetching utilities are built for this:

- **No duplicate requests:** `useFetch` and `useAsyncData` fetch data during server-side rendering and pass the result to the client in the page payload. With `axios` or `fetch` in a component, the same request often runs twice: once on the server and again in the browser.
- **Hydration safety:** data fetched outside Nuxt's utilities is not part of the payload, so the client can render different content from the server and cause hydration mismatches.
- **Built-in state:** `useFetch` and `useAsyncData` give you `pending`, `error`, `refresh` and caching by key, which you would otherwise write by hand.
- **Smaller bundles:** `$fetch` is built into Nuxt, so you do not need to ship an extra HTTP client such as `axios`.

## 😱 Examples of code for which this rule will throw a warning

::: warning
The following code fetches data with `axios` and the native `fetch()` directly.
:::

```vue
<script setup>
import axios from 'axios'

const { data: users } = await axios.get('/api/users')

const response = await fetch('/api/posts')
const posts = await response.json()
</script>
```

## 🤩 How to fix it?

::: tip
Use `useFetch` or `useAsyncData` for data that a page or component needs, and `$fetch` for requests triggered by user actions.
:::

```vue
<script setup>
const { data: users } = await useFetch('/api/users')

const { data: posts } = await useAsyncData('posts', () => $fetch('/api/posts'))

async function savePost(post) {
  await $fetch('/api/posts', { method: 'POST', body: post })
}
</script>
```

See Nuxt's [Data Fetching documentation](https://nuxt.com/docs/getting-started/data-fetching) for details.
