const ENV = process.env.VUE_APP_TITLE === 'pre' ? 'pre'
  : process.env.NODE_ENV === 'production' ? 'production' : 'development'

// 开发版
const dev = {
  env: 'dev',
  baseUrl: 'http://localhost:8081',
  debug: true,
}
// 正式版
const release = {
  env: 'release',
  baseUrl: '',
  debug: false,
}

const common = {
  loginPath: '/pages/login/login',
}

let config = {}
if (ENV === 'release') {
  config = Object.assign({}, common, release)
} else {
  config = Object.assign({}, common, dev)
}

export default config
