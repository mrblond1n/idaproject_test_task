<template>
  <div class="card">
    <div class="card__text">
      Are you sure you want to
      <span>{{msg}}</span>
    </div>
    <div class="card__action">
      <button class="btn" @click="close">Cancel</button>
      <button class="btn" @click="close">Confirm</button>
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
    }
  }
};
</script>

<style lang="scss" scoped>
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.card__action {
  display: flex;
}
</style>