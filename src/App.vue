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
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
}
</style>
