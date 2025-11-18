import type { Config } from '../types/Config'
import fs from 'node:fs/promises'
import path from 'node:path'
import { RULESETS } from '../rules/rules'
import { DEFAULT_OVERRIDE_CONFIG } from './constants'

export const checkFileExists = async (filePath: string): Promise<boolean> => {
  try {
    await fs.access(filePath, fs.constants.F_OK)
    return true
  }
  catch {
    return false
  }
}

const getConfigFileContent = async (filePath: string) => {
  // Early return if the config file does not exist
  if (!await checkFileExists(filePath)) {
    return null
  }

  try {
    const configFile = await fs.readFile(filePath, 'utf-8')
    const getConfigFileContent = JSON.parse(configFile)
    return getConfigFileContent
  }
  catch (error: Error) {
    // This error is only thrown if there is an issue reading or during JSON.parse().
    console.error(`Failed to read config file at "${filePath}". Error: ${error.message}`)
    return null
  }
}

export const getConfig = async (projectRoot: string): Promise<Config> => {
  const defaultConfig: Config = {
    apply: Object.values(RULESETS).join(','),
    ignore: '',
    fileIgnoreRules: {},
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

    if (configFileContent.ignore) {
      defaultConfig.apply = ''
    }

    return {
      ...defaultConfig,
      ...configFileContent,
      override: {
        ...defaultConfig.override,
        ...configFileContent?.override,
      },
      fileIgnoreRules: {
        ...defaultConfig.fileIgnoreRules,
        ...configFileContent?.fileIgnoreRules,
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
