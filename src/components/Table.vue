<template>
  <div>
    <div class="table__control">
      <div class="table__control-item">
        <p>Sorting by:</p>
        <template v-for="item in headers">
          <button class="table__sort-item" :key="item.name">{{item.text}}</button>
        </template>
      </div>
      <div class="table__control-item">
        <app-remove />
        <select-button />pagination
        <select-button />
      </div>
    </div>
    <table>
      <thead>
        <tr>
          <th>
            <app-checkbox :select="select_all" :is_checked="all_rows_selected" />
          </th>
          <th v-for="item in headers" :key="item.name">{{item.text}}</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <row v-for="item in current_data" :item="item" :key="item.id" :headers="headers" />
      </tbody>
    </table>
    <!-- НА УДАЛЕНИЕ  -->
    <!-- selected items
    <div
      v-for="item in selected_items.rows"
      :key="item.id"
      style="margin-top: 20px"
    >------- {{item.product}}</div>
    <div style="position: relative">
      {{dialog}}
      <button
        class="btn"
        :disabled="!selected_items.rows.length"
        @click.stop="dialog = !dialog"
      >remove all</button>
      <template v-if="dialog">
        <app-dialog
          msg="delete items"
          @close_dialog="() => {dialog = false}"
          @remove_item="remove"
        />
      </template>
    </div>-->
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import row from "./Row";
// import appDialog from "./Dialog";
import selectButton from "./Select";
import appCheckbox from "./Checkbox";
import appRemove from "./Remove";
export default {
  components: {
    row,
    // appDialog,
    selectButton,
    appRemove,
    appCheckbox
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
    ...mapActions(["remove_item", "select_item"]),
    remove() {
      this.selected_items.rows.forEach(item => {
        this.remove_item(item);
      });
      this.dialog = false;
    },
    show_dialog() {
      this.dialog = true;
    },
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

<style lang="scss">
table {
  border-collapse: collapse;
}
thead th {
  padding: 1rem;
}

.card {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 10px 0 grey;
  border-radius: 4px;
  padding: 1rem;
  right: 50px;
  white-space: nowrap;
  font-size: 14px;
  background: #fff;
  z-index: 1;
}
.card__action {
  display: flex;
  justify-content: space-around;
  width: 100%;
}

.table__control {
  display: flex;
  justify-content: space-between;
}

.table__control-item {
  display: flex;
}
</style>