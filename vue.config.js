module.exports = {
  css: {
    requireModuleExtension: false,
    loaderOptions: {
      scss: {
        prependData: `@import "~@/assets/variables.scss";
                      @import "~@/assets/default.scss";
        `
      },
    }
  }
};