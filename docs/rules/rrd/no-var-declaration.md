# Avoid Using var for Variable Declarations

In modern JavaScript, especially within Vue components, it's crucial to avoid using `var` for variable declarations. The `var` keyword has several issues compared to `let` and `const`, including scope and hoisting problems that lead to bugs and unpredictable behavior.

## 📖 What is `var`?

The `var` keyword is used to declare variables in JavaScript. It was the original way to declare variables before `let` and `const` were introduced with ECMAScript 2015 (ES6).

### Key Issues with var:

- Vue’s reactivity system relies on modern JavaScript features to track changes and update the UI efficiently. var’s function-scoped nature and lack of block scope can interfere with Vue’s reactivity system, leading to problems where changes are not detected or where the code behaves unpredictably.
- Code Maintainability: Using `var` makes code harder to maintain and understand. Developers often expect `let` and `const` to be used for variable declarations because they offer block-level scoping, which is more predictable and easier to reason about.

## ❓ Why it's good to follow this rule?

1. **Predictable Behavior**:

- `let` and `const` provide block scope, which makes variable behavior more predictable and avoids issues related to variable hoisting and function scoping.

2. **Improved Reactivity**:

- Using `let` and `const` helps maintain the integrity of Vue’s reactivity system by avoiding potential pitfalls associated with var.

3. **Better Code Quality**:

- `let` and `const` promote clearer and more maintainable code.
- They help prevent bugs that arise from the quirks of var and improve overall code quality.

Incorrect Usage:

```vue
<script setup>
var { x, y } = z
var x
var y = 10
var z = x + y
</script>
```

## 🤩 How to fix it?

To ensure better scoping and avoid issues related to `var`, use `let` and `const` instead. Here’s how to replace `var` with let and const:

Correct Usage:

```vue
<script setup>
const { x, y } = z;
const x;
let y = 10;
let z = x + y;
</script>
```
