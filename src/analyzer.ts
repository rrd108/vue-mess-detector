import { parse, compileScript } from '@vue/compiler-sfc'
import fs from 'fs'
import path from 'path'

const MAX_SCRIPT_LENGTH = 100

const BG_INFO = '\x1b[44m'
const BG_WARN = '\x1b[43m'
const BG_ERR = '\x1b[41m'
const BG_OK = '\x1b[42m'
const BG_RESET = '\x1b[0m'

const TEXT_WARN = '\x1b[33m'
const TEXT_RESET = '\x1b[0m'

export const analyze = (dir: string) => {
  console.log(`${BG_INFO}Analyzing Vue files in ${dir}${BG_RESET}`)

  const files = fs.readdirSync(dir).filter(file => file.endsWith('.vue'))

  console.log(`Found ${BG_INFO}${files.length}${BG_RESET} Vue files`)

  const longScriptFiles: { name: string; scriptLength: number }[] = []
  const plainScriptFiles: string[] = []

  files.forEach(file => {
    const filePath = path.join(dir, file)
    const content = fs.readFileSync(filePath, 'utf-8')
    const { descriptor } = parse(content)

    if (descriptor.scriptSetup) {
      const lines = descriptor.scriptSetup.content.split('\n')
      if (lines.length > MAX_SCRIPT_LENGTH) {
        longScriptFiles.push({ name: file, scriptLength: lines.length })
      }
    }

    if (descriptor.script) {
      plainScriptFiles.push(file)
    }
  })

  if (longScriptFiles.length > 0) {
    console.log(`${BG_ERR}Long <script> blocks${BG_RESET} in ${longScriptFiles.length} files.`)
    console.log(
      `👉 ${TEXT_WARN}Try to refactor out the logic into composition functions or other files and keep the length under ${MAX_SCRIPT_LENGTH} lines.${TEXT_RESET}`
    )
    longScriptFiles.forEach(file => {
      console.log(`- ${file.name} (${file.scriptLength} lines)`)
    })
  }

  if (plainScriptFiles.length > 0) {
    console.log(`${BG_WARN}Plain <script> blocks${BG_RESET} in ${plainScriptFiles.length} files.`)
    console.log(`👉 ${TEXT_WARN} Consider using <script setup> to leverage the new SFC <script> syntax.${TEXT_RESET}`)
    plainScriptFiles.forEach(file => {
      console.log(`- ${file}`)
    })
  }

  if (!longScriptFiles.length && !plainScriptFiles.length) {
    console.log(`${BG_OK}No code smells detected!${BG_RESET}`)
  }
}
