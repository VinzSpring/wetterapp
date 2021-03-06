import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import '@fortawesome/fontawesome-free/css/all.css' // Ensure you are using css-loader


Vue.config.productionTip = false

Vue.use(vuetify, {
  iconfont: 'fa'
})

const v = new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
