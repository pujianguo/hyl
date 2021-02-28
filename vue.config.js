const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const isProduction = process.env.NODE_ENV === 'production'

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: './',
  outputDir: 'dist',
  pages: {
    // home: {
    //   // 应用入口配置，相当于单页面应用的main.js，必需项
    //   entry: 'src/modules/console/console.js',

    //   // 应用的模版，相当于单页面应用的public/index.html，可选项，省略时默认与模块名一致
    //   template: 'public/console.html',

    //   // 编译后在dist目录的输出文件名，可选项，省略时默认与模块名一致
    //   filename: 'console.html',

    //   // 标题，可选项，一般情况不使用，通常是在路由切换时设置title
    //   // 需要注意的是使用title属性template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
    //   title: 'console page',

    //   // 包含的模块，可选项
    //   chunks:['chunk-vendors','chunk-common'],
    // },
    // chunks:['chunk-vendors','chunk-common']
    // home: 'src/modules/home/main.js',
    // weifuwu: 'src/modules/weifuwu/main.js',
    weifuwu: {
      entry: 'src/modules/weifuwu/main.js',
      template: 'public/weifuwu.html',
      filename: 'weifuwu.html',
      title: '微服务',
      chunks: ['chunk', 'chunk-vendors', 'chunk-common', 'weifuwu', 'vendor'],
    },
    chonggou: {
      entry: 'src/modules/chonggou/main.js',
      template: 'public/chonggou.html',
      filename: 'chonggou.html',
      title: '重构需求',
      chunks: ['chunk', 'chunk-vendors', 'chunk-common', 'chonggou', 'vendor'],
    },
  },
  devServer: {
    host: 'localhost',
    port: 80,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '/api': '/',
        },
      },
    },
    disableHostCheck: true, // 绑定本地host时需要设置
    compress: false, // 压缩
    overlay: { // 错误、警告在页面弹出
      warnings: true,
      errors: true,
    },
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('api', resolve('src/api'))
      .set('styles', resolve('src/styles'))
      .set('components', resolve('src/components'))
      .set('home', resolve('src/modules/home'))
      .set('weifuwu', resolve('src/modules/weifuwu'))
      .set('chonggou', resolve('src/modules/chonggou'))

    // if (isProduction) {
    //   config.plugins.delete('preload')
    //   config.optimization.minimize(true)
    //   config.optimization.splitChunks({
    //     chunks: 'all',
    //   })
    // }
  },
  css: {
    // requireModuleExtension: false, // 关闭之后element-ui无法使用
    extract: true,
    sourceMap: false,
    loaderOptions: {
      scss: {
        prependData: '@import \'~styles/mixins.scss\';',
      },
    },
  },
  configureWebpack: config => {
    if (isProduction) {
      config.plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            warnings: false,
            compress: {
              drop_debugger: true,
              drop_console: true,
              pure_funcs: ['console.log'],
            },
            sourceMap: false,
            parallel: true,
          },
        }),
      )
    }
  },
  productionSourceMap: false,
  parallel: require('os').cpus().length > 1,
}
