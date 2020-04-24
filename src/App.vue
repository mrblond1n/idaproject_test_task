<template>
  <div id="app">
    <app-table></app-table>
  </div>
</template>

<script>
import appTable from "@/components/Table";
export default {
  components: {
    appTable
  }
};
</script>

<style>
#app {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
}
</style>
