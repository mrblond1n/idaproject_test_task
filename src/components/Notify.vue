<template>
  <div class="notify" :style="theme">
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
  },
  mounted() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.$emit("close_notify");
      this.timeout = null;
    }, 3000);
  }
};
</script>

<style lang="scss">
.notify {
  z-index: 9999;
  position: fixed;
  bottom: 70px;
  margin: 0 auto;
  left: 0;
  right: 0;
  max-width: 250px;
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

.slide-enter-active,
.slide-leave-active {
  transform: translateY(0px);
}

.slide-enter,
.slide-leave-to {
  transform: translateY(150px);
}
</style>