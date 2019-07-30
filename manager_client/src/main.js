import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import ElementUI from 'element-ui';
import '~/../../web_depends/assets/css/theme-green/index.css'
import axios from './net/axios';
import Avue from '@smallwei/avue/lib/index.js'
import Axios from 'axios'

Vue.use(Avue, Axios)
Vue.use(ElementUI, {
	size: 'medium'
});

Vue.config.productionTip = false

Vue.prototype.$axios = axios;
Vue.prototype.$notify = {
	success: opts => {
		Notification.success(opts);
	},

	error: opts => {
		Notification.error(opts);
	},

	warn: opts => {
		Notification.warning(opts);
	}
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
