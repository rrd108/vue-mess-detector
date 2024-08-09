import fs from 'node:fs'
import path from 'node:path'
import { parse } from '@vue/compiler-sfc'
import { BG_INFO, BG_OK, BG_RESET } from './rules/asceeCodes'
import { RULESETS, type RuleSetType } from './rules/rules'
import { reportRules } from './rulesReport'
import { checkRules } from './rulesCheck'
import type { GroupBy } from './types'

let filesCount = 0

const dirs2Check = [
  'src',
  'components',
  'pages',
  'layouts',
  'server',
  'composables',
  'store',
  'utils',
  'plugins',
  'middleware',
]

const walkSync = (dir: string, callback: (arg0: string) => void) => {
  const files = fs.readdirSync(dir)
  filesCount += files.length
  for (const file of files) {
    const filePath = path.join(dir, file)
    if (fs.statSync(filePath).isDirectory()) {
      if (dirs2Check.some(dir => filePath.includes(dir))) {
        walkSync(filePath, callback) // Recursive call for subdirectories
      }
    }
    else if (file.endsWith('.vue')) {
      callback(filePath)
    }
  }
}

export const analyze = (dir: string, apply: Array<RuleSetType> = [], groupBy: GroupBy) => {
  console.log(`\n\n${BG_INFO}Analyzing Vue files in ${dir}${BG_RESET}`)
  const ignore = RULESETS.filter(rule => !apply.includes(rule))
  console.log(`Applying ${BG_INFO}${apply.length}${BG_RESET} rulesets ${BG_INFO}${apply}${BG_RESET} and ignoring ${BG_INFO}${ignore.length}${BG_RESET} rulesets ${BG_INFO}${ignore}${BG_RESET} grouping by ${BG_INFO}${groupBy}${BG_RESET}`)

  walkSync(dir, (filePath) => {
    if (filePath.includes('App.vue') || filePath.includes('app.vue')) {
      return
    }

    const content = fs.readFileSync(filePath, 'utf-8')
    const { descriptor } = parse(content)
    checkRules(descriptor, filePath, apply)
  })

  console.log(`Found ${BG_INFO}${filesCount}${BG_RESET} Vue files`)

  if (!reportRules(groupBy)) {
    console.log(`${BG_OK}No code smells detected!${BG_RESET}`)
  }
}
