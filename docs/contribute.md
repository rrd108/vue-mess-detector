# Contributing to vue-mess-detector

Thank you for your interest in contributing to vue-mess-detector! Follow these steps to get started and do not hesitate to ask questions if you need help.

## 🛠️ Steps to Contribute

1. **Fork the Original Repo**

   - Navigate to the [vue-mess-detector repository](https://github.com/rrd108/vue-mess-detector) on GitHub.
   - Click the "Fork" button at the top-right corner of the page to create your own fork of the repository.

2. **Clone Your Fork**

   - Clone your forked repository to your local machine:
     ```bash
     git clone https://github.com/YOUR_USERNAME/vue-mess-detector.git
     cd vue-mess-detector
     ```

3. **Choose a Rule from the Issues Tab**

   - Visit the [Issues tab](https://github.com/rrd108/vue-mess-detector/issues) and select an issue you'd like to work on.

4. **Read Documentation and Ask Questions**

   - Familiarize yourself with the details related to the selected issue.
   - If you have any questions, feel free to ask in the issue discussion or open a new issue.

5. **Create Your Rule**

   - Create a new file for your rule at `src/rules/RULESET/`, following the naming convention `ruleName.ts`.
   - Use existing rules as a reference for implementing your new rule.
   - If the rule has one level of `warning`, use the warning level in the output. If it has two levels, use the `error` level. For example in *script length rule* if the length exceeds 100 lines, it is a `warning`, and if it exceeds 200 lines, it is an `error`.
   - We use Regular Expressions `regex` extensively in our rules. As [magic-regexp](https://regexp.dev/) offers a significantly easier to read, understand, and maintain syntax compared to plain regex, we prefer its use. If you submit a contribution using plain regex, we will handle the conversion to magic-regexp if necessary.

6. **Create Tests for Your Rule**

   - Create a test file named `ruleName.test.ts` at `src/rules/RULESET/`.
   - Add at least two tests: one that demonstrates a case where no problems are found and one that highlights an issue.
   - Run your tests to ensure they pass:
     ```bash
     yarn test
     ```

::: tip
You can use the rule generator to create a skeleton rule file and a skeleton test file. Run the following command and follow the instructions:
```bash
yarn rules:generate
```
:::

7. **Add the new rule to the analizer**

   - Add your new `ruleName` entry to function call to `src/rules/rules.ts`.
   - Add your new `checkRuleName` function call to `src/rulesCheck.ts`. Script rules are applicable to ts, js and vue files, while template and style rules are applicable to vue files only.
   - Add your new `reportRuleName` function call to `src/rulesReport.ts`.
   - Run the missing rule check to ensure you have added all the necessary entries:
     ```bash
     yarn rules:missing
     ```

8. **Add the rule to the documentation**

   - Add your new rule to the `docs/rules/RULESET/rule-name.md` file.
   - Use exsiting rules as a reference for the documentation.
   - Add your rule's link to the ruleset's index page at `docs/rules/RULESET/index.md`.
   - Add your rule's link to `docs/.vitepress/config.ts` file's `sidebar` object.
   - Run the missing documentation check to ensure you have added all the necessary documentation:
     ```bash
     yarn docs:missing
     ```

9. **Create the PR**
   - Create the PR from your fork to the original repository.
   - Mention your PR in the issue you chose.
   - Some automatic checks will run on your PR. If they fail, you can check the logs to see what went wrong.

## 🐞 Debugging Your Code

1. **Open JavaScript Debug Terminal**

   - Press `Ctrl + Shift + P` and search for `JavaScript Debug Terminal`.

2. **Set Breakpoints**

   - Set breakpoints in your code where needed.

3. **Run Tests in Debug Mode**
   - Execute your tests in the debug terminal:
     ```bash
     yarn test
     ```

## 🧪 Testing Your Feature with Your Own Folder

1. **Run the Analyzer**
   - Execute the analyzer on your specified path:
     ```bash
     yarn analyze path/to/files
     ```

---

Thank you for contributing to vue-mess-detector! Your efforts help improve the project and make it more robust for everyone. If you have any questions, feel free to reach out through the [Issues tab](https://github.com/rrd108/vue-mess-detector/issues).
