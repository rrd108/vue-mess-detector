# Keyed `v-for`

Checks if the component is using `v-for` without a `key` property. &nbsp;&nbsp;<br />
👉 https://vuejs.org/style-guide/rules-essential.html#use-keyed-v-for

## ❓ Why it's good to follow this rule?

- **Performance** adding a `key` property to the `v-for` loop helps Vue to identify the elements and update only the changed elements.
- In certain situations a missing `key` property can lead to unexpected behavior.
