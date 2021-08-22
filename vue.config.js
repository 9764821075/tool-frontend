module.exports = {
  devServer: {
    proxy: "http://localhost:3000"
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/assets/css/_variables.scss";
        `
      }
    }
  }
}
