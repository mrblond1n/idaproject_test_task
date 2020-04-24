<template>
  <div>
    <div class="panel">
      <div class="panel__item">
        <p>Sorting by:</p>
        <template v-for="item in headers">
          <sort-button :key="item.name" :item="item" />
        </template>
      </div>
      <div class="panel__item">
        <app-remove />
        <select-button method="rows" />
        <app-pagination />
        <select-button method="cols" :headers="headers" />
      </div>
    </div>
    <table class="table">
      <thead class="table__head">
        <tr class="table__row">
          <th class="table__item">
            <app-checkbox :select="select_all" :is_checked="all_rows_selected" />
          </th>
          <th class="table__item" v-for="item in selected_items.cols" :key="item.name">{{item.text}}</th>
          <th class="table__item"></th>
        </tr>
      </thead>
      <tbody class="table__body">
        <row v-for="item in current_data" :item="item" :key="item.id" :headers="headers" />
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import row from "./Row";
import selectButton from "@/components/Select";
import appCheckbox from "@/components/Checkbox";
import appRemove from "@/components/Remove";
import appPagination from "@/components/Pagination";
import sortButton from "./Sort_item";
export default {
  components: {
    row,
    selectButton,
    appRemove,
    appCheckbox,
    appPagination,
    sortButton
  },
  data() {
    return {
      headers: [
        {
          text: "Product (100g serving)",
          name: "product"
        },
        {
          text: "Calories",
          name: "calories"
        },
        {
          text: "Fat (g)",
          name: "fat"
        },
        {
          text: "Carbs (g)",
          name: "carbs"
        },
        {
          text: "Protein (g)",
          name: "protein"
        },
        {
          text: "Iron (%)",
          name: "iron"
        }
      ],
      dialog: false
    };
  },
  computed: {
    ...mapGetters([
      "table_data",
      "selected_items",
      "rows_per_page",
      "pagination",
      "sort_item"
    ]),
    current_data() {
      let start = this.rows_per_page * this.pagination;
      let end = this.rows_per_page * (this.pagination + 1);
      return this.table_data.slice(start, end).sort((a, b) => {
        let sort = this.sort_item.item.name;
        let type = this.sort_item.type;
        switch (type) {
          case 0:
            return a.id - b.id;
          case 1:
            return a[sort] > b[sort] ? 1 : -1;
          case 2:
            return a[sort] > b[sort] ? -1 : 1;
          default:
            return this.table_data;
        }
      });
    },
    all_rows_selected() {
      let count = 0;
      this.current_data.forEach(item => {
        this.selected_items.rows.includes(item) ? (count += 1) : (count -= 1);
      });
      return count === this.rows_per_page;
    }
  },
  methods: {
    ...mapActions(["select_item"]),
    select_all() {
      if (this.all_rows_selected) {
        //all select
        this.current_data.forEach(el => this.select_item({ rows: Array(el) }));
      } else {
        // all selected reset!
        this.select_item({ rows: this.current_data });
      }
    }
  },
  mounted() {
    this.select_item({ cols: this.headers });
  }
};
</script>

<style lang="scss">
</style>