<template>
  <div class="card" ref="dialog" @click.stop="() => {}">
    <div class="card__text">
      Are you sure you want to
      <span>{{msg}}</span>
    </div>
    <div class="card__action">
      <button class="btn" @click.stop="close">Cancel</button>
      <button class="btn" @click.stop="remove">Confirm</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    msg: {
      type: String,
      default: "delete item?"
    }
  },
  methods: {
    close() {
      this.$emit("close_dialog");
    },
    remove() {
      this.$emit("remove_item");
    }
  },
  mounted() {
    document.addEventListener(
      "click",
      e => !e.target.closest(".card") && this.$emit("close_dialog")
    );
  }
};
</script>

<style lang="scss" scoped>
</style>