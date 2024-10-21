# Full-word Component Names

Checks if the component name is a full word. As this is not easy to detect programmatically we just check if the name has less then 3 consonants &nbsp;&nbsp;<br />
👉 https://vuejs.org/style-guide/rules-strongly-recommended.html#full-word-component-names

## ❓ Why it's good to follow this rule?

- **Readability**: Full-word component names are easier to read and understand.
- **Consistency**: Full-word component names are consistent with the naming of files and folders.

## 😱 Examples of code for which this rule will throw a warning

::: warning
The following code uses a component name that does not qualify as a full word because it contains fewer than three consonants. This is not in line with best practices for component naming.
:::

```vue
<template>
  <NavG>
    <!-- Navigation items -->
  </NavG>
</template>
```

## 🤩 How to fix it?

::: tip
Refactor the component name to use a full word, ensuring it contains at least three consonants for clarity and better readability:
:::

```vue
<template>
  <Navigation>
    <!-- Navigation items -->
  </Navigation>
</template>
```

## 🛠 How to override?

The default minimum consonant count for this rule is **3**.

You can override through the new `override` option in `.config/vue-mess-detector.json` ⬇️

```json
{
  "override": {
    "minimumConsonantCount": 8
  }
}
