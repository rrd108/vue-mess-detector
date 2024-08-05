import { BG_RESET, BG_WARN, TEXT_WARN, TEXT_RESET, TEXT_INFO, BG_ERR } from '../asceeCodes'
import { global, charIn, charNotIn, createRegExp, exactly, oneOrMore } from "magic-regexp";
import { getUniqueFilenameCount } from "../../helpers";

type FullWordComponentNames = { filename: string, filePath: string };

const fullWordComponentNames: FullWordComponentNames[] = [];
const MINIMAL_CONSONANTS = 3

const checkFullWordComponentName = (filePath: string) => {
  // regular expression to match `filename.vue` pattern
  const regex = createRegExp(
    oneOrMore(charNotIn('/')).grouped(),
    exactly('.vue').at.lineEnd()
  );

  const match = filePath.match(regex);

  if (match) {
    const filename = match[0]?.split('.vue')[0] as string;

    // regular expression to match and count consonants
    const consonantsRegex = createRegExp(
      charIn('bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ'),
      [global]
    )

    const consonantsMatch = filename.match(consonantsRegex);

    if (!consonantsMatch || consonantsMatch.length < MINIMAL_CONSONANTS) {
      fullWordComponentNames.push({ filename, filePath });
    }
  }
}

const reportFullWordComponentName = () => {
  if (fullWordComponentNames.length > 0) {
    // count only non duplicated objects (by its `filename` property)
    const fileCount = getUniqueFilenameCount<FullWordComponentNames>(fullWordComponentNames, 'filename')

    console.log(`\n${TEXT_INFO}vue-strong${TEXT_RESET} ${BG_ERR}full-word component names${BG_RESET} detected in ${fileCount} files.`)
    console.log(
      `👉 ${TEXT_WARN}Component names should prefer full words over abbreviations.${TEXT_RESET} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#full-word-component-names`
    )
    fullWordComponentNames.forEach(file => {
      console.log(`- ${file.filePath} 🚨 ${BG_WARN}(${file.filename})${BG_RESET}`)
    })
  }
  return fullWordComponentNames.length;
}

export { checkFullWordComponentName, reportFullWordComponentName }