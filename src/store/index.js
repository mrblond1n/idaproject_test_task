import Vue from 'vue'
import Vuex from 'vuex'

import requests from './modules/requests'
// import table_opt from './modules/table_opt'
// import select from './modules/select'


Vue.use(Vuex)


export default new Vuex.Store({
  modules: {
    requests,
    // table_opt,
    // select
  }
})