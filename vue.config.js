module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/dashboard' : '/',

  pluginOptions: {
    i18n: {
      locale: 'ar',
      fallbackLocale: 'ar',
      localeDir: 'locales',
      enableInSFC: true,
      includeLocales: false,
      // enableBridge: true,
    },
  },

  transpileDependencies: ['vuetify'],
  // transpileDependencies: true,

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
