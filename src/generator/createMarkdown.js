import inquirer from 'inquirer';  // it cause some error when this file is ts
import fs from 'fs/promises';

// For some reason If I try to import a constant and use it in `questions` it doesnt work...
const RULESETS = ['vue-essential', 'vue-strong', 'vue-recommended', 'vue-caution', 'rrd']

/**
 * Represents a question for the Inquirer.js prompt.
 * @typedef {Object} Question
 * @property {string} type - The type of the question (e.g., 'list', 'input').
 * @property {string} name - The name of the question.
 * @property {string} message - The message to be displayed to the user.
 * @property {string[]} [choices] - The available choices for the user to select from (for list-type questions).
 */

/**
 * An array of questions to be asked using the Inquirer.js prompt.
 * @type {Question[]}
 */
const questions = [
  {
    type: 'list',
    name: 'ruleset',
    message: 'What ruleset this markdown file belongs to?',
    choices: RULESETS
  },
  {
    type: 'input',
    name: 'name',
    message: 'What is the name of the markdown file? (use kebab-case name)'
  }
]

async function createFile({ ruleset, name }) {
  const rulename = name.split('-').map(str => str.charAt(0).toUpperCase() + str.slice(1)).join(' ')
  const filePath = `./docs/rules/${ruleset}/${name}.md`

  let fileContent = await fs.readFile('./src/generator/ruleDetailsSkeleton', 'utf8')
  fileContent = fileContent.replace(/_RULENAME_/g, rulename)

  await fs.writeFile(filePath, fileContent, 'utf8')
  console.log(`1️⃣  File ${filePath} generated!`)
}

inquirer.prompt(questions)
  .then(createFile)
  .catch(error => {
    console.error(error)
  })