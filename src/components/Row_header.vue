<template>
  <tr class="table__row">
    <th class="table__item">
      <app-checkbox :select="select_all" :is_checked="all_rows_selected" />
    </th>
    <sort-item v-if="sort_item.item" :sort_item="sort_item" />
    <template v-for="item in selected_items.cols">
      <th
        class="table__item"
        v-if="sort_item.item.name != item.name"
        :key="`header_${item.name}`"
      >{{item.text}}</th>
    </template>
    <th class="table__item"></th>
  </tr>
</template>

<script>
import sortItem from "./Sort_item";
import appCheckbox from "./Checkbox";
export default {
  components: {
    sortItem,
    appCheckbox
  },
  props: {
    sort_item: {
      type: Object,
      default: () => {}
    },
    selected_items: {
      type: Object,
      default: () => {}
    },
    rows_per_page: {
      type: Number,
      default: 10
    },
    current_data: {
      type: Array,
      default: () => {}
    },
    select_item: {
      type: Function,
      default: () => {}
    }
  },
  computed: {
    all_rows_selected() {
      let count = 0;
      this.current_data.forEach(item => {
        this.selected_items.rows.includes(item) ? (count += 1) : (count -= 1);
      });
      return count === this.rows_per_page;
    }
  },
  methods: {
    select_all() {
      if (this.all_rows_selected) {
        //all select
        this.current_data.forEach(el => this.select_item({ rows: Array(el) }));
      } else {
        // all selected reset!
        this.select_item({ rows: this.current_data });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.table__item {
  white-space: nowrap;
}
</style>