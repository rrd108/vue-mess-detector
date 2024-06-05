import { parse } from '@vue/compiler-sfc'
import fs from 'fs'
import path from 'path'
import { BG_INFO, BG_RESET, BG_OK } from './asceeCodes'
import { checkScriptLength, reportScriptLength } from './rules/scriptLength'
import { checkPlainScript, reportPlainScript } from './rules/plainScript'
import { checkElseCondition, reportElseCondition } from './rules/elseCondition'
import { checkCyclomaticComplexity, reportCyclomaticComplexity } from './rules/cyclomaticComplexity'
import { checkSingleNameComponent, reportSingleNameComponent } from './rules/singleNameComponent'
import { checkGlobalStyle, reportGlobalStyle } from './rules/globalStyle'
import { checkSimpleProp, reportSimpleProp } from './rules/simpleProp'

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

    if (descriptor.script) {
      checkPlainScript(filePath)
    }

    const script = descriptor.scriptSetup || descriptor.script
    if (script) {
      checkSingleNameComponent(filePath)
      checkSimpleProp(script, filePath)

      checkScriptLength(script, filePath)
      checkCyclomaticComplexity(script, filePath)
      checkElseCondition(script, filePath)
    }

    descriptor.styles.forEach(style => {
      checkGlobalStyle(style, filePath)
    })
  })

  console.log(`Found ${BG_INFO}${filesCount}${BG_RESET} Vue files`)

  // vue-essential rules
  errors += reportSingleNameComponent()
  errors += reportSimpleProp()
  errors += reportGlobalStyle()

  // vue-strong rules
  // vue-reccomended rules
  // vue-caution rules

  // rrd rules
  errors += reportScriptLength()
  errors += reportPlainScript()
  errors += reportCyclomaticComplexity()
  errors += reportElseCondition()

  if (!errors) {
    console.log(`${BG_OK}No code smells detected!${BG_RESET}`)
  }
}
