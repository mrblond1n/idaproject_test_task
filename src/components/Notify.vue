<template>
  <transition name="slide">
    <div v-if="notify" class="notify" :style="theme">
      <div class="notify__text">{{notify.text}}</div>
      <div class="button" @click="close">
        <svg viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M20 6.91L17.09 4L12 9.09L6.91 4L4 6.91L9.09 12L4 17.09L6.91 20L12 14.91L17.09 20L20 17.09L14.91 12L20 6.91Z"
          />
        </svg>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      timeout: null
    };
  },
  props: {
    notify: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    theme() {
      switch (this.notify.color) {
        case "error":
          return { background: "#FF5252", color: "white" };
        case "success":
          return { background: "#4CAF50", color: "white" };
        default:
          return { opacity: 0 };
      }
    }
  },
  methods: {
    close() {
      this.$emit("close_notify");
    }
  }
};
</script>

<style lang="scss" scoped>
.notify {
  position: fixed;
  bottom: 50px;
  transition: 0.4s;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 15px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
  font-weight: bold;
  &__text {
    margin-right: 20px;
  }
  .button {
    display: flex;
    cursor: pointer;
  }
}
svg {
  width: 20px;
  height: 20px;
}
</style>