# Short Variable Name

Checks if variable names inside `<script setup>` block have less than 4 chars.

## 😱 Examples of code for which this rule will throw a warning

::: warning
The following code uses variable names that are too short, which can lead to less readable and maintainable code. Short variable names are often ambiguous and can make the code harder to understand, especially in larger codebases.
:::

```vue
<script setup>
const age = 25
const x = 10
const y = 'Hello'
</script>
```

In the example above, the variables `age`, `x`, and `y` are too short and lack meaningful context, which could confuse other developers who might not know what these variables represent.

## 🤩 How to fix it?

::: tip
Refactor the code to use more descriptive variable names. This improves readability and makes the code more self-explanatory.
:::

```vue
<script setup>
const userAge = 25
const maxItems = 10
const greetingMessage = 'Hello'
</script>
```

In the refactored example, `userAge`, `maxItems`, and `greetingMessage` are descriptive and provide clear context, making the code easier to understand and maintain.

## 🛠 How to override?

The default max expression length for this rule is **40**.

You can override through the new `override` option in `vue-mess-detector.json` ⬇️

```json
{
  "override": {
    "minVariableName": 7
  }
}