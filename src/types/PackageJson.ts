export interface PackageJson {
  version: string
  dependencies?: {
    'vue'?: string
    'nuxt'?: string
    'vue-mess-detector'?: string
  }
  devDependencies?: {
    'vue'?: string
    'nuxt'?: string
    'vue-mess-detector'?: string
  }
  peerDependencies?: {
    vue?: string
    nuxt?: string
  }
}
