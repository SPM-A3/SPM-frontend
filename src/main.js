import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/ant-design-vue.js'
import global from "@/global/global.js"
import VueCookies from 'vue-cookies';

Vue.use(VueCookies)
Vue.prototype.$global = global
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
