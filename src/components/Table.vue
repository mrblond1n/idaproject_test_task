<template>
  <div v-if="table_data.length" class="container">
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
          <sort-item v-if="sort_item.item" :sort_item="sort_item" />
          <template v-for="item in selected_items.cols">
            <th
              class="table__item"
              v-if="sort_item.item.name != item.name"
              :key="item.name"
            >{{item.text}}</th>
          </template>
          <th class="table__item"></th>
        </tr>
      </thead>
      <tbody class="table__body">
        <row
          v-for="item in current_data"
          :item="item"
          :key="item.id"
          :headers="headers"
          :sort_item="sort_item"
        />
      </tbody>
    </table>
  </div>
  <div v-else class="container" style="height: 80vh">
    <button class="btn btn--active" @click="get_data" :disabled="loading">Loading table data</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import row from "./Row";
import selectButton from "@/components/Select";
import appCheckbox from "@/components/Checkbox";
import appRemove from "@/components/Remove";
import appPagination from "@/components/Pagination";
import sortButton from "./Sort_button";
import sortItem from "./Sort_item";
export default {
  components: {
    row,
    selectButton,
    appRemove,
    appCheckbox,
    appPagination,
    sortButton,
    sortItem
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
      dialog: false,
      sort_type: 0,
      loading: false
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
    ...mapActions(["select_item", "set_sort_item", "loading_data"]),
    select_all() {
      if (this.all_rows_selected) {
        //all select
        this.current_data.forEach(el => this.select_item({ rows: Array(el) }));
      } else {
        // all selected reset!
        this.select_item({ rows: this.current_data });
      }
    },
    get_data() {
      this.loading = true;
      this.loading_data().then(() => {
        this.loading = false;
      });
    }
  },
  mounted() {
    this.select_item({ cols: this.headers });
  }
};
</script>

<style lang="scss">
.table {
  border-collapse: collapse;
  position: relative;
  width: 100%;
}

.table__row {
  position: relative;
  &:nth-child(odd) {
    background: $odd-row-color;
  }
  &:nth-child(even) {
    background: $even-row-color;
  }
}

.table__item {
  padding: 1rem;
  max-width: 10rem;
}

.table__item {
  text-align: left;
}
.table__item.sort {
  cursor: pointer;
}

.table__item:first-child,
.table__item:last-child {
  width: 1%;
}
.table__item:last-child {
  text-align: right;
}

.table__body .table__row:hover {
  cursor: pointer;
  transition: 0.2s;
  background: $select-row-color;
  .table__item:nth-child(2) {
    font-weight: bold;
  }
}

.table__row.selected .table__item:nth-child(2) {
  font-weight: bold;
  opacity: 0.8;
}

.panel {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px 0;
}

.panel__item {
  display: flex;
  align-items: center;
  &:first-child .btn {
    border-color: transparent;
  }
  & > div {
    position: relative;
  }
  p {
    font-weight: bold;
    color: #3d374a;
  }
  &:last-child p {
    margin: 0 5px;
  }
}

.panel {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  padding: 20px 0;
}

.btn {
  padding: 5px 10px;
  transition: 0.4s;
  border: 1px solid $border-active;
  color: $active-color;
  border-radius: 2px;
  height: 32px;
  margin: 0 10px;
  cursor: pointer;
  span {
    color: $active-color;
  }
}

.btn:disabled,
.btn--active:disabled {
  background: transparent;
  cursor: default;
  border-color: $disable-color;
  color: $disable-color;
  span {
    color: $disable-color;
  }
}

.btn--active {
  background: $active;
  color: #fff;
  span {
    color: #fff;
  }
}

.select {
  .btn {
    margin: 0;
    width: 100%;
    display: flex;
    align-items: center;
    white-space: nowrap;
  }
}
</style>