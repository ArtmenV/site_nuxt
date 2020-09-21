const env = require('dotenv').config()

module.exports = {
  mode: 'universal',
  env: {
  baseUrl:
    process.env.APP_BASE_URL !== undefined
      ? process.env.APP_BASE_URL
      : process.env.NODE_ENV === 'demo'
      ? 'https://demo-dpchallengeapi.zimalab.com'
      : 'https://stagingapi.dpchallenge.zimalab.com'
  },
  /*
  ** Headers of the page
  */
  router: {
    base: '/',
    linkExactActiveClass: 'active',
    scrollBehavior: (to) => {
      if (to.hash) {
        return {selector: to.hash}
      } else {
        return { x: 0, y: 0 }
      }
    },
    middleware: [ 'routeGuard' ]
  },
  head: {
    title: 'DPChallenge',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.5, user-scalable=1, shrink-to-fit=no' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Montserrat:400,700,200|Open+Sans+Condensed:700' },
      { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.0.6/css/all.css' },
      { rel: 'stylesheet', href: 'https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css', crossorigin: 'anonymous' },
    ],
    script: [
      // { src: '/ckeditor/@ckeditor/ckeditor5-vue/_dist/ckeditor.js' }
    ],
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/sass/now-ui-kit.scss',
    '~/assets/sass/demo.scss',
    '~/assets/sass/dpchallenge/main.scss',
    'quill/dist/quill.snow.css',
    'quill/dist/quill.bubble.css',
    'quill/dist/quill.core.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/globalDirectives.js', ssr: false },
    { src: '~/plugins/element-ui.js' },
    { src: '~/api/api.js', ssr: false },
    { src: '~/plugins/now-ui-kit' },
    { src: '~plugins/nuxt-quill-plugin.js', ssr: false }
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/pwa',
    // ['nuxt-vuex-localstorage', {
    //   localStorage: [ 'user' ],
    //   mode: 'debug'
    // },
    // ],
    [
      'nuxt-element-ui',
      {
        components: ['Pagination', 'Button', 'Table', 
        'TableColumn', 'Loading', 'Checkbox','CheckboxGroup', 'Carousel', 'CarouselItem',
        'Switch', 'Progress', 'Select', 'Upload', 'Option', 'Slider', 'Radio', 'Notification', 
        'Tree', 'Alert', 'Breadcrumb', 'BreadcrumbItem'
      ],
        locale: 'fr',
      },
    ],
    [
      'nuxt-fontawesome', {
        imports: [
        {
          set: '@fortawesome/free-solid-svg-icons',
          icons: ['fas']
          },
        {
          set:'@fortawesome/free-brands-svg-icons',
          icons: ['fab']
        },
        ]
      }
    ]
  ],
  /*
  ** Build configuration
  */
  build: {
    html: { minify: { collapseWhitespace: true } },
    extractCSS: process.env.NODE_ENV === 'production',
    transpile: [ 'routeGuard.js' ],
    babel: {
      plugins: [
        [
          'component',
          {
            libraryName: 'element-ui',
            styleLibraryName: 'theme-chalk'
          },
        ]
      ]
    },
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      config.module.rules.push({
        test: /\.ya?ml$/,
        use: 'js-yaml-loader',
      })
    }
  }
}
