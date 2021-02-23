import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store'
import config from '@/config'
import func from '@/utils/func'
import '@/plugins/element.js'
import 'styles/index.scss'

Vue.config.productionTip = false
Vue.prototype.config = config
Vue.use(func)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#homeApp')
