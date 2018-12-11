// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import VueAwesomeSwiper from 'vue-awesome-swiper'

// require styles

import App from './App'
// import axios from './axios'
import router from './router'
import jquery from 'jquery'
// import './assets/css/bootstrap.min.css'

import './assets/js/bootstrap.min'
// import './assets/css/bootstrap.min.css'
import './assets/js/fontSize'
import './assets/js/taobao'
import './assets/js/validate.js'

import YDUI from 'vue-ydui'; /* 相当于import YDUI from 'vue-ydui/ydui.rem.js' */
// import 'vue-ydui/dist/ydui.rem.css';
/* 使用px：import 'vue-ydui/dist/ydui.px.css'; */

// Vue.use(YDUI);

//使用axios模块
import Axios from 'axios'
Vue.prototype.$axios=Axios;
//解决axios post传数据后端接受不到问题
import qs from 'qs'
Vue.prototype.$qs=qs

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
//引入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
Vue.use(VueQuillEditor)
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.config.productionTip = false

Vue.prototype.HOST = '/api'

//判断token过期
Vue.prototype.date = function () {
  let date = localStorage.getItem('expires_in')
  let currDate = parseInt(new Date().getTime()/1000)
  if (currDate > date) {
    window.localStorage.clear('token')
    router.replace({
      path: '/' // 到登录页重新获取token
    })
  }
};
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})



