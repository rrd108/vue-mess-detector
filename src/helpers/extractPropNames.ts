/**
 * Extracts property names from a given props object string.
 *
 * This function uses a regular expression to find and return an array of property
 * names defined in the provided props object string. It supports both quoted and
 * unquoted property names.
 *
 * @param {string} propsObject - The props object string to extract prop names from.
 * @returns {string[]} The array of extracted prop names.
 */
export function extractPropNames(propsObject: string): string[] {
  // eslint-disable-next-line regexp/no-dupe-disjunctions
  const propRegex = /['"]?([\w-]+)['"]?\s*:|(\w+)\s*:/g
  const propNames: string[] = []
  let propMatch

  // eslint-disable-next-line no-cond-assign
  while ((propMatch = propRegex.exec(propsObject)) !== null) {
    const propName = propMatch[1] || propMatch[2]
    propNames.push(propName)
  }

  return propNames
}
