import type { Config } from '../types/Config'
import fs from 'node:fs/promises'
import path from 'node:path'
import { RULESETS } from '../rules/rules'
import { DEFAULT_OVERRIDE_CONFIG } from './constants'

const getConfigFileContent = async (filePath: string) => {
  try {
    const configFile = await fs.readFile(filePath, 'utf-8')
    const getConfigFileContent = JSON.parse(configFile)
    return getConfigFileContent
  }
  catch {
    return null
  }
}

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

  const configInConfigDir = path.join(projectRoot, '.config', 'vue-mess-detector.json')
  const configInRoot = path.join(projectRoot, 'vue-mess-detector.json') // TODO remove support for root config (added: 2024.10.07)

  try {
    const configFromConfigDir = await getConfigFileContent(configInConfigDir)
    const configFromRoot = await getConfigFileContent(configInRoot)

    let configFileContent
    if (configFromConfigDir) {
      configFileContent = configFromConfigDir
    }
    else if (configFromRoot) {
      console.warn('⚠️ Warning: Using configuration file from project root. Move it to .config/vue-mess-detector.json')
      configFileContent = configFromRoot
    }

    return {
      ...defaultConfig,
      ...configFileContent,
      override: {
        ...defaultConfig.override,
        ...configFileContent?.override,
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
