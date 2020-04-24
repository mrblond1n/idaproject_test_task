<template>
  <button
    class="btn"
    :class="{'btn--active': count_selected}"
    :disabled="!count_selected"
    @click="remove"
  >
    Delete
    <span v-if="count_selected">({{count_selected}})</span>
  </button>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters(["selected_items"]),
    count_selected() {
      return this.selected_items.rows.length;
    }
  },
  methods: {
    ...mapActions(["remove_items", "select_item"]),
    remove() {
      this.remove_items(this.selected_items.rows).then(() => {
        this.select_item({ rows: null });
      });
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