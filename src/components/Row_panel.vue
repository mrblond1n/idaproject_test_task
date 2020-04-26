<template>
  <div class="panel">
    <div class="panel__item">
      <p>Sorting by:</p>
      <template v-for="item in headers">
        <sort-button :key="`sort_${item.name}`" :item="item" @select="select" />
      </template>
    </div>
    <div class="panel__item">
      <app-remove />
      <select-button method="rows" />
      <app-pagination />
      <select-button method="cols" :headers="headers" />
    </div>
  </div>
</template>

<script>
import selectButton from "@/components/Select";
import appRemove from "@/components/Remove";
import appPagination from "@/components/Pagination";
import sortButton from "./Sort_button";

import { mapActions } from "vuex";
export default {
  components: {
    selectButton,
    appRemove,
    appPagination,
    sortButton
  },
  props: {
    headers: {
      type: Array,
      default: () => {}
    }
  },
  methods: {
    ...mapActions(["set_sort_item"]),
    select(item) {
      this.set_sort_item({ item, type: 0 });
    }
  },
  mounted() {
    this.select({ name: "product", text: "Product (100g serving)" });
  }
};
</script>

<style lang="scss">
.panel {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px 0;
}

.panel__item {
  display: flex;
  align-items: center;
  white-space: nowrap;
  &:first-child .btn {
    border-color: transparent;
    margin: 0;
    margin-left: 1rem;
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
  @media screen and (max-width: 1000px) {
    justify-content: center;
    .panel__item {
      margin: 10px 0;
    }
  }
}
</style>