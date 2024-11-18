import type { PackageJson } from '../types/PackageJson'

export function getVersion(vmdPackageJson: PackageJson) {
  const vmdName = 'vue-mess-detector'
  return vmdPackageJson?.devDependencies?.[vmdName]
    || vmdPackageJson?.dependencies?.[vmdName]
    || 'VMD is not installed in your project'
}
