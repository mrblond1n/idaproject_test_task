import { getProducts, deleteProducts } from '@/api/request'

export default {
  state: {
    table_data: [],
    selected_items: []
  },
  mutations: {
    loading_data(state, payload) {
      state.table_data = payload;
    },
    remove_item(state, payload) {
      state.table_data.splice(state.table_data.indexOf(payload), 1);
    },
    select_item(state, payload) {
      let items = state.selected_items;
      let index = items.indexOf(payload);
      items.includes(payload) ? items.splice(index, 1) : items.push(payload);
    },
    unselect_item(state, payload) {
      let items = state.selected_items;
      let index = items.indexOf(payload);
      items.includes(payload) && items.splice(index, 1);
    }
  },
  actions: {
    async loading_data({ commit }) {
      await getProducts().then(response => {
        commit('loading_data', response);
        console.log('data loaded');

      }).catch(e => {
        console.log(e.error || e);

      });
    },
    async remove_item({ commit }, payload) {
      await deleteProducts().then(() => {
        commit('remove_item', payload);
        commit('unselect_item', payload);
      }).catch(e => {
        console.log(e.error || e);
      });
    },
    select_item({ commit }, payload) {
      payload.forEach(item => {
        commit('select_item', item)
      })
    }
  },
  getters: {
    table_data: s => s.table_data.slice(0, 10),
    selected_items: s => s.selected_items
  }
}