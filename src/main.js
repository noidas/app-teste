import Vue from 'vue'
import App from './App.vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import VueApexCharts from 'vue-apexcharts'

import vuetify from './plugins/vuetify'
import store from './store'
import router from './router'

import './utils/filters'

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

Vue.use(VueApexCharts)

Vue.component('apexchart', VueApexCharts)

Vue.config.productionTip = false

new Vue({
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
