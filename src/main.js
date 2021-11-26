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

import  VueQuillEditor from 'vue-quill-editor'
// require styles 引入样式
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
Vue.use(VueQuillEditor);
import  Editor from './components/Editor.vue';
Vue.component("Editor",Editor);

//添加请求拦截器，在请求头中加token
axios.interceptors.request.use(
  config => {
    if (sessionStorage.getItem('cat_token')) {
	  // config.headers.Authorization = sessionStorage.getItem('cat_token');
      config.headers.common['token'] = sessionStorage.getItem('cat_token');
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  });

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
