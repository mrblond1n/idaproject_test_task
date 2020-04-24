<template>
  <tr @click="select_row">
    <checkbox :is_checked="row_is_select" />
    <td v-for="data in item" :key="data">{{data}}</td>
    <td>
      <button class="btn" v-if="!dialog" @click="dialog = !dialog">delete</button>
      <div v-else>
        <app-dialog @close_dialog="() => {dialog = false}" />
      </div>
    </td>
  </tr>
</template>

<script>
import checkbox from "./Checkbox";
import appDialog from "./Dialog";
export default {
  components: {
    checkbox,
    appDialog
  },
  props: {
    item: {
      type: Object,
      default: () => ({ product: "test", iron: "123", calories: "321" })
    }
  },
  data() {
    return {
      dialog: false,
      row_is_select: false
    };
  },
  methods: {
    select_row() {
      this.row_is_select = !this.row_is_select;
      this.$emit("add_select_row", this.item);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>