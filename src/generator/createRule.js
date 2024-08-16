import inquirer from 'inquirer';  // it cause some error when this file is ts
import fs from 'fs/promises';

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
  const filePath = `./src/rules/${answers.ruleset}/${answers.name}.ts`;
  let fileContent = await fs.readFile('./src/generator/ruleSkeleton', 'utf8');
  fileContent = fileContent.replace(/_RULENAME_/g, answers.name.charAt(0).toUpperCase() + answers.name.slice(1)).replace(/_RULESET_/g, answers.ruleset);


  await fs.writeFile(filePath, fileContent, 'utf8');
  console.log(`File ${filePath} generated!`);

  const testPath = `./src/rules/${answers.ruleset}/${answers.name}.test.ts`;
  let testContent = await fs.readFile('./src/generator/testSkeleton', 'utf8');
  testContent = testContent
    .replace(/_RULENAME_CAMELCASE_/g, answers.name)
    .replace(/_RULENAME_/g, answers.name.charAt(0).toUpperCase() + answers.name.slice(1))
    .replace(/_RULESET_/g, answers.ruleset);
  await fs.writeFile(testPath, testContent, 'utf8');
  console.log(`Test ${testPath} generated!`);
};

inquirer.prompt(questions)
  .then(createFiles)
  .catch(error => {
    console.error(error);
  });