import Vue from 'vue'
import App from './App.vue'
import store from './store'

store.dispatch('loading_data');
// store.dispatch('select_item', { cols: store.getters.headers.map(item => item) });

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
