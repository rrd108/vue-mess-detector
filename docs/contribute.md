# Contributing to vue-mess-detector

Thank you for your interest in contributing to vue-mess-detector! Follow these steps to get started:

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

   - Familiarize yourself with the documentation related to the selected issue.
   - If you have any questions, feel free to ask in the issue discussion or open a new issue.

5. **Create Your Rule**

   - Create a new file for your rule at `src/rules/RULESET/`, following the naming convention `ruleName.ts`.
   - Use existing rules as a reference for implementing your new rule.
   - We use Regular Expressions `regex` extensively in our rules. As [magic-regexp](https://regexp.dev/) offers a significantly easier to read, understand, and maintain syntax compared to plain regex, we prefer its use. If you submit a contribution using plain regex, we will handle the conversion to magic-regexp if necessary.

6. **Create Tests for Your Rule**

   - Create a test file named `ruleName.test.ts` at `src/rules/RULESET/`.
   - Add at least two tests: one that demonstrates a case where no problems are found and one that highlights an issue.
   - Run your tests to ensure they pass:
     ```bash
     yarn test
     ```

7. **Add the new rule to the analizer**

   - Add your new `checkRuleName` function call to `src/rulesCheck.ts`
   - Add your new `reportRuleName` function call to `src/rulesReport.ts`

8. **Add the rule to the README**

   - Add your new rule to the README file under the `Rules` section marking the ruleset it belongs to. You can use the following template:

     ```markdown
     ### Rule Name (RULESET)

     Description of the rule.
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

If you want to test your feature with your own set of files:

1. **Build the Project**

   - Build the project to include your new rule:
     ```bash
     yarn build
     ```

2. **Run the Analyzer**
   - Execute the analyzer on your specified path:
     ```bash
     npx vue-mess-detector analyze path/to/files
     ```

---

Thank you for contributing to vue-mess-detector! Your efforts help improve the project and make it more robust for everyone. If you have any questions, feel free to reach out through the [Issues tab](https://github.com/rrd108/vue-mess-detector/issues).
