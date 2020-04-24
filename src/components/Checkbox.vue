<template>
  <div class="checkbox" :class="{'checked': is_checked}" @click="select">
    <svg viewBox="0 0 24 24">
      <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    is_checked: {
      type: Boolean,
      default: false
    },
    select: {
      type: Function,
      default: () => {}
    }
  }
};
</script>

<style lang="scss" scoped>
.checkbox {
  border: 1px solid $disable-color;
  height: 14px;
  width: 14px;
  margin: 0 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  cursor: pointer;
  svg {
    width: 10px;
    height: 10px;
    fill: transparent;
  }
}
.checkbox.checked {
  background: $active;
  border-color: $active;
  svg {
    fill: white;
  }
}
</style>