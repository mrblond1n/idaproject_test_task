<template>
  <table>
    <thead>
      <tr></tr>
    </thead>
    <tbody>
      <row v-for="item in 10" :key="item" />
    </tbody>
  </table>
</template>

<script>
import row from "./Row";
export default {
  components: {
    row
  }
};
</script>

<style lang="scss" scoped>
</style>