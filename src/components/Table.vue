<template>
  <div>
    <table>
      <thead>
        <tr></tr>
      </thead>
      <tbody>
        <row v-for="item in 10" :key="item" @add_select_row="add_select_row" />
      </tbody>
    </table>
  </div>
</template>

<script>
import row from "./Row";
export default {
  components: {
    row
  },
  data() {
    return {
      selected_items: []
    };
  },
  methods: {
    add_select_row(item) {
      let items = this.selected_items;
      let index = items.indexOf(item);
      items.includes(item) ? items.splice(index, 1) : items.push(item);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>