
/**
 * @author Jendra Bayu Nugraha
 */

import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import 'bulma/css/bulma.min.css'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import './validate-rules'
Vue.config.productionTip = false
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);


new Vue({
  router: router,
  store: store,
  render: h => h(App),
}).$mount('#app')
