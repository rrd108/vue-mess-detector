import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Vue Mess Detector',
  description: 'A static code analysis tool for detecting code smells and best practice violations in **Vue** and **Nuxt** projects.',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    search: {
      provider: 'local'
    },
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
              { text: 'Vue Essential', link: '/rules/vue-essential' },
              { text: 'Vue Strong', link: '/rules/vue-strong' },
              { text: 'Vue Recommended', link: '/rules/vue-recommended' },
              { text: 'Vue Caution', link: '/rules/vue-caution' },
              { text: 'rrd', link: '/rules/rrd' },
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
