<template>
  <div class="options">
    <button
      v-for="(item, i) in items"
      :key="i"
      class="btn"
      @click="change_count(item)"
    >{{`${item} per page`}}</button>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    items: {
      type: Array,
      default: () => [10, 15, 20]
    }
  },
  methods: {
    ...mapActions(["set_rows_show"]),
    change_count(item) {
      this.set_rows_show(item).then(() => {
        this.$emit("close_menu");
      });
    }
  },
  mounted() {
    document.addEventListener(
      "click",
      e => !e.target.closest(".option") && this.$emit("close_menu")
    );
  }
};
</script>

<style lang="scss">
.options {
  position: absolute;
  background: white;
  z-index: 10;
  top: 40px;
  min-width: 100%;
  border-radius: 4px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.16);
  .btn {
    border: none;
    transition: 0.4s;
  }
  .btn:hover {
    background: #cecece;
  }
}
</style>