<template>
  <div class="row">
    <button class="btn" :disabled="decrease_disable" @click="set_pagination(-1)">
      <span class="mdi mdi-16px mdi-chevron-left"></span>
    </button>
    <p>{{`${(rows_per_page * pagination) + 1}-${rows_per_page * (pagination + 1)} `}}</p>of
    <p>{{` ${table_data.length}`}}</p>
    <button class="btn" :disabled="increase_disable" @click="set_pagination(1)">
      <span class="mdi mdi-16px mdi-chevron-right"></span>
    </button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters(["rows_per_page", "pagination", "table_data"]),
    decrease_disable() {
      return this.pagination <= 0;
    },
    increase_disable() {
      return this.pagination + 1 >= this.table_data.length / this.rows_per_page;
    }
  },
  methods: {
    ...mapActions(["set_pagination"])
  }
};
</script>

<style lang="scss" scoped>
.row {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>