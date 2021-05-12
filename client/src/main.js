import Vue from 'vue';
import YmapPlugin from 'vue-yandex-maps';
import Axios from 'axios';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;
Vue.prototype.$http = Axios;
Vue.prototype.$http.defaults.baseURL = process.env.VUE_APP_API_ENDPOINT;
const settings = {
  apiKet: 'd484d788-1d9f-4ff7-865e-c8b9854c046c',
  lang: 'ru_RU',
  coordorder: 'latlong',
  version: '2.1',
};
const token = localStorage.getItem('jwtToken');
if (token) {
  Vue.prototype.$http.defaults.headers.common.Authorization = token;
}
Vue.use(YmapPlugin, settings);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
