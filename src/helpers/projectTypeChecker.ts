import fs from 'node:fs'
import path from 'node:path'
import { getPackageJson } from './getPackageJson'
import getProjectRoot from './getProjectRoot'

const getProjectPath = async () => {
  // eslint-disable-next-line node/prefer-global/process
  return await getProjectRoot(process?.cwd() || './') || ''
}

const checkDependency = async (dependencyName: 'vue' | 'nuxt', projectRoot: string) => {
  const projectPath = await getProjectPath()
  const packageJsonPath = path.join(projectPath, 'package.json')
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = await getPackageJson(projectRoot)
    return Boolean(
      packageJson.dependencies?.[dependencyName]
      || packageJson.devDependencies?.[dependencyName]
      || packageJson.peerDependencies?.[dependencyName],
    )
  }
  return false
}

const isNuxtProject = async (projectRoot: string) => {
  const projectPath = await getProjectPath()
  const nuxtConfigFiles = ['nuxt.config.js', 'nuxt.config.ts']
  return await checkDependency('nuxt', projectRoot) || nuxtConfigFiles.some(file => fs.existsSync(path.join(projectPath, file)))
}

const isVueProject = async (projectRoot: string) => {
  const projectPath = await getProjectPath()
  const vueConfigFiles = ['vue.config.js', 'vue.config.ts']
  const isNuxt = await isNuxtProject(projectRoot)
  return !isNuxt && (await checkDependency('vue', projectRoot) || vueConfigFiles.some(file => fs.existsSync(path.join(projectPath, file))))
}

export { isNuxtProject, isVueProject }
