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
import { checkFunctionSize, reportFunctionSize } from './rules/rrd/functionSize'
import { checkParameterCount, reportParameterCount } from './rules/rrd/parameterCount'
import { checkShortVariableName, reportShortVariableName } from './rules/rrd/shortVariableName'
import { checkSimpleComputed, reportSimpleComputed } from './rules/vue-strong/simpleComputed'
import { checkComponentFiles, reportComponentFiles } from './rules/vue-strong/componentFiles'
import {
  checkImplicitParentChildCommunication,
  reportImplicitParentChildCommunication,
} from './rules/vue-caution/implicitParentChildCommunication'
import { RuleSetType } from './rules/rules'

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

  let errors = 0
  const files: string[] = []

  walkSync(dir, filePath => {
    if (filePath.includes('App.vue') || filePath.includes('app.vue')) {
      return
    }

    const content = fs.readFileSync(filePath, 'utf-8')
    const { descriptor } = parse(content)

    files.push(filePath)

    if (!ignore.includes('vue-essential')) {
      checkSingleNameComponent(filePath)
    }
    if (!ignore.includes('vue-strong')) {
      checkComponentFilenameCasing(filePath)
    }

    if (!ignore.includes('rrd') && descriptor.script) {
      checkPlainScript(filePath)
    }

    const script = descriptor.scriptSetup || descriptor.script
    if (script) {
      if (!ignore.includes('vue-essential')) {
        checkSimpleProp(script, filePath)
      }

      if (!ignore.includes('vue-strong')) {
        checkPropNameCasing(script, filePath)
        checkComponentFiles(script, filePath)
        checkSimpleComputed(script, filePath)
      }

      if (!ignore.includes('vue-caution')) {
        checkImplicitParentChildCommunication(script, filePath)
      }

      if (!ignore.includes('rrd')) {
        checkScriptLength(script, filePath)
        checkCyclomaticComplexity(script, filePath)
        checkElseCondition(script, filePath)
        checkTooManyProps(script, filePath)
        checkFunctionSize(script, filePath)
        checkParameterCount(script, filePath)
        checkShortVariableName(script, filePath)
      }
    }

    descriptor.styles.forEach(style => {
      if (!ignore.includes('vue-essential')) {
        checkGlobalStyle(style, filePath)
      }
    })

    if (descriptor.template) {
      if (!ignore.includes('vue-essential')) {
        checkVforNoKey(descriptor.template, filePath)
        checkVifWithVfor(descriptor.template, filePath)
      }

      if (!ignore.includes('vue-strong')) {
        checkSelfClosingComponents(descriptor, filePath)
        checkTemplateSimpleExpression(descriptor.template, filePath)
        checkQuotedAttributeValues(descriptor, filePath)
        checkDirectiveShorthands(descriptor, filePath)
      }
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
  errors += reportSimpleComputed()
  errors += reportComponentFiles()

  // vue-reccomended rules

  // vue-caution rules
  errors += reportImplicitParentChildCommunication()

  // rrd rules
  errors += reportScriptLength()
  errors += reportPlainScript()
  errors += reportCyclomaticComplexity()
  errors += reportElseCondition()
  errors += reportTooManyProps()
  errors += reportFunctionSize()
  errors += reportParameterCount()
  errors += reportShortVariableName()

  if (!errors) {
    console.log(`${BG_OK}No code smells detected!${BG_RESET}`)
  }
}
