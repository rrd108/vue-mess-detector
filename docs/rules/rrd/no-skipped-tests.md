# No Skipped Tests

Checks if there are any skipped or todo tests in your test files.

## ❓ Why it's good to follow this rule?

Skipped tests can lead to a false sense of security in your test suite. They might hide potential issues or outdated test cases that need attention. By ensuring all tests are running, you maintain a more accurate representation of your codebase's health and functionality.

## 😱 Examples of code for which this rule will throw a warning

::: warning
The following code contains skipped tests that should be addressed:
:::

```js
describe('skipped test', () => {
  it.todo('should pass', () => {
    expect(true).toBe(true)
  })

  it.skip('should pass two', () => {
    expect(true).toBe(true)
  })
})
```

## 🤩 How to fix it?

::: tip
Refactor the code to remove the skipped tests.
:::

```js
describe('no skipped test', () => {
  it('should pass', () => {
    expect(true).toBe(true)
  })

  it('should pass two', () => {
    expect(true).toBe(true)
  })
})
```