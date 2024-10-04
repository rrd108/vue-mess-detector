# Amount Of Comments

Checks if a component has too many comments relative to its code.

## ❓ Why it's good to follow this rule?

Maintaining an appropriate balance of comments in your code is crucial for readability and maintainability. Too many comments can make the code difficult to understand, especially for complex logic or non-obvious implementations. On the other hand, too few comments can clutter the code and potentially become outdated, leading to confusion.

## 😱 Examples of code for which this rule will throw a warning

::: warning
The following code contains too many comments, making it difficult to understand the purpose and functionality of the component:
:::

```vue
<script setup>
/*
  Emiting a Policy (3/4)
  Third, just run the necessary endpoints...
  and trigger policy's action modal
*/
function finallyEmiting() {
  if (quote.value.isEmitted) {
    isPolicyActionsOpen.value = true;
    return;
  }
}

/*
  Emiting a Policy (4/4)
  Lastly, download your certificates and decide where to go next
*/
function afterParty() {}
</script>
```

## 🤩 How to fix it?

::: tip
Add meaningful comments to explain the purpose of complex computations, important business logic, or any non-obvious code.
:::

```vue
<script setup>
// First emit the current quote and trigger policy's action modal
function handleEmitPolicy() {
  if (quote.value.isEmitted) {
    isPolicyActionsOpen.value = true;
    return;
  }
}

// Lastly, download your certificates and decide where to go next 
function handleDownloadCertificates() {}
</script>
```