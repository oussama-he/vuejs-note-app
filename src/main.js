import Vue from 'vue'
import App from './App.vue'

let VueTruncate = require('vue-truncate-filter')
Vue.use(VueTruncate)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
