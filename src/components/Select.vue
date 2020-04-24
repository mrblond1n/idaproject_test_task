<template>
  <div class="select">
    <button class="btn" @click="menu = !menu">
      <div>
        {{method === 'count_rows' ? `${rows_per_page} per page` : `${selected_items.cols.length} columns selected`}}
        <span
          class="mdi mdi-16px mdi-chevron-down"
        ></span>
      </div>
    </button>
    <div v-if="menu" class="card">
      <div v-for="i in 5" :key="i">{{i}}</div>
    </div>
    <!-- <template v-if="method === 'count_rows' && menu">
      <app-rows :items="exc_selected" />
    </template>
    <template v-else-if="method === 'count_columns' && menu">
      <app-columns />
    </template>-->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    method: {
      type: String,
      default: "count_rows"
    }
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