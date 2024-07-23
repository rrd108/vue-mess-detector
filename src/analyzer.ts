import { parse } from '@vue/compiler-sfc'
import fs from 'fs'
import path from 'path'
import { BG_INFO, BG_RESET, BG_OK } from './rules/asceeCodes'
import { RuleSetType } from './rules/rules'
import { reportRules } from './rulesReport'
import { checkRules } from './rulesCheck'

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
    } else if (file.endsWith('.vue')) {
      callback(filePath)
    }
  }
}

export const analyze = (dir: string, ignore: Array<RuleSetType> = []) => {
  console.log(`\n\n${BG_INFO}Analyzing Vue files in ${dir}${BG_RESET}`)

  walkSync(dir, filePath => {
    if (filePath.includes('App.vue') || filePath.includes('app.vue')) {
      return
    }

    const content = fs.readFileSync(filePath, 'utf-8')
    const { descriptor } = parse(content)
    checkRules(descriptor, filePath, ignore)
  })

  console.log(`Found ${BG_INFO}${filesCount}${BG_RESET} Vue files`)

  if (!reportRules()) {
    console.log(`${BG_OK}No code smells detected!${BG_RESET}`)
  }
}
