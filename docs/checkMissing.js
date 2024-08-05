import { promises as fs } from 'node:fs'
import path from 'node:path'

const allRules = []

const camelToKebab = str => str.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)

const checkDocumentation = async (srcDir, docsDir) => {
  const missingDocs = []

  async function traverse(currentPath) {
    const files = await fs.readdir(currentPath)

    for (const file of files) {
      const fullPath = path.join(currentPath, file)
      const stat = await fs.stat(fullPath)

      if (stat.isDirectory()) {
        await traverse(fullPath)
      }
      else if (currentPath != './src/rules' && file.endsWith('.ts') && !file.endsWith('.test.ts')) {
        const baseName = path.basename(file, '.ts')
        const kebabCaseName = `${camelToKebab(baseName)}.md`
        
        const relativePath = path.relative(srcDir, currentPath)
        allRules.push(`${relativePath}/${kebabCaseName}`)
        const expectedDocPath = path.join(docsDir, relativePath, kebabCaseName)

        try {
          await fs.access(expectedDocPath)
        }
        catch {
          missingDocs.push({ srcFile: fullPath, expectedDoc: expectedDocPath })
        }
      }
    }
  }

  await traverse(srcDir)
  return missingDocs
}

// Usage
const srcDirectory = './src/rules'
const docsDirectory = './docs/rules'

const checkDocs = async () => {
  try {
    const missingDocumentationFiles = await checkDocumentation(srcDirectory, docsDirectory)

    if (missingDocumentationFiles.length > 0) {
      console.log(`Missing ${missingDocumentationFiles.length} documentation files:`)
      missingDocumentationFiles.forEach(({ srcFile, expectedDoc }) => {
        console.log(`- ${srcFile} -> ${expectedDoc}`)
      })
    }
    else {
      console.log('All documentation files are present.')
    }
  }
  catch (error) {
    console.error('An error occurred:', error)
  }
}

await checkDocs()

// check if any rules missing from the docs' sidebar
const configString = await fs.readFile('./docs/.vitepress/config.ts', 'utf-8')

const extractSidebar = (configString) => {    // TODO replace with regex
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

const sidebarArray = extractSidebar(configString)
// eslint-disable-next-line no-eval
const sidebar = eval(sidebarArray)
const sidebarRules = []
sidebar[0].items.find(item => item.text == 'Rulesets').items.forEach(ruleset => {
  ruleset.items.forEach(rule => {
    sidebarRules.push(`${rule.link.replace('/rules/','')}.md`)
  })
})
const sidebarMissingRules = []
allRules.forEach(rule => {
  if (!sidebarRules.includes(rule)) {
    sidebarMissingRules.push(rule)
  }
})

if (sidebarMissingRules.length > 0) {
  console.log(`Missing ${sidebarMissingRules.length} rules from the sidebar:`)
  sidebarMissingRules.forEach(rule => {
    console.log(`- ${rule}`)
  })
}