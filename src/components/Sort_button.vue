<template>
  <button class="btn" :class="{'btn--active': is_active}" @click="select(item)">{{item.text}}</button>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    ...mapGetters(["sort_item"]),
    is_active() {
      return this.sort_item.item.name === this.item.name;
    }
  },
  methods: {
    select(item) {
      this.$emit("select", item);
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