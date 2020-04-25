export default {
  state: {
    rows_per_page: 10,
    sort_item: {
      item: {},
      type: 0
    },
    pagination: 0
  },
  mutations: {
    set_rows_show(state, payload) {
      state.rows_per_page = payload
    },
    set_sort_item(state, payload) {
      state.sort_item = payload
    },
    set_pagination(state, payload) {
      state.pagination += payload
    }
  },
  actions: {
    set_rows_show({ commit }, payload) {
      commit('set_rows_show', payload)
    },
    set_sort_item({ commit }, payload) {
      commit('set_sort_item', payload)
    },
    set_pagination({ commit }, payload) {
      commit('set_pagination', payload)
    }
  },
  getters: {
    rows_per_page: s => s.rows_per_page,
    sort_item: s => s.sort_item,
    pagination: s => s.pagination
  }
}