<template>
  <div class="panel">
    <div class="panel__item">
      <p>Sorting by:</p>
      <template v-for="item in headers">
        <sort-button :key="`sort_${item.name}`" :item="item" />
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
</style>