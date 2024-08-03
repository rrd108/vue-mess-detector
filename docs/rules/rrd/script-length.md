# Script Length

Checks if the script section of a Vue component is too long. The default threshold is 100 lines. Between 100 and 200 lines you get a warning, above 200 lines you get an error.

## ❓ Why it's good to follow this rule?

- **Simple Responsibility**: A script that is too long is likely doing too many things. It is better to split your component into smaller components and/or composables.
- **Readability**: Shorter scripts are easier to read and understand. When a script is over 50 lines it does not fit on a single screen, which makes it harder to read. When it is over 100 lines you have to scroll to read it.
- **Maintainability**: Shorter scripts are easier to maintain and refactor.
- **Testability**: Shorter scripts are easier to test.
