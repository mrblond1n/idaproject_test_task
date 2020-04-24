<template>
  <tr @click="select_row">
    <td>
      <checkbox :is_checked="selected_items.rows.includes(item)" />
    </td>
    <td v-for="header in selected_items.cols" :key="header.name">{{item[header.name]}}</td>
    <td>
      <button class="btn" @click.stop="dialog = !dialog">delete</button>
      <template v-if="dialog">
        <app-dialog @close_dialog="() => {dialog = false}" @remove_item="remove(item)" />
      </template>
    </td>
  </tr>
</template>

<script>
import checkbox from "./Checkbox";
import appDialog from "./Dialog";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    checkbox,
    appDialog
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    headers: {
      type: Array,
      default: () => {}
    }
  },
  data() {
    return {
      dialog: false
    };
  },
  computed: {
    ...mapGetters(["selected_items"])
  },
  methods: {
    ...mapActions(["remove_item", "select_item"]),
    select_row() {
      this.select_item({ rows: Array(this.item) });
    },
    remove(item) {
      this.remove_item(item);
    }
  }
};
</script>

<style lang="scss" scoped>
tr {
  position: relative;
}
td {
  position: relative;
  padding: 1rem;
}
</style>