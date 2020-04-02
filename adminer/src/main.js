import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/common.css'

import axios from './utils/request'    //引入封装的axios


// 引入vue-socket.io
// import VueSocketio from 'vue-socket.io'   
// import socketio from 'socket.io-client'
// Vue.use(VueSocketio,socketio('http://localhost:234'));

// 引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.config.productionTip = false

Vue.prototype.$axios = axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
