<template>
  <button class="btn" :class="{'btn--active': is_active}" @click="select(item)">{{item.text}}</button>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    ...mapGetters(["headers", "sort_item"]),
    is_active() {
      return this.sort_item.item === this.item;
    }
  },
  methods: {
    ...mapActions(["set_sort_item"]),
    select(item) {
      this.set_sort_item({ item, type: 0 });
    }
  }
};
</script>

<style lang="scss" scoped>
.btn {
  color: $sort-color;
  &--active {
    background: $active;
    color: #fff;
  }
}
</style>