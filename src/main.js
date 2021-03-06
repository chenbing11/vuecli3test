import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import './assets/style/varibles.less'
import H3IModal from './plugins/index.js'
// import './assets/style/reset.less'

import iview from 'iview';
import 'iview/dist/styles/iview.css';

Vue.use(iview);

Vue.config.productionTip = false
Vue.prototype.$iModal = H3IModal;
// Vue.use(H3IModal);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
