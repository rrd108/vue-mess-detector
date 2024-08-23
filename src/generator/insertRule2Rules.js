import fs from 'node:fs/promises'
import path from 'node:path'

export const insertRule2Rules = async (ruleset, ruleName) => {
  // Read the rules.ts file
  const rulesPath = path.join('./src/rules/rules.ts')
  const content = await fs.readFile(rulesPath, 'utf8')

  // Parse the RULES object
  const rulesMatch = content.match(/export const RULES = (\{[\s\S]*?\})/)
  if (!rulesMatch) {
    throw new Error('RULES object not found in the file')
  }

  const rulesObject = eval(`(${rulesMatch[1]})`)

  // Check if the key exists
  if (!rulesObject[ruleset]) {
    throw new Error(`Key "${ruleset}" not found in RULES object`)
  }

  // Insert the new rule in alphabetical order
  const newArray = [...rulesObject[ruleset], ruleName].sort()
  rulesObject[ruleset] = newArray

  // Convert the updated object back to a string
  const updatedRulesString = JSON.stringify(rulesObject, null, 2)
    .replace(/"([^"]+)":/g, '"$1":')
    .replace(/"/g, '\'')

  // Replace the RULES object in the file content
  const updatedContent = content.replace(
    /export const RULES = \{[\s\S]*?\}/,
        `export const RULES = ${updatedRulesString}`,
  )

  // Write the updated content back to the file
  await fs.writeFile(rulesPath, updatedContent, 'utf8')
}
