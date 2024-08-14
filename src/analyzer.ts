import fs from 'node:fs/promises'
import path from 'node:path'
import { parse } from '@vue/compiler-sfc'
import { BG_ERR, BG_INFO, BG_OK, BG_RESET, BG_WARN } from './rules/asceeCodes'
import { RULESETS, type RuleSetType } from './rules/rules'
import { reportRules } from './rulesReport'
import { checkRules } from './rulesCheck'
import type { GroupBy } from './types'

let filesCount = 0
let linesCount = 0
let _apply: Array<RuleSetType> = []

const dirs2Check = [
  'src',
  'components',
  'layouts',
  'pages',
  /* 'server',
  'composables',
  'store',
  'utils',
  'plugins',
  'middleware', */
]

const walkAsync = async (dir: string) => {
  const files = await fs.readdir(dir)
  for (const file of files) {
    const filePath = path.join(dir, file)
    const stats = await fs.stat(filePath)
    if (stats.isDirectory()) {
      if (dirs2Check.some(dir => filePath.includes(`${dir}`))) {
        await walkAsync(filePath)
      }
    }
    else if (file.endsWith('.vue')) {
      filesCount++
      const content = await fs.readFile(filePath, 'utf-8')
      linesCount += content.split(/\r\n|\r|\n/).length
      const { descriptor } = parse(content)
      checkRules(descriptor, filePath, _apply)
    }
  }
}

export const analyze = async (dir: string, apply: Array<RuleSetType> = [], groupBy: GroupBy) => {
  console.log(`\n\n${BG_INFO}Analyzing Vue files in ${dir}${BG_RESET}`)
  const ignore = RULESETS.filter(rule => !apply.includes(rule))
  console.log(`Applying ${BG_INFO}${apply.length}${BG_RESET} rulesets ${BG_INFO}${apply}${BG_RESET} and ignoring ${BG_INFO}${ignore.length}${BG_RESET} rulesets ${BG_INFO}${ignore}${BG_RESET} grouping by ${BG_INFO}${groupBy}${BG_RESET}`)

  _apply = apply

  await walkAsync(dir)

  
  console.log(`Found ${BG_INFO}${filesCount}${BG_RESET} Vue files`)
  
  const errors = reportRules(groupBy)
  console.log(`Found ${BG_INFO}${errors}${BG_RESET} errors, ${BG_INFO}${linesCount}${BG_RESET} lines of code in ${BG_INFO}${filesCount}${BG_RESET} files`)

  const codeHealth = Math.ceil(errors/linesCount*100)
  if (codeHealth < 75) {
    console.log(`${BG_ERR}Code health is ${codeHealth}%${BG_RESET}`)
  }
  if (codeHealth >= 75 && codeHealth < 85) {
    console.log(`${BG_WARN}Code health is ${codeHealth}%${BG_RESET}`)
  }
  if (codeHealth >= 85 && codeHealth < 85) {
    console.log(`${BG_INFO}Code health is ${codeHealth}%${BG_RESET}`)
  }
  if (codeHealth >= 95) {
    console.log(`${BG_OK}Code health is ${codeHealth}%${BG_RESET}`)
  }

  if (!errors) {
    console.log(`${BG_OK}No code smells detected!${BG_RESET}`)
  }
}
