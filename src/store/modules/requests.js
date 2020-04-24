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
      let index = state.selected_items.rows.indexOf(payload);
      state.selected_items.rows.includes(payload) && state.selected_items.rows.splice(index, 1);
    },
    select_item(state, { type, item }) {
      let items = state.selected_items[type];
      let index = items.indexOf(item);
      items.includes(item) ? items.splice(index, 1) : items.push(item);
    },
    select_items(state, { type, items }) {
      let items_slc = state.selected_items[type];
      items.forEach(item => {
        let index = items_slc.indexOf(item);
        items_slc.includes(item) ? items_slc[index] = item : items_slc.push(item);
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
    select_item({ commit }, payload) {
      let type = Object.keys(payload)[0];
      let items = payload[type];

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