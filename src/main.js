import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import TypeNav from '@/components/TypeNav';
import Pagination from '@/components/Pagination';
import SliderLoop from "@/components/SliderLoop";
import store from '@/store';
import '@/mock/mockServer';
import "swiper/css/swiper.css";
import * as API from "@/api";
import {Message,MessageBox,Button,Input} from 'element-ui';
import VueLazyload from 'vue-lazyload';
import loading from '@/assets/images/loading.gif'
import "./validate" //引入和表单验证相关的模块

Vue.use(VueLazyload,{
  loading
  })
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$message = Message;

Vue.component('TypeNav',TypeNav)
Vue.component('SliderLoop',SliderLoop)
Vue.component('Pagination',Pagination)
Vue.component(Button.name, Button);
Vue.use(Input)

Vue.config.productionTip = false


new Vue({
  beforeCreate(){
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  render: h => h(App),
  router,
  store,
}).$mount('#app')
