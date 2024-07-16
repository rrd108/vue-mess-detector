import { parse } from '@vue/compiler-sfc'
import fs from 'fs'
import path from 'path'
import { BG_INFO, BG_RESET, BG_OK } from './rules/asceeCodes'
import { checkScriptLength, reportScriptLength } from './rules/rrd/scriptLength'
import { checkPlainScript, reportPlainScript } from './rules/rrd/plainScript'
import { checkElseCondition, reportElseCondition } from './rules/rrd/elseCondition'
import { checkCyclomaticComplexity, reportCyclomaticComplexity } from './rules/rrd/cyclomaticComplexity'
import { checkSingleNameComponent, reportSingleNameComponent } from './rules/vue-essential/singleNameComponent'
import { checkGlobalStyle, reportGlobalStyle } from './rules/vue-essential/globalStyle'
import { checkSimpleProp, reportSimpleProp } from './rules/vue-essential/simpleProp'
import { checkVifWithVfor, reportVifWithVfor } from './rules/vue-essential/vifWithVfor'
import { checkVforNoKey, reportVforNoKey } from './rules/vue-essential/vforNoKey'
import { checkComponentFilenameCasing, reportComponentFilenameCasing } from './rules/vue-strong/componentFilenameCasing'
import { checkPropNameCasing, reportPropNameCasing } from './rules/vue-strong/propNameCasing'
import { checkTemplateSimpleExpression, reportTemplateSimpleExpression } from './rules/vue-strong/templateSimpleExpression'
import { checkQuotedAttributeValues, reportQuotedAttributeValues } from './rules/vue-strong/quotedAttribueValues'
import { checkSelfClosingComponents, reportSelfClosingComponents } from './rules/vue-strong/selfClosingComponents'
import { checkDirectiveShorthands, reportDirectiveShorthands } from './rules/vue-strong/directiveShorthands'
import { checkTooManyProps, reportTooManyProps } from './rules/rrd/tooManyProps'
import { checkParameterCount, reportParameterCount } from './rules/rrd/parameterCount'

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

export const analyze = (dir: string) => {
  console.log(`\n\n${BG_INFO}Analyzing Vue files in ${dir}${BG_RESET}`)

  let errors = 0
  const files: string[] = []

  walkSync(dir, filePath => {
    if (filePath.includes('App.vue') || filePath.includes('app.vue')) {
      return
    }

    const content = fs.readFileSync(filePath, 'utf-8')
    const { descriptor } = parse(content)

    files.push(filePath)

    checkSingleNameComponent(filePath)
    checkComponentFilenameCasing(filePath)

    if (descriptor.script) {
      checkPlainScript(filePath)
    }

    const script = descriptor.scriptSetup || descriptor.script
    if (script) {
      checkSimpleProp(script, filePath)

      checkPropNameCasing(script, filePath)

      checkScriptLength(script, filePath)
      checkCyclomaticComplexity(script, filePath)
      checkElseCondition(script, filePath)
      checkTooManyProps(script, filePath)
      checkParameterCount(script, filePath)
    }

    descriptor.styles.forEach(style => {
      checkGlobalStyle(style, filePath)
    })

    if (descriptor.template) {
      checkVforNoKey(descriptor.template, filePath)
      checkVifWithVfor(descriptor.template, filePath)

      checkSelfClosingComponents(descriptor, filePath)
      checkTemplateSimpleExpression(descriptor.template, filePath)
      checkQuotedAttributeValues(descriptor, filePath)
      checkDirectiveShorthands(descriptor, filePath)
    }
  })

  console.log(`Found ${BG_INFO}${filesCount}${BG_RESET} Vue files`)

  // vue-essential rules
  errors += reportSingleNameComponent()
  errors += reportSimpleProp()
  errors += reportVforNoKey()
  errors += reportVifWithVfor()
  errors += reportGlobalStyle()

  // vue-strong rules
  errors += reportComponentFilenameCasing()
  errors += reportSelfClosingComponents()
  errors += reportPropNameCasing()
  errors += reportTemplateSimpleExpression()
  errors += reportQuotedAttributeValues()
  errors += reportDirectiveShorthands()

  // vue-reccomended rules
  // vue-caution rules

  // rrd rules
  errors += reportScriptLength()
  errors += reportPlainScript()
  errors += reportCyclomaticComplexity()
  errors += reportElseCondition()
  errors += reportTooManyProps()
  errors += reportParameterCount()

  if (!errors) {
    console.log(`${BG_OK}No code smells detected!${BG_RESET}`)
  }
}
