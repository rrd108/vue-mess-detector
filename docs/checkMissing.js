import { promises as fs } from 'node:fs'
import path from 'node:path'

const camelToKebab = str => str.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)

const isValidSourceFile = (currentPath, file) => currentPath !== './src/rules' && file.endsWith('.ts') && !file.endsWith('.test.ts')

const fileExists = async (filePath) => {
  try {
    await fs.access(filePath)
    return true
  }
  catch {
    return false
  }
}

const findMissingDocs = async (srcDir, docsDir) => {
  const allRules = []
  const missingDocs = []

  async function traverseDirectory(currentPath) {
    const files = await fs.readdir(currentPath)

    for (const file of files) {
      const fullPath = path.join(currentPath, file)
      const stat = await fs.stat(fullPath)

      if (stat.isDirectory()) {
        await traverseDirectory(fullPath)
      }
      else if (isValidSourceFile(currentPath, file)) {
        const relativePath = path.relative(srcDir, currentPath)
        const kebabCaseName = `${camelToKebab(path.basename(file, '.ts'))}.md`
        const rulePath = `${relativePath}/${kebabCaseName}`

        allRules.push(rulePath)

        const expectedDocPath = path.join(docsDir, rulePath)
        if (!await fileExists(expectedDocPath)) {
          missingDocs.push({ srcFile: fullPath, expectedDoc: expectedDocPath })
        }
      }
    }
  }

  await traverseDirectory(srcDir)
  return { allRules, missingDocs }
}

const extractSidebarString = (configString) => {
  const start = configString.indexOf('sidebar: [')
  if (start === -1)
    return null

  let end = start + 'sidebar: ['.length
  let openBrackets = 1

  while (openBrackets > 0 && end < configString.length) {
    if (configString[end] === '[')
      openBrackets++
    if (configString[end] === ']')
      openBrackets--
    end++
  }

  return configString.slice(start + 'sidebar: '.length, end)
}

const extractSidebarRules = async (configPath) => {
  const configString = await fs.readFile(configPath, 'utf-8')
  const sidebarArrayString = extractSidebarString(configString)
  // eslint-disable-next-line no-eval
  const sidebar = eval(sidebarArrayString)

  return sidebar[0].items
    .find(item => item.text === 'Rulesets')
    .items.flatMap(ruleset =>
      ruleset.items.map(rule => `${rule.link.replace('/rules/', '')}.md`),
    )
}

const main = async () => {
  const srcDirectory = './src/rules'
  const docsDirectory = './docs/rules'
  const configPath = './docs/.vitepress/config.ts'

  try {
    const { allRules, missingDocs } = await findMissingDocs(srcDirectory, docsDirectory)

    if (missingDocs.length > 0) {
      console.log(`Missing ${missingDocs.length} documentation files:`)
      missingDocs.forEach(({ srcFile, expectedDoc }) => {
        console.log(`- ${srcFile} -> ${expectedDoc}`)
      })
    }
    else {
      console.log('All documentation files are present.')
    }

    const sidebarRules = await extractSidebarRules(configPath)
    const sidebarMissingRules = allRules.filter(rule => !sidebarRules.includes(rule))

    if (sidebarMissingRules.length > 0) {
      console.log(`Missing ${sidebarMissingRules.length} rules from the sidebar:`)
      sidebarMissingRules.forEach((rule) => {
        console.log(`- ${rule}`)
      })
    }
  }
  catch (error) {
    console.error('An error occurred:', error)
  }
}

main()
