import { getProducts, deleteProducts } from '@/api/request'

export default {
  state: {
    table_data: [],
    // selected_items: [],
    selected_items: {
      rows: [],
      cols: []
    },
  },
  mutations: {
    loading_data(state, payload) {
      state.table_data = payload;
    },
    remove_item(state, payload) {
      state.table_data.splice(state.table_data.indexOf(payload), 1);
      state.selected_items.rows.includes(payload) && state.selected_items.rows.splice(index, 1);
    },
    select_item(state, payload) {
      let items = state.selected_items;
      let index = items.indexOf(payload);
      items.includes(payload) ? items.splice(index, 1) : items.push(payload);
    },
    select_items(state, { type, items }) {
      items.forEach(item => {
        let index = state.selected_items[type].indexOf(item);
        state.selected_items[type].includes(item) ? items[index] = item : items.push(item);
      })
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
      }).catch(e => {
        console.log(e.error || e);
      });
    },
    select_item({ commit }, { type, items }) {
      if (items.length > 1) return commit('select_items', { type, items });
      items.forEach(item => {
        commit('select_item', { item, type })
      })
    }
  },
  getters: {
    table_data: s => s.table_data,
    selected_items: s => s.selected_items
  }
}

// select_items(state, payload) {
//   let items = state.selected_items;
//   let index = items.indexOf(payload);
//   items.includes(payload) ? items[index] = payload : items.push(payload);
// }