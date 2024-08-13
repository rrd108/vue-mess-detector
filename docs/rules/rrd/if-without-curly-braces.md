# If Without Curly Braces

Check if `if` statements are missing curly braces, even when they contain only one line of code.

## 📖 What does this rule enforce?

This rule ensures that all `if` statements, regardless of the number of lines they contain, use curly braces `{}` to enclose the code block.

## ❓ Why it's good to follow this rule?

- **Readability:** Curly braces make the structure of the code clear, reducing the likelihood of misunderstandings. Even if the `if` statement has only one line, using braces ensures that the code is easy to read and follow.
- **Consistency:** Enforcing curly braces for all `if` statements helps maintain a consistent coding style throughout the project, making the codebase easier to navigate.
- **Maintainability:** Code changes often, and what starts as a one-line `if` statement can easily grow into something more complex. If braces are already in place, adding new lines of code becomes less error-prone.
- **Avoiding Bugs:** Omitting braces can lead to subtle bugs, especially when additional statements are added later. With braces, there's no ambiguity about which statements are controlled by the `if`.

## 😱 Examples of code for which this rule will throw a warning

::: warning
The following code omits curly braces in the `if` statement:
:::

```ts
if (condition)
  doSomething()
```

## 🤩 How to fix it?

::: tip
Always use curly braces to enclose the code block within `if` statements, even if it's just one line.
:::

```ts
if (condition) {
  doSomething()
}
```
