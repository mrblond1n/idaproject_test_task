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
      console.log("close??");

      this.$emit("close_dialog");
    },
    remove() {
      console.log("remove ??");
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
</style>