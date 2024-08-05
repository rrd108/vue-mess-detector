import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Vue Mess Detector',
  description: 'A static code analysis tool for detecting code smells and best practice violations in **Vue** and **Nuxt** projects.',
  head: [['link', { rel: 'icon', href: '/favicon.ico' }], ['link', { rel: 'stylesheet', href: '/styles.css' }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    search: {
      provider: 'local',
    },
    logo: '/logo.png',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Get Started', link: '/get-started' },
    ],
    sidebar: [
      {
        items: [
          { text: 'Get Started', link: '/get-started' },
          {
            text: 'Rulesets',
            items: [
              { text: 'Vue Essential', link: '/rules/vue-essential', collapsed: true, items: [
                { text: 'Global Style', link: '/rules/vue-essential/global-style' },
                { text: 'Keyed v-for', link: '/rules/vue-essential/vfor-no-key' },
                { text: 'Simple Props Definition', link: '/rules/vue-essential/simple-prop' },
                { text: 'v-if With v-for', link: '/rules/vue-essential/vif-with-vfor' },
              ] },
              { text: 'Vue Strong', link: '/rules/vue-strong', collapsed: true, items: [
                { text: 'Component Filename Casing', link: '/rules/vue-strong/component-filename-casing' },
                { text: 'Directive Shorthands', link: '/rules/vue-strong/directive-shorthands' },
                { text: 'Prop Name Casing', link: '/rules/vue-strong/prop-name-casing' },
                { text: 'Quoted Attribute Values', link: '/rules/vue-strong/quoted-attribute-values' },
                { text: 'Self Closing Components', link: '/rules/vue-strong/self-closing-components' },
                { text: 'Simple Computed Properties', link: '/rules/vue-strong/simple-computed' },
                { text: 'Template Simple Expressions', link: '/rules/vue-strong/template-simple-expression' },
              ] },
              { text: 'Vue Recommended', link: '/rules/vue-recommended', collapsed: true, items: [
                { text: 'Element Attribute Order', link: '/rules/vue-recommended/element-attribute-order' },
                { text: 'SFC Top-level Element Order', link: '/rules/vue-recommended/top-level-element-order' },
              ] },
              { text: 'Vue Caution', link: '/rules/vue-caution', collapsed: true, items: [
                { text: 'Implicit parent-child communication', link: '/rules/vue-caution/implicit-parent-child-communication' },
              ] },
              { text: 'rrd', link: '/rules/rrd', collapsed: true, items: [
                { text: 'Cyclomatic Complexity', link: '/rules/rrd/cyclomatic-complexity' },
                { text: 'Deep Indentation', link: '/rules/rrd/deep-indentation' },
                { text: 'Else Condition', link: '/rules/rrd/else-condition' },
                { text: 'Function Size', link: '/rules/rrd/function-size' },
                { text: 'Parameter Count', link: '/rules/rrd/parameter-count' },
                { text: 'Plain Script', link: '/rules/rrd/plain-script' },
                { text: 'Script Length', link: '/rules/rrd/script-length' },
                { text: 'Short Variable Name', link: '/rules/rrd/short-variable-name' },
                { text: 'Too Many Props', link: '/rules/rrd/too-many-props' },
              ] },
            ],
          },
          { text: 'Contribute', link: '/contribute' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/rrd108/vue-mess-detector' },
    ],
  },
})
