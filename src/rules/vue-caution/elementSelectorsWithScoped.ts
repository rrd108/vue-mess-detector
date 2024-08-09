import type { SFCStyleBlock } from '@vue/compiler-sfc'
import type { HtmlTags } from 'html-tags'
import htmlTags from 'html-tags'
import { BG_RESET, BG_WARN, TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
import { getUniqueFilenameCount } from '../../helpers'

interface ElementSelectorsWithScoped {
  filename: string
  selector: string
}

const elementSelectorsWithScopedFiles: ElementSelectorsWithScoped[] = []

const checkElementSelectorsWithScoped = (styles: SFCStyleBlock[] | null, filePath: string) => {
  if (!styles)
    return

  const elementSelectorRegex = /([a-z]+)\s*\{[^}]*\}/gi

  styles.forEach((style) => {
    let match
    // eslint-disable-next-line no-cond-assign
    while ((match = elementSelectorRegex.exec(style.content)) !== null) {
      const selector = match[1] as HtmlTags
      if (htmlTags.includes(selector)) {
        elementSelectorsWithScopedFiles.push({ filename: filePath, selector })
      }
    }
  })
}

const reportElementSelectorsWithScoped = () => {
  if (elementSelectorsWithScopedFiles.length > 0) {
    // Count only non duplicated objects (by its `filename` property)
    const fileCount = getUniqueFilenameCount<ElementSelectorsWithScoped>(elementSelectorsWithScopedFiles, 'filename')

    console.log(
      `\n${TEXT_INFO}vue-caution${TEXT_RESET} ${BG_WARN}element selectors with scoped${BG_RESET} found in ${fileCount} files.`,
    )
    console.log(
      `👉 ${TEXT_WARN}Prefer class selectors over element selectors in scoped styles, because large numbers of element selectors are slow.${TEXT_RESET} See: https://vuejs.org/style-guide/rules-use-with-caution.html#element-selectors-with-scoped`,
    )
    elementSelectorsWithScopedFiles.forEach((file) => {
      console.log(` - ${file.filename} 🚨 ${BG_WARN}(${file.selector})${BG_RESET}`)
    })
  }
  return elementSelectorsWithScopedFiles.length
}

export { checkElementSelectorsWithScoped, reportElementSelectorsWithScoped }
