import Vue from 'vue';
import App from './App';

//加载keen-ui
import Keen from 'keen-ui';
require('../node_modules/keen-ui/dist/min/keen-ui.min.css');
Vue.use(Keen);

//加载AJAX请求库
Vue.use(require('vue-resource'));

//初始化AJAX头
Vue.http.options.root = '/root';
Vue.http.headers.common['Authorization'] = 'Basic YXBpOnBhc3N3b3Jk';

//加载AJAX Service库
import Service from './models/index.js';

/* eslint-disable no-new */
new Vue({
  el: 'body',

  components: { 
  	App 
  },

  ready() {
  	Service.init(this);
  }
});
