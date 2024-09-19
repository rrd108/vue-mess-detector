import type { Config } from '../types/Config'
import fs from 'node:fs/promises'
import path from 'node:path'
import { RULESETS } from '../rules/rules'
import { DEFAULT_OVERRIDE_CONFIG } from './constants'

export const getConfig = async (projectRoot: string): Promise<Config> => {
  const defaultConfig: Config = {
    path: './src',
    apply: Object.values(RULESETS).join(','),
    ignore: '',
    exclude: '',
    group: 'rule',
    level: 'all',
    sort: 'desc',
    output: 'text',
    override: DEFAULT_OVERRIDE_CONFIG,
  }

  const configPath = path.join(projectRoot, 'vue-mess-detector.json')
  try {
    const fileContent = await fs.readFile(configPath, 'utf-8')
    const fileConfig = JSON.parse(fileContent)

    return {
      ...defaultConfig,
      ...fileConfig,
      override: {
        ...defaultConfig.override,
        ...fileConfig.override,
      },
    }
  }
  catch {
    return {
      ...defaultConfig,
      isDefault: true,
    }
  }
}
