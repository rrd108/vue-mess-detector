import type { SFCScriptBlock } from '@vue/compiler-sfc'

import type { FileCheckResult, Offense } from '../../types'
import { skipComments } from '../../helpers/skipComments'
import getLineNumber from '../getLineNumber'

const results: FileCheckResult[] = []

const resetResults = () => (results.length = 0)

// Recommended order for <script setup> blocks, derived from the Vue style guide:
// https://vuejs.org/style-guide/rules-recommended.html#component-instance-options-order
// Imports → defineProps → defineEmits → defineModel → composables →
// reactive state → computed → watchers → methods → lifecycle hooks → defineExpose
const CATEGORIES = [
  'imports',
  'defineProps',
  'defineEmits',
  'defineModel',
  'composables',
  'reactive state',
  'computed',
  'watchers',
  'methods',
  'lifecycle hooks',
  'defineExpose',
] as const

type Category = (typeof CATEGORIES)[number]

const CATEGORY_PATTERNS: { category: Category, regex: RegExp }[] = [
  { category: 'imports', regex: /^\s*import\s/m },
  { category: 'defineProps', regex: /(?:withDefaults\(\s*)?defineProps\s*\(/ },
  { category: 'defineEmits', regex: /defineEmits\s*(?:<[^>]*>\s*)?\(/ },
  { category: 'defineModel', regex: /defineModel\s*\(/ },
  { category: 'composables', regex: /(?:const|let)\s+\w+\s*=\s*use[A-Z]\w*\s*\(/ },
  { category: 'reactive state', regex: /(?:const|let)\s+\w+\s*=\s*(?:ref|reactive|shallowRef|shallowReactive|customRef|toRef|toRefs)\s*\(/ },
  { category: 'computed', regex: /(?:const|let)\s+\w+\s*=\s*computed\s*\(/ },
  { category: 'watchers', regex: /(?:const|let\s+\w+\s*=\s*)?(?:watch|watchEffect|watchPostEffect|watchSyncEffect)\s*\(/ },
  { category: 'methods', regex: /(?:function\s+\w+|(?:const|let)\s+\w+\s*=\s*(?:async\s*)?(?:\([^)]*\)|\w+)\s*=>)/ },
  { category: 'lifecycle hooks', regex: /\bon(?:Mounted|BeforeMount|BeforeUpdate|Updated|BeforeUnmount|Unmounted|Activated|Deactivated|ErrorCaptured|RenderTracked|RenderTriggered)\s*\(/ },
  { category: 'defineExpose', regex: /defineExpose\s*\(/ },
]

const checkComponentOptionsOrder = (script: SFCScriptBlock | null, filePath: string) => {
  if (!script) {
    return
  }

  const content = skipComments(script.content)

  // Find the first line number for each category
  const firstOccurrences: { category: Category, lineNumber: number }[] = []

  for (const { category, regex } of CATEGORY_PATTERNS) {
    const match = regex.exec(content)
    if (match) {
      const lineNumber = getLineNumber(content, match[0])
      firstOccurrences.push({ category, lineNumber })
    }
  }

  // Sort by line number to get the actual order in the file
  const actualOrder = [...firstOccurrences].sort((a, b) => a.lineNumber - b.lineNumber)

  // Check if the actual order matches the recommended order
  let violationFound = false
  for (let i = 0; i < actualOrder.length && !violationFound; i++) {
    const current = actualOrder[i]
    const expectedIndex = CATEGORIES.indexOf(current.category)

    for (let j = i + 1; j < actualOrder.length; j++) {
      const later = actualOrder[j]
      const laterExpectedIndex = CATEGORIES.indexOf(later.category)

      // If a category that should come later appears before the current one, report it
      if (laterExpectedIndex < expectedIndex) {
        results.push({
          filePath,
          message: `line #${later.lineNumber} <bg_warn>${later.category} should come before ${current.category} in <script setup></bg_warn>`,
        })
        violationFound = true
        break // one violation per file to avoid noise
      }
    }
  }
}

const reportComponentOptionsOrder = () => {
  const offenses: Offense[] = []

  if (results.length > 0) {
    results.forEach((result) => {
      offenses.push({
        file: result.filePath,
        rule: `<text_info>vue-recommended ~ component options order</text_info>`,
        description: `👉 <text_warn>Component/instance options should follow the recommended order: imports → defineProps → defineEmits → defineModel → composables → reactive state → computed → watchers → methods → lifecycle hooks → defineExpose.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-recommended/component-options-order.html`,
        message: `${result.message} 🚨`,
      })
    })
  }

  resetResults()

  return offenses
}

export { checkComponentOptionsOrder, reportComponentOptionsOrder }
