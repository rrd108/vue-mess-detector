import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Vue Mess Detector',
  description: 'A static code analysis tool for detecting code smells and best practice violations in **Vue** and **Nuxt** projects.',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['link', { rel: 'stylesheet', href: '/styles.css' }],
    [
      'script',
      {
        async: '',
        src: 'https://www.googletagmanager.com/gtag/js?id=G-4WQ5DGB03H',
      },
    ],
    [
      'script',
      {},
      `window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-4WQ5DGB03H');`,
    ],
  ],
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
                { text: 'Single Name Components', link: '/rules/vue-essential/single-name-component' },
                { text: 'v-if With v-for', link: '/rules/vue-essential/vif-with-vfor' },
              ] },
              { text: 'Vue Strong', link: '/rules/vue-strong', collapsed: true, items: [
                { text: 'Component Filename Casing', link: '/rules/vue-strong/component-filename-casing' },
                { text: 'Component Files', link: '/rules/vue-strong/component-files' },
                { text: 'Directive Shorthands', link: '/rules/vue-strong/directive-shorthands' },
                { text: 'Full-word component names', link: '/rules/vue-strong/full-word-component-name' },
                { text: 'Prop Name Casing', link: '/rules/vue-strong/prop-name-casing' },
                { text: 'Quoted Attribute Values', link: '/rules/vue-strong/quoted-attribute-values' },
                { text: 'Self Closing Components', link: '/rules/vue-strong/self-closing-components' },
                { text: 'Simple Computed Properties', link: '/rules/vue-strong/simple-computed' },
                { text: 'Template Simple Expressions', link: '/rules/vue-strong/template-simple-expression' },
                { text: 'Multi Attribute Elements', link: '/rules/vue-strong/multi-attribute-elements' },
              ] },
              { text: 'Vue Recommended', link: '/rules/vue-recommended', collapsed: true, items: [
                { text: 'Element Attribute Order', link: '/rules/vue-recommended/element-attribute-order' },
                { text: 'SFC Top-level Element Order', link: '/rules/vue-recommended/top-level-element-order' },
              ] },
              { text: 'Vue Caution', link: '/rules/vue-caution', collapsed: true, items: [
                { text: 'Implicit parent-child communication', link: '/rules/vue-caution/implicit-parent-child-communication' },
                { text: 'Element Selectors in Scoped CSS', link: '/rules/vue-caution/element-selectors-with-scoped' },
              ] },
              { text: 'rrd', link: '/rules/rrd', collapsed: true, items: [
                { text: 'Amount of Comments', link: '/rules/rrd/amount-of-comments' },
                { text: 'Big v-if', link: '/rules/rrd/big-vif' },
                { text: 'Big v-show', link: '/rules/rrd/big-vshow' },
                { text: 'Complicated Conditions', link: '/rules/rrd/complicated-conditions' },
                { text: 'Cyclomatic Complexity', link: '/rules/rrd/cyclomatic-complexity' },
                { text: 'Computed Side Effects', link: '/rules/rrd/computed-side-effects' },
                { text: 'Deep Indentation', link: '/rules/rrd/deep-indentation' },
                { text: 'Else Condition', link: '/rules/rrd/else-condition' },
                { text: 'Function Size', link: '/rules/rrd/function-size' },
                { text: 'HTML Image Elements', link: '/rules/rrd/html-image-elements' },
                { text: 'HTML links', link: '/rules/rrd/html-link' },
                { text: 'Huge Files', link: '/rules/rrd/huge-files' },
                { text: 'If Without Curly Braces', link: '/rules/rrd/if-without-curly-braces' },
                { text: 'Magic Numbers', link: '/rules/rrd/magic-numbers' },
                { text: 'Nested Ternary', link: '/rules/rrd/nested-ternary' },
                { text: 'No !important', link: '/rules/rrd/no-important' },
                { text: 'No Direct Dom Access', link: '/rules/rrd/no-direct-dom-access' },
                { text: 'No Inline Styles', link: '/rules/rrd/no-inline-styles' },
                { text: 'No Props Destructure', link: '/rules/rrd/no-prop-destructure' },
                { text: 'No Skipped Tests', link: '/rules/rrd/no-skipped-tests' },
                { text: 'No Ts Lang', link: '/rules/rrd/no-ts-lang' },
                { text: 'No Var Declaration', link: '/rules/rrd/no-var-declaration' },
                { text: 'Parameter Count', link: '/rules/rrd/parameter-count' },
                { text: 'Plain Script', link: '/rules/rrd/plain-script' },
                { text: 'Props Drilling', link: '/rules/rrd/props-drilling' },
                { text: 'Repeated CSS', link: '/rules/rrd/repeated-css' },
                { text: 'Script Length', link: '/rules/rrd/script-length' },
                { text: 'Short Variable Name', link: '/rules/rrd/short-variable-name' },
                { text: 'Too Many Props', link: '/rules/rrd/too-many-props' },
                { text: 'VFor Expression', link: '/rules/rrd/v-for-expression' },
                { text: 'VFor with Index Key', link: '/rules/rrd/v-for-with-index-key' },
                { text: 'Zero Length Comparison', link: '/rules/rrd/zero-length-comparison' },
              ] },
              { text: 'Security', link: '/rules/security', collapsed: true, items: [
                { text: 'API Without Method', link: '/rules/security/api-without-method' },
                { text: 'Rate Limiter', link: '/rules/security/rate-limiter' },
              ] },
            ],
          },
          { text: 'Contribute', link: '/contribute' },
          { text: 'eslint-plugin-vue Comparison', link: '/eslint-comparison' },
        ],
      },
      {
        text: 'Integrations',
        items: [
          { text: 'Github Action', link: '/integrations/vmd-action' },
        ],
      },
      {
        items: [
          { text: 'Suggested Readings', link: '/suggested-readings' },
        ],
      },
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/rrd108/vue-mess-detector' }],
  },
  markdown: {
    theme: {
      light: 'vitesse-light',
      dark: 'vitesse-dark',
    },
    lineNumbers: true,
  },
})
