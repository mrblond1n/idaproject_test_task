<template>
  <tr @click="select_row">
    <checkbox :is_checked="row_is_select" />
    <td v-for="header in headers" :key="header.name">{{item[header.name]}}</td>
    <td>
      <button class="btn" v-if="!dialog" @click.stop="dialog = !dialog">delete</button>
      <div v-else>
        <app-dialog @close_dialog="() => {dialog = false}" @remove_item="remove(item)" />
      </div>
    </td>
  </tr>
</template>

<script>
import checkbox from "./Checkbox";
import appDialog from "./Dialog";
import { mapActions } from "vuex";
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
      dialog: false,
      row_is_select: false
    };
  },
  methods: {
    ...mapActions(["remove_item", "select_item"]),
    select_row() {
      this.row_is_select = !this.row_is_select;
      this.select_item(Array(this.item));
    },
    remove(item) {
      this.remove_item(item);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>