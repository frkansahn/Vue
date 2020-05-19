import Vue from 'vue'
import VueI18n from 'vue-i18n'
import router from './router/index'
import App from './App.vue'
import axioss from './api/vue-axios/vue-index'
import store from './Store/index'
import VueTelInput from 'vue-tel-input'
import CKEditor from '@ckeditor/ckeditor5-vue'
import DrVueEcharts from 'dr-vue-echarts';

Vue.config.productionTip = false;
Vue.filter('formatDate', function(value) {
  if (value) {
    return new Date(value).toLocaleString()
  }
});

Vue.filter('formatPrice', function(value) {
  if (value) {
    return parseFloat(value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + ' TL';
  }
});
Vue.use(VueI18n);
Vue.use(VueTelInput);
Vue.use(CKEditor);
Vue.use(DrVueEcharts)

new Vue({
  render: h => h(App),
  router,
  store,
  axioss
}).$mount('#app')
