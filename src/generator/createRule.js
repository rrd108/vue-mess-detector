import fs from 'node:fs/promises'
import inquirer from 'inquirer' // it cause some error when this file is ts
import { insertRule2Rules } from './insertRule2Rules.js'

const questions = [
  {
    type: 'list',
    name: 'ruleset',
    message: 'What ruleset this rule will belongs to?',
    choices: ['vue-essential', 'vue-strong', 'vue-recommended', 'vue-caution', 'rrd', 'security'],
  },
  {
    type: 'input',
    name: 'name',
    message: 'What is the name of the new rule? (use camelCase name)',
  },
]

const createFiles = async (answers) => {
  const pascalCaseRulename = answers.name.charAt(0).toUpperCase() + answers.name.slice(1)
  const humanReadableRulename = answers.name.replace(/([A-Z])/g, ' $1').trim()
  const filePath = `./src/rules/${answers.ruleset}/${answers.name}.ts`

  let fileContent = await fs.readFile('./src/generator/ruleSkeleton', 'utf8')
  fileContent = fileContent.replace(/_RULENAME_/g, pascalCaseRulename)
    .replace(/_HUMANRULENAME_/g, humanReadableRulename)
    .replace(/_RULESET_/g, answers.ruleset)

  await fs.writeFile(filePath, fileContent, 'utf8')
  console.log(`1️⃣  File ${filePath} generated!`)

  const testPath = `./src/rules/${answers.ruleset}/${answers.name}.test.ts`
  let testContent = await fs.readFile('./src/generator/testSkeleton', 'utf8')
  testContent = testContent
    .replace(/_RULENAME_CAMELCASE_/g, answers.name)
    .replace(/_RULENAME_/g, pascalCaseRulename)
    .replace(/_HUMANRULENAME_/g, humanReadableRulename)
    .replace(/_RULESET_/g, answers.ruleset)
  await fs.writeFile(testPath, testContent, 'utf8')
  console.log(`2️⃣  Test ${testPath} generated!`)

  try {
    await insertRule2Rules(answers.ruleset, answers.name)
  }
  catch (error) {
    console.error('Error:', error.message)
    // eslint-disable-next-line node/prefer-global/process
    process.exit(1)
  }
  console.log(`3️⃣  ${answers.name} added to ./src/rules/rules.ts!`)

  let indexContent = await fs.readFile(`./src/rules/${answers.ruleset}/index.ts`, 'utf8')
  indexContent += `export * from './${answers.name}'\n`
  await fs.writeFile(`./src/rules/${answers.ruleset}/index.ts`, indexContent, 'utf8')
  console.log(`4️⃣  ${answers.name} export added to ./src/rules/${answers.ruleset}/index.ts`)

  // TODO Add your new checkRuleName import and function call to src/rulesCheck.ts
  // for this we have to know if it works with descriptor, script, template or style
  // console.log(`5️⃣  check${pascalCaseRulename} function call to ./src/rulesCheck.ts`)

  // TODO Add your new reportRuleName import and function call to src/rulesReport.ts
  // console.log(`5️⃣  report${pascalCaseRulename} function call to ./src/rulesReport.ts`)

  const inProgressPath = './.inProgress'
  let inProgressContent = ''
  try {
    inProgressContent = await fs.readFile(inProgressPath, 'utf8')
  }
  catch (error) {
    if (error.code !== 'ENOENT')
      throw error
  }
  if (!inProgressContent.includes(answers.name)) {
    await fs.appendFile(inProgressPath, `${answers.ruleset}/${answers.name}\n`, 'utf8')
    console.log(`5️⃣  ${answers.name} added to .inProgress`)
  }
}

inquirer.prompt(questions)
  .then(createFiles)
  .catch((error) => {
    console.error(error)
  })
