# Parameter Count

Checks if functions inside `script setup` block have less than 4 parameters. It handles regular and arrow functions.

## 😱 Examples of code for which this rule will throw a warning

::: warning
The following code contains functions that exceed the recommended limit on the number of parameters. Having too many parameters in a function can make the code harder to understand and maintain.
:::

```javascript
function dummyFuncOne(param1, param2, param3, param4, param5) {
  return 'One'
}
```

Another example with an arrow function:

```javascript
const dummyFuncTwo = (param1, param2, param3, param4) => {
  return 'Two'
}
```

## 🤩 How to fix it?

::: tip
Refactor the function to reduce the number of parameters by using objects, destructuring, or considering whether all parameters are necessary. This will improve readability and maintainability.
:::

For the first example:

```javascript
function dummyFuncOne({ param1, param2, param3, param4, param5 }) {
  return 'One'
}
```

In this refactor, the parameters are combined into a single object, making the function call cleaner and easier to understand. Alternatively, if not all parameters are needed at the same time, consider splitting the function or removing unnecessary parameters.

For the arrow function:

```javascript
const dummyFuncTwo = ({ param1, param2, param3, param4 }) => {
  return 'Two'
}
```

This refactor also combines parameters into an object, reducing the cognitive load when using the function. This approach can help avoid the issue of excessive parameters while keeping the codebase clean and maintainable.

## 🛠 How to override?

The default max parameter count for this rule is **3**.

You can override through the new `override` option in `.config/vue-mess-detector.json` ⬇️

```json
{
  "override": {
    "maxParameterCount": 7
  }
}