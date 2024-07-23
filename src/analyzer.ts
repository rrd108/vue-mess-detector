import { parse } from '@vue/compiler-sfc'
import fs from 'fs'
import path from 'path'
import { BG_INFO, BG_RESET, BG_OK } from './rules/asceeCodes'
import * as rules from './rules'

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

export const analyze = (dir: string, ignore: Array<rules.RuleType> = []) => {
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
      rules.checkSingleNameComponent(filePath)
    }
    if (!ignore.includes('vue-strong')) {
      rules.checkComponentFilenameCasing(filePath)
    }

    if (!ignore.includes('rrd') && descriptor.script) {
      rules.checkPlainScript(filePath)
    }

    const script = descriptor.scriptSetup || descriptor.script
    if (script) {
      if (!ignore.includes('vue-essential')) {
        rules.checkSimpleProp(script, filePath)
      }

      if (!ignore.includes('vue-strong')) {
        rules.checkPropNameCasing(script, filePath)
        rules.checkComponentFiles(script, filePath)
        rules.checkSimpleComputed(script, filePath)
      }

      if (!ignore.includes('vue-caution')) {
        rules.checkImplicitParentChildCommunication(script, filePath)
      }

      if (!ignore.includes('rrd')) {
        rules.checkScriptLength(script, filePath)
        rules.checkCyclomaticComplexity(script, filePath)
        rules.checkElseCondition(script, filePath)
        rules.checkTooManyProps(script, filePath)
        rules.checkFunctionSize(script, filePath)
        rules.checkParameterCount(script, filePath)
        rules.checkShortVariableName(script, filePath)
      }
    }

    descriptor.styles.forEach(style => {
      if (!ignore.includes('vue-essential')) {
        rules.checkGlobalStyle(style, filePath)
      }
    })

    if (descriptor.template) {
      if (!ignore.includes('vue-essential')) {
        rules.checkVforNoKey(descriptor.template, filePath)
        rules.checkVifWithVfor(descriptor.template, filePath)
      }

      if (!ignore.includes('vue-strong')) {
        rules.checkSelfClosingComponents(descriptor, filePath)
        rules.checkTemplateSimpleExpression(descriptor.template, filePath)
        rules.checkQuotedAttributeValues(descriptor, filePath)
        rules.checkDirectiveShorthands(descriptor, filePath)
      }
    }
  })

  console.log(`Found ${BG_INFO}${filesCount}${BG_RESET} Vue files`)

  // vue-essential rules
  errors += rules.reportSingleNameComponent()
  errors += rules.reportSimpleProp()
  errors += rules.reportVforNoKey()
  errors += rules.reportVifWithVfor()
  errors += rules.reportGlobalStyle()

  // vue-strong rules
  errors += rules.reportComponentFilenameCasing()
  errors += rules.reportSelfClosingComponents()
  errors += rules.reportPropNameCasing()
  errors += rules.reportTemplateSimpleExpression()
  errors += rules.reportQuotedAttributeValues()
  errors += rules.reportDirectiveShorthands()
  errors += rules.reportSimpleComputed()
  errors += rules.reportComponentFiles()

  // vue-reccomended rules

  // vue-caution rules
  errors += rules.reportImplicitParentChildCommunication()

  // rrd rules
  errors += rules.reportScriptLength()
  errors += rules.reportPlainScript()
  errors += rules.reportCyclomaticComplexity()
  errors += rules.reportElseCondition()
  errors += rules.reportTooManyProps()
  errors += rules.reportFunctionSize()
  errors += rules.reportParameterCount()
  errors += rules.reportShortVariableName()

  if (!errors) {
    console.log(`${BG_OK}No code smells detected!${BG_RESET}`)
  }
}
