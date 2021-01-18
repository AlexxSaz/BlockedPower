import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store'
import dateFilter from '@/filters/date.filter'
import Loader from '@/components/app/Loader'
import 'materialize-css/dist/js/materialize.min'
import './registerServiceWorker'

Vue.config.productionTip = false

Vue.use(Vuelidate)
Vue.filter('date', dateFilter)
Vue.component('Loader', Loader)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
