import DefaultTheme from 'vitepress/theme'
import Contributors from '../components/Contributors.vue'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('Contributors', Contributors)
  },
}
