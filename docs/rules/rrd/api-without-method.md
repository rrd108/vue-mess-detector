# API Without HTTP Method

Checks if API route files in a *Nuxt* project specify the HTTP method either in the *filename* or in the file *content*.

## ❓ Why it's good to follow this rule?

By default a file name with no HTTP method specified is used for all methods, what can be misleading or even dangerous.

## 😱 Examples of code for which this rule will throw a warning

::: warning
The following code doesn't specify the HTTP method in the filename or content.
:::

```ts
// /src/server/api/users.ts
export default defineEventHandler(async event => {
  return [
    { id:1, name: 'rrd', email: 'rrd@webmania.cc' },
]
})
```

## 🤩 How to fix it?

::: tip
Specify the HTTP method in the filename (e.g., `users.get.ts`) or include a method check in the file content.
:::

```ts
// /src/server/api/users.ts
export default defineEventHandler(async event => {
  if (event.node.req.method !== 'GET') {
    return [
      { id:1, name: 'rrd', email: 'rrd@webmania.cc' },
]
  }
})
```
