# Simple Computed Properties

Checks if any computed properties are bigger than 5 lines. &nbsp;&nbsp;<br />
👉 https://vuejs.org/style-guide/rules-strongly-recommended.html#simple-computed-properties

## ❓ Why it's good to follow this rule?

- **Simple Responsibility:** Shorter computed properties have a single responsibility and can be really focused.
- **Readability:** Shorter computed properties are easier to read and understand.
- **Maintainability:** Shorter computed properties are easier to maintain and refactor.
- **Performance:** Shorter computed properties are faster to compute.
- **Consistency:** Shorter computed properties are consistent with the naming of files and folders.
- **Debugging:** Shorter computed properties are easier to debug.
- **Testing:** Shorter computed properties are easier to test.

## 😱 Examples of code for which this rule will throw a warning

::: warning
The following code contains computed properties that are too large, making them harder to read and maintain.
:::

```vue{5-13}
<!-- Incorrect: Computed property exceeds 5 lines -->
<script setup>
const total = computed(() => {
  let total = 0
  for (let i = 0; i < items.value.length; i++) {
    total += items.value[i].price
  }
  for (let i = 0; i < items.value.length; i++) {
    total += items.value[i].price
  }
  for (let i = 0; i < items.value.length; i++) {
    total += items.value[i].price
  }
  return total
})
</script>
```

## 🤩 How to fix it?

::: tip
Refactor large computed properties into smaller, more manageable ones. This improves readability and maintainability.
:::

```vue{4}
<!-- Correct: Computed properties are simplified and concise -->
<script setup>
const total = computed(() => {
  return items.value.reduce((sum, item) => sum + item.price, 0)
})

const isWeekend = computed(() => today.getDay() === 0 || today.getDay() === 6)
</script>
```

## 🛠 How to override?

The default max computed length for this rule is **5**.

You can override through the new `override` option in `vue-mess-detector.json` ⬇️

```json
{
  "override": {
    "maxComputedLength": 10
  }
}