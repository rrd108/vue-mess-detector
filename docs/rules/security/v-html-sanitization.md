# v-html Without Sanitization

Checks if `v-html` directive is used without proper HTML sanitization to prevent XSS attacks.

## ❓ Why it's good to follow this rule?

Using `v-html` with unsanitized user input is a well-known XSS vulnerability. An attacker can inject malicious scripts that execute when the HTML is rendered. Always sanitize HTML content before passing it to `v-html`.

## 😱 Examples of code for which this rule will throw a warning

:::warning
The following code uses `v-html` without any sanitization library.
:::

```vue
<!-- unsafe-component.vue -->
<template>
  <div v-html="rawHtml"></div>
</template>

<script setup>
const rawHtml = ref('<p>hello</p>')
</script>
```

## 🤩 How to fix it?

::: tip
Use a sanitization library like [DOMPurify](https://github.com/cure53/DOMPurify) or [sanitize-html](https://github.com/apostrophecms/sanitize-html) to clean HTML before rendering.
:::

```vue
<!-- safe-component.vue -->
<template>
  <div v-html="sanitizedHtml"></div>
</template>

<script setup>
import DOMPurify from 'dompurify'

const rawHtml = ref('<p>hello</p>')
const sanitizedHtml = computed(() => DOMPurify.sanitize(rawHtml.value))
</script>
```