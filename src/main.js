import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './api/mock.api'; // 接口API

import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
Vue.use(ViewUI);

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//axios
import axios from 'axios'
Vue.prototype.axios = axios;    //全局注册，

//时间格式组件
import Moment from 'moment'
Vue.prototype.moment = Moment
// 添加请求拦截器，在请求头中加token
// axios.interceptors.request.use(
//   config => {
//     if (sessionStorage.getItem('cat_token')) {
// 	  // config.headers.Authorization = sessionStorage.getItem('cat_token');
//       config.headers.common['token'] = sessionStorage.getItem('cat_token');
//     }
//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   });

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
