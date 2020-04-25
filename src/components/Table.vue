<template>
  <div v-if="table_data.length" class="container">
    <app-row-panel :headers="headers" />
    <table class="table">
      <thead class="table__head">
        <app-row-header
          :sort_item="sort_item"
          :selected_items="selected_items"
          :rows_per_page="rows_per_page"
          :current_data="current_data"
          :select_item="select_item"
        />
      </thead>
      <tbody class="table__body">
        <app-row-body
          v-for="item in current_data"
          :item="item"
          :key="item.id"
          :headers="headers"
          :sort_item="sort_item"
          :current_data="table_data"
          @remove_item="remove"
        />
      </tbody>
    </table>
    <transition name="slide">
      <app-notify v-if="notify" :notify="notify" @close_notify="notify = null" />
    </transition>
  </div>
  <div v-else class="container" style="height: 80vh">
    <button class="btn btn--active" @click="get_data" :disabled="loading">Loading table data</button>
    <transition name="slide">
      <app-notify v-if="notify" :notify="notify" @close_notify="notify = null" />
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import appRowPanel from "./Row_panel";
import appRowHeader from "./Row_header";
import appRowBody from "./Row_body";
import appNotify from "./Notify";
export default {
  components: {
    appRowPanel,
    appRowBody,
    appRowHeader,
    appNotify
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
      loading: false,
      notify: null
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
    }
  },
  methods: {
    ...mapActions(["select_item", "loading_data", "remove_item"]),
    get_data() {
      this.notify = null;
      this.loading = true;
      this.loading_data().then(() => {
        if (!this.table_data.length)
          this.notify = {
            color: "error",
            text: "Oops, server error. Try again later!"
          };
        this.loading = false;
      });
    },
    remove(item) {
      this.notify = null;
      this.remove_item(item).then(() => {
        if (this.table_data.includes(item)) {
          this.notify = {
            text: "An error occurred while deleting the item",
            color: "error"
          };
        } else {
          this.notify = {
            text: "Item successfully deleted",
            color: "success"
          };
        }
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
  margin-bottom: 50px;
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