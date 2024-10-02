export interface PackageJson {
  version: string
  dependencies?: {
    vue?: string
    nuxt?: string
  }
  devDependencies?: {
    vue?: string
    nuxt?: string
  }
  peerDependencies?: {
    vue?: string
    nuxt?: string
  }
}
