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
    <transition name="slide">
      <app-notify v-if="notify" :notify="notify" @close_notify="notify = null" />
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import appDialog from "./Dialog";
import appNotify from "./Notify";
export default {
  components: {
    appDialog,
    appNotify
  },
  data() {
    return {
      dialog: false,
      notify: null
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
      let count = this.count_selected;
      this.notify = null;
      this.selected_items.rows.forEach(item => {
        this.remove_item(item).then(() => {
          this.notify = {
            text:
              this.count_selected == 0
                ? `All items removed`
                : `Successfully deleted ${count -
                    this.count_selected} of ${count}`,
            color: "success"
          };
        });
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