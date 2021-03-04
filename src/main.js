import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import store from './store/index'

Vue.config.productionTip = false
Vue.prototype.$url = 'http://localhost:3000'

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
