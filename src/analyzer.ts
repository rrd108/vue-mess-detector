import { parse } from '@vue/compiler-sfc'
import fs from 'fs'
import path from 'path'
import { BG_INFO, BG_RESET, BG_OK } from './asceeCodes'
import { checkScriptLength, reportScriptLength } from './rules/scriptLength'
import { checkPlainScript, reportPlainScript } from './rules/plainScript'
import { checkElseCondition, reportElseCondition } from './rules/elseCondition'
import { checkCyclomaticComplexity, reportCyclomaticComplexity } from './rules/cyclomaticComplexity'

export const analyze = (dir: string) => {
  console.log(`\n\n${BG_INFO}Analyzing Vue files in ${dir}${BG_RESET}`)

  const files = fs.readdirSync(dir).filter(file => file.endsWith('.vue'))

  console.log(`Found ${BG_INFO}${files.length}${BG_RESET} Vue files`)

  let errors = 0

  files.forEach(file => {
    const filePath = path.join(dir, file)
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

  errors += reportScriptLength()
  errors += reportPlainScript()
  errors += reportElseCondition()
  errors += reportCyclomaticComplexity()

  if (!errors) {
    console.log(`${BG_OK}No code smells detected!${BG_RESET}`)
  }
}
