import inquirer from 'inquirer';  // it cause some error when this file is ts
import fs from 'fs/promises';
import { insertRule2Rules } from './insertRule2Rules.js';

const questions = [
  {
    type: 'list',
    name: 'ruleset',
    message: 'What ruleset this rule will belongs to?',
    choices: ['vue-essential', 'vue-strong', 'vue-recommended', 'vue-caution', 'rrd'],
  },
  {
    type: 'input',
    name: 'name',
    message: 'What is the name of the new rule? (use camelCase name)',
  }
];

const createFiles = async (answers) => {
  const pascalCaseRulename = answers.name.charAt(0).toUpperCase() + answers.name.slice(1);
  const filePath = `./src/rules/${answers.ruleset}/${answers.name}.ts`;
  let fileContent = await fs.readFile('./src/generator/ruleSkeleton', 'utf8');
  fileContent = fileContent.replace(/_RULENAME_/g, pascalCaseRulename).replace(/_RULESET_/g, answers.ruleset);


  await fs.writeFile(filePath, fileContent, 'utf8');
  console.log(`1️⃣  File ${filePath} generated!`);

  const testPath = `./src/rules/${answers.ruleset}/${answers.name}.test.ts`;
  let testContent = await fs.readFile('./src/generator/testSkeleton', 'utf8');
  testContent = testContent
    .replace(/_RULENAME_CAMELCASE_/g, answers.name)
    .replace(/_RULENAME_/g, pascalCaseRulename)
    .replace(/_RULESET_/g, answers.ruleset);
  await fs.writeFile(testPath, testContent, 'utf8');
  console.log(`2️⃣  Test ${testPath} generated!`);

  try {
    await insertRule2Rules(answers.ruleset, answers.name);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
  console.log(`3️⃣  ${answers.name} added to ./src/rules/rules.ts!`);

  // TODO Add your new checkRuleName function call to src/rulesCheck.ts
  // for this we have to know if it works with descriptor, script, template or style
  // console.log(`4️⃣  check${pascalCaseRulename} function call to ./src/rulesCheck.ts`);

  // TODO Add your new reportRuleName function call to src/rulesReport.ts
  // console.log(`5️⃣  report${pascalCaseRulename} function call to ./src/rulesReport.ts`);
};

inquirer.prompt(questions)
  .then(createFiles)
  .catch(error => {
    console.error(error);
  });