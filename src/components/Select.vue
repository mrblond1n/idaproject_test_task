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
    <template v-if="method === 'cols' && menu">
      <menu-cols @close_menu="menu = !menu" :headers="headers" />
    </template>
  </div>
</template>

<script>
import menuRows from "./Menu_rows";
import menuCols from "./Menu_cols";
import { mapGetters } from "vuex";
export default {
  props: {
    method: {
      type: String,
      default: "rows"
    },
    headers: {
      type: Array,
      default: () => {}
    }
  },
  components: {
    menuRows,
    menuCols
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