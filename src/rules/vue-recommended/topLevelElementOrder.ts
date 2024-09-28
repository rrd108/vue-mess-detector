import type { FileCheckResult, Offense } from '../../types'

const results: FileCheckResult[] = []

const resetResults = () => (results.length = 0)

const checkTopLevelElementOrder = (source: string, filePath: string, topLevelElementOrder: string) => {
  // Apply `toString()` because it throws `indexOf` error otherwise
  const content = source.toString()

  const order = topLevelElementOrder === 'script-template-style'
    ? ['script setup', 'template', 'style scoped']
    : ['template', 'script setup', 'style scoped']

  // Create an array of present elements and their indices
  const elements = order.map(name => ({
    name,
    index: content.indexOf(`<${name}>`),
  })).filter(el => el.index !== -1)

  const isCorrectOrder = elements.every((el, idx) => {
    if (idx === 0) {
      return true
    }
    return elements[idx - 1].index < el.index
  })

  if (!isCorrectOrder) {
    results.push({ filePath, message: `Top level elements are <bg_warn>not following the correct order.</bg_warn>` })
  }
}

const reportTopLevelElementOrder = () => {
  const offenses: Offense[] = []

  if (results.length > 0) {
    results.forEach((result) => {
      offenses.push({
        file: result.filePath,
        rule: `<text_info>vue-recommended ~ top level element order</text_info>`,
        description: `👉 <text_warn>Single-File Components should always order <script setup>, <template>, and <style scoped> tags consistently.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-recommended/top-level-element-order.html`,
        message: `${result.message} 🚨`,
      })
    })
  }

  resetResults()

  return offenses
}

export { checkTopLevelElementOrder, reportTopLevelElementOrder }
