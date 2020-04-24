<template>
  <div>
    <button
      class="btn"
      :class="{'btn--active': count_selected}"
      :disabled="!count_selected"
      @click.stop="dialog = !dialog"
    >
      Delete
      <span v-if="count_selected">({{count_selected}})</span>
    </button>
    <template v-if="dialog">
      <app-dialog msg="delete items" @close_dialog="() => {dialog = false}" @remove_item="remove" />
    </template>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import appDialog from "./Dialog";
export default {
  components: {
    appDialog
  },
  data() {
    return {
      dialog: false
    };
  },
  computed: {
    ...mapGetters(["selected_items"]),
    count_selected() {
      return this.selected_items.rows.length;
    }
  },
  methods: {
    ...mapActions(["remove_item", "select_item"]),
    remove() {
      this.selected_items.rows.forEach(item => {
        this.remove_item(item);
      });
      this.dialog = false;
    }
  }
};
</script>

<style lang="scss">
.btn--active {
  background: $active;
  color: #fff;
  span {
    color: #fff;
  }
}
</style>