import Vue from 'vue';
import ElementPlus from 'element-plus';
import App from './App.vue';
import router from './router';
import store from './store';
import 'element-plus/dist/index.css';

Vue.config.productionTip = false;

Vue.use(ElementPlus);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
