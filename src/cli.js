import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

import(`file:///${  path.resolve(__dirname, 'vue-mess-detector.es.js')}`)
