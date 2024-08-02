// https://github.com/nuxt-themes/docus/blob/main/nuxt.schema.ts
export default defineAppConfig({
  docus: {
    title: 'Vue Mess Detector',
    description: 'A static code analysis tool for detecting code smells and best practice violations in Vue.js and Nuxt.js projects.',
    image: '/logo.png',
    socials: {
      twitter: 'radharadhya',
      github: 'rrd108/vue-mess-detector',
      /*nuxt: {
        label: 'Nuxt',
        icon: 'simple-icons:nuxtdotjs',
        href: 'https://nuxt.com'
      }*/
    },
    /*github: {
      dir: '.starters/default/content',
      branch: 'main',
      repo: 'docus',
      owner: 'nuxt-themes',
      edit: true
    },*/
    aside: {
      level: 0,
      collapsed: false,
      exclude: []
    },
    main: {
      padded: true,
      fluid: true
    },
    header: {
      logo: true,
      showLinkIcon: true,
      exclude: [],
      fluid: true
    },
    logo:{
      dark: '/logo.png',
      light: '/logo.png'
    }
  }
})
