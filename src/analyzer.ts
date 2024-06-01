import { parse, compileScript } from '@vue/compiler-sfc'
import fs from 'fs'
import path from 'path'

const MAX_SCRIPT_LENGTH = 100

const BG_INFO = '\x1b[44m'
const BG_WARN = '\x1b[43m'
const BG_ERR = '\x1b[41m'
const BG_RESET = '\x1b[0m'

export const analyze = (dir: string) => {
  console.log(`${BG_INFO}Analyzing Vue files in ${dir}${BG_RESET}`)

  const files = fs.readdirSync(dir).filter(file => file.endsWith('.vue'))

  console.log(`Found ${BG_INFO}${files.length}${BG_RESET} Vue files`)

  const longScriptFiles: { name: string; scriptLength: number }[] = []

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

    // TODO add reccomendation for script setup
    if (descriptor.script) {
    }
  })

  if (longScriptFiles.length > 0) {
    console.log(`${BG_ERR}Long <script> blocks${BG_RESET} in ${longScriptFiles.length} files`)
    longScriptFiles.forEach(file => {
      console.log(`- ${file.name} (${file.scriptLength} lines)`)
    })
  }
}
