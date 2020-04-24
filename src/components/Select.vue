<template>
  <div class="select">
    <button class="btn" @click.stop="menu = !menu">
      <div>
        {{method === 'rows' ? `${rows_per_page} per page` : `${selected_items.cols.length} columns selected`}}
        <span
          class="mdi mdi-16px mdi-chevron-down"
        ></span>
      </div>
    </button>
    <template v-if="method === 'rows' && menu">
      <menu-rows @close_menu="menu = !menu" />
    </template>
  </div>
</template>

<script>
import menuRows from "./Menu_rows";
import { mapGetters } from "vuex";
export default {
  props: {
    method: {
      type: String,
      default: "count_rows"
    }
  },
  components: {
    menuRows
  },
  data() {
    return {
      menu: false
    };
  },
  computed: {
    ...mapGetters(["rows_per_page", "selected_items"])
  }
};
</script>

<style lang="scss" scoped>
.select {
  position: relative;
}
</style>