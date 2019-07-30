import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import ElementUI from 'element-ui'
import Axios from 'axios'
import VueAxios from 'vue-axios'
// import Avue from '@smallwei/avue/lib/index.js'

// import 'element-ui/lib/theme-chalk/index.css'
import './registerServiceWorker';
// import '@/assets/iconfonts/iconfont.css'
// import '@/style/common.scss'
// import '@smallwei/avue/lib/theme-chalk/index.css'

Vue.config.productionTip = false
// Vue.use(ElementUI)
// Vue.use(Avue, Axios)
Vue.use(VueAxios, Axios)

Axios.interceptors.response.use((response) => {
  if (response.data.code === 7) {
    router.push({ path: '/login' })
    ElementUI.Message.error('用户未登录，请先登录')
    return Promise.reject(response)
  } else {
    return Promise.resolve(response)
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
