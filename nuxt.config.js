import colors from 'vuetify/es5/util/colors'

// only add `router.base = '/<repository-name>/'` if `DEPLOY_ENV` is `GH_PAGES`
const routerBase = process.env.DEPLOY_ENV === 'GH_PAGES' ? {
  router: {
    base: '/nuxt-chuck-norris/'
  }
} : {}

export default {
  ...routerBase,
  mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    // titleTemplate: '%s - ' + process.env.npm_package_name,
    title: 'Chuck Norris',
    meta: [{
      charset: 'utf-8'
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1'
    },
    {
      hid: 'description',
      name: 'description',
      content: process.env.npm_package_description || ''
    }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: `${process.env.DEPLOY_ENV === 'GH_PAGES' ? '/nuxt-chuck-norris' : ''}/favicon.ico`
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
    }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#fff'
  },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/axios'],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/vuetify',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/eslint-module',
    '@nuxtjs/pwa'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    theme: {
      primary: colors.blue.darken2,
      accent: colors.grey.darken3,
      secondary: colors.amber.darken3,
      info: colors.teal.lighten1,
      warning: colors.amber.base,
      error: colors.deepOrange.accent4,
      success: colors.green.accent3
    }
  },
  generate: {
    fallback: true // if you want to use '404.html' instead of the default '200.html'
  },
  /*
   ** Build configuration
   */
  build: {
    filenames: {
      chunk: ({ isDev }) => isDev ? '[name].js' : '[id].[chunkhash].js'
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
