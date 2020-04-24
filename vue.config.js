module.exports = {
  css: {
    requireModuleExtension: false,
    loaderOptions: {
      scss: {
        prependData: `@import "~@/assets/variables.scss";
                      @import "~@/assets/default.scss";
                      @import "~@/assets/btn.scss";
                      @import "~@/assets/table.scss";
                      @import "~@/assets/control.scss";
                      @import "~@/assets/card.scss";
        `
      },
    }
  }
};