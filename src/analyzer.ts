import { parse } from '@vue/compiler-sfc'
import fs from 'fs'
import path from 'path'
import { BG_INFO, BG_RESET, BG_OK } from './asceeCodes'
import { checkScriptLength, reportScriptLength } from './rules/scriptLength'
import { checkPlainScript, reportPlainScript } from './rules/plainScript'
import { checkElseCondition, reportElseCondition } from './rules/elseCondition'
import { checkCyclomaticComplexity, reportCyclomaticComplexity } from './rules/cyclomaticComplexity'

let filesCount = 0

const walkSync = (dir: string, callback: (arg0: string) => void) => {
  const files = fs.readdirSync(dir)
  filesCount += files.length
  for (const file of files) {
    const filePath = path.join(dir, file)
    if (fs.statSync(filePath).isDirectory()) {
      walkSync(filePath, callback) // Recursive call for subdirectories
    } else if (file.endsWith('.vue')) {
      callback(filePath)
    }
  }
}

export const analyze = (dir: string) => {
  console.log(`\n\n${BG_INFO}Analyzing Vue files in ${dir}${BG_RESET}`)

  let errors = 0

  walkSync(dir, filePath => {
    const content = fs.readFileSync(filePath, 'utf-8')
    const { descriptor } = parse(content)

    if (descriptor.scriptSetup) {
      checkScriptLength(descriptor.scriptSetup, filePath)
      checkElseCondition(descriptor.scriptSetup, filePath)
      checkCyclomaticComplexity(descriptor.scriptSetup, filePath)
    }

    if (descriptor.script) {
      checkPlainScript(filePath)
      checkScriptLength(descriptor.script, filePath)
      checkElseCondition(descriptor.script, filePath)
      checkCyclomaticComplexity(descriptor.script, filePath)
    }
  })

  console.log(`Found ${BG_INFO}${filesCount}${BG_RESET} Vue files`)

  errors += reportScriptLength()
  errors += reportPlainScript()
  errors += reportElseCondition()
  errors += reportCyclomaticComplexity()

  if (!errors) {
    console.log(`${BG_OK}No code smells detected!${BG_RESET}`)
  }
}
