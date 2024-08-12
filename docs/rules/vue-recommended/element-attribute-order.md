# Element attribute order

Checks if the component always uses `is`, `v-for`, `v-if`, `v-else-if`, `v-else`, `v-show`, `v-cloak`, `v-pre`, `v-once`, `id`, `ref`, `key`, `v-model`, `v-on`, `v-html`, `v-text` order consistently. &nbsp;&nbsp;<br />
👉 https://vuejs.org/style-guide/rules-recommended.html#element-attribute-order

## ❓ Why it's good to follow this rule?

- **Consistency:** It makes the code consistent and easier to maintain.

## 😱 Examples of code for which this rule will throw a warning

::: warning
The attributes of elements (including components) should be ordered consistently. The following examples illustrate cases where the attribute order is incorrect.
:::

### Example 1: Incorrect Attribute Order
```javascript
<template>
    <input v-on:input="handleInput" v-model="inputValue">
</template>
```

In this example, the attributes of the `<input>` element are out of order. The `v-on:input` directive should come after `v-model` to maintain consistent attribute ordering.

### Example 2: Incorrect Attribute Order in a Different Element

```javascript
<template>
  <div id="app" v-if="isVisible" ref="myDiv" v-on:click="handleClick"></div>
</template>
```

In this example, the attributes of the `<div>` element are also out of order. The `v-if` attribute should precede the `id` directive and the `ref` directive.

## 🤩 How to fix it?

:::tip
To comply with the recommended attribute order, ensure that the attributes in your elements are arranged consistently.
:::

### Fixing Incorrect Attribute Order

```vue
<template>
  <input v-model="inputValue" @input="handleInput">
</template>
```

### Fixing Incorrect Attribute Order in a Different Element

```vue
<div v-if="isVisible" id="app" ref="myDiv" v-on:click="handleClick"></div>
```

By maintaining a consistent order of attributes in your elements, you improve code readability and maintainability, making it easier for others (and yourself) to understand the structure and functionality of your components.
