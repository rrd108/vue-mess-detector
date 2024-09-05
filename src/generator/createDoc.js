import fs from 'node:fs/promises'
import inquirer from 'inquirer' // it cause some error when this file is ts
import { camelToKebab } from '../helpers/caseTransform.js'

// For some reason If I try to import a constant and use it in `questions` it doesnt work...
const RULESETS = ['vue-essential', 'vue-strong', 'vue-recommended', 'vue-caution', 'rrd']

const inProgressPath = './.inProgress'

const getNewDocQuestions = () => {
  return [
    {
      type: 'list',
      name: 'ruleset',
      message: 'What ruleset this markdown doc file belongs to?',
      choices: RULESETS,
    },
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of the markdown file? (use kebab-case name)',
    },
  ]
}

const getQuestions = async () => {
  try {
    const content = await fs.readFile(inProgressPath, 'utf8')
    const inProgressRules = content.split('\n').filter(Boolean)

    if (inProgressRules.length > 0) {
      return [{
        type: 'list',
        name: 'choice',
        message: 'Select the rule for doc generation:',
        choices: [
          ...inProgressRules,
          { name: 'Other rule', value: 'new' },
        ],
      }]
    }
  }
  catch (error) {
    if (error.code !== 'ENOENT')
      throw error
  }

  return getNewDocQuestions()
}

async function createFile({ ruleset, name }) {
  name = camelToKebab(name)
  const rulename = name.split('-').map(str => str.charAt(0).toUpperCase() + str.slice(1)).join(' ')
  const filePath = `./docs/rules/${ruleset}/${name}.md`

  let fileContent = await fs.readFile('./src/generator/ruleDetailsSkeleton', 'utf8')
  fileContent = fileContent.replace(/_RULENAME_/g, rulename)

  await fs.writeFile(filePath, fileContent, 'utf8')
  console.log(`1️⃣  File ${filePath} generated!`)
}

inquirer.prompt(await getQuestions())
  .then(async (answers) => {
    if (answers.choice === 'new') {
      const newAnswers = await inquirer.prompt(getNewDocQuestions())
      Object.assign(answers, newAnswers)
    }
    else if (answers.choice) {
      const [ruleset, name] = answers.choice.split('/')
      answers.ruleset = ruleset
      answers.name = name

      // Remove the selected rule from inProgress file
      const content = await fs.readFile(inProgressPath, 'utf8')
      const updatedContent = content.split('\n').filter(line => line !== answers.choice).join('\n')
      await fs.writeFile(inProgressPath, updatedContent, 'utf8')
    }
    await createFile(answers)
  })
  .catch((error) => {
    console.error(error)
  })
