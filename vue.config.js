

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        comps: '@/components'
      }
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    historyApiFallback: true
  }
}