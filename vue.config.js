module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/dashboard' : '/',

  pluginOptions: {
    i18n: {
      locale: undefined,
      fallbackLocale: undefined,
      localeDir: undefined,
      enableInSFC: undefined,
    },
  },

  transpileDependencies: ['vuetify'],

  css: {
    loaderOptions: {
      scss: {
        additionalData: `
          @import "~@/assets/scss/abstracts/_variables.scss"; 
          @import "~@/assets/scss/abstracts/_mixins.scss";
        `,
      },
    },
  },
}
