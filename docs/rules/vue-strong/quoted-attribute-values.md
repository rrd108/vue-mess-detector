# Quoted Attribute Values

Checks if the template is using quoted attribute values. &nbsp;&nbsp;<br />
👉 https://vuejs.org/style-guide/rules-strongly-recommended.html#quoted-attribute-values

## ❓ Why it's good to follow this rule?

- **Readability:** Quoted attribute values are easier to read and understand.
- **Consistency:** Using quoted attribute values makes the code more consistent and easier to maintain.

## 😱 Examples of code for which this rule will throw a warning

::: warning
The following code does not use quotes for attribute values. This can lead to issues with parsing and is not compliant with best practices.
:::

```javascript
<template>
  <AppSidebar :style={width:sidebarWidth+'px'}>
    <!-- This should have quotes around the attribute value -->
  </AppSidebar>
</template>
```

## 🤩 How to fix it?

::: tip
Refactor the attribute values to use quotes to ensure proper parsing and adherence to best practices:
:::

```vue
<template>
  <AppSidebar :style="{ width: `${sidebarWidth}px` }">
    <!-- Now properly quoted -->
  </appsidebar>
</template>
```
