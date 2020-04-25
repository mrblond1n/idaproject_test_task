<template>
  <div class="card" ref="dialog" @click.stop="() => {}">
    <div class="card__text">
      Are you sure you want to
      <b>{{msg}}</b>
    </div>
    <div class="card__action">
      <button class="btn" @click.stop="close">Cancel</button>
      <button class="btn btn--active" @click.stop="remove">Confirm</button>
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
    },
    listener(e) {
      !e.target.closest(".card") && this.$emit("close_dialog");
    }
  },
  mounted() {
    document.addEventListener("click", this.listener);
  },
  destroyed() {
    document.removeEventListener("click", this.listener);
  }
};
</script>

<style lang="scss">
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
  cursor: default;
}
.card__action {
  margin-top: 0.5rem;
  display: flex;
  justify-content: space-around;
  width: 100%;
  .btn {
    border-radius: 0.3rem;
  }
}
</style>