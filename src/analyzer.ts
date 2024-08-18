import fs from 'node:fs/promises'
import path from 'node:path'
import { parse, SFCScriptBlock } from '@vue/compiler-sfc'
import { BG_ERR, BG_INFO, BG_OK, BG_RESET, BG_WARN } from './rules/asceeCodes'
import { RULESETS, type RuleSetType } from './rules/rules'
import { reportRules } from './rulesReport'
import { checkRules } from './rulesCheck'
import type { GroupBy } from './types'

let filesCount = 0
let linesCount = 0
let _apply: Array<RuleSetType> = []

const skipDirs = ['cache', 'coverage', 'dist', '.git', 'node_modules',  '.nuxt',  ]

const walkAsync = async (dir: string) => {
  const files = await fs.readdir(dir)
  for (const file of files) {
    const filePath = path.join(dir, file)
    const stats = await fs.stat(filePath)
    if (stats.isDirectory()) {
      if (!skipDirs.some(dir => filePath.includes(dir))) {
        await walkAsync(filePath)
      }
    }
    else if (file.endsWith('.vue') || file.endsWith('.ts') || file.endsWith('.js')) {
      filesCount++
      const content = await fs.readFile(filePath, 'utf-8')
      linesCount += content.split(/\r\n|\r|\n/).length
      const { descriptor } = parse(content)

      // vue files has descriptor.source, descriptor.script, descriptor.styles, descriptor.template
      // ts/js files has descriptor.source only but the work for us as a script block
      if (file.endsWith('.ts') || file.endsWith('.js')) {
        descriptor.script = { content } as SFCScriptBlock
      }
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

  const health = reportRules(groupBy)
  const { errors, warnings } = health.reduce((acc, { errors, warnings }) => ({ errors: acc.errors + errors, warnings: acc.warnings + warnings }), { errors: 0, warnings: 0 })

  console.log(`Found ${BG_ERR}${Intl.NumberFormat('en-US').format(errors)} errors${BG_RESET}, and ${BG_WARN}${Intl.NumberFormat('en-US').format(warnings)} warnings${BG_RESET}, ${BG_INFO}${Intl.NumberFormat('en-US').format(linesCount)} lines${BG_RESET} of code in ${BG_INFO}${Intl.NumberFormat('en-US').format(filesCount)} files${BG_RESET}`)

  // Code health calculated by the number of errors per lines of code
  const codeHealth = Math.ceil((1 - (errors * 1.5 + warnings) / linesCount) * 100)
  if (codeHealth < 75) {
    console.log(`${BG_ERR}Code health is LOW: ${codeHealth}%${BG_RESET}`)
  }
  if (codeHealth >= 75 && codeHealth < 85) {
    console.log(`${BG_WARN}Code health is MEDIUM ${codeHealth}%${BG_RESET}`)
  }
  if (codeHealth >= 85 && codeHealth < 95) {
    console.log(`${BG_INFO}Code health is OK: ${codeHealth}%${BG_RESET}`)
  }
  if (codeHealth >= 95) {
    console.log(`${BG_OK}Code health is GOOD: ${codeHealth}%${BG_RESET}`)
  }

  if (!errors && !warnings) {
    console.log(`${BG_OK}No code smells detected!${BG_RESET}`)
  }
}
