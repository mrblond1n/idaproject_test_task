<template>
  <th :class="class_name.item" @click="to_sort">
    {{sort_item.item.text}}
    <span :class="class_name.icon"></span>
  </th>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      sort_type: 0
    };
  },
  props: {
    sort_item: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    class_name() {
      return {
        item: `table__item sort_${this.sort_item.type}`,
        icon: `mdi mdi-16px mdi-arrow-${
          this.sort_item.type == 1 ? "up" : "down"
        }`
      };
    }
  },
  methods: {
    ...mapActions(["set_sort_item"]),
    to_sort() {
      this.sort_type = this.sort_item.type;
      this.sort_type !== 2 ? this.sort_type++ : (this.sort_type = 0);
      this.set_sort_item({ item: this.sort_item.item, type: this.sort_type });
    }
  }
};
</script>

<style lang="scss" scoped>
.table__item {
  cursor: pointer;
}
.sort_0 span {
  display: none;
}
.sort_1,
.sort_2 {
  color: $active;
  span {
    color: $sort-color;
  }
}
</style>