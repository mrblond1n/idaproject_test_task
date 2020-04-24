<template>
  <tr @click="select_row">
    <checkbox />
    <td>test</td>
    <td>test</td>
    <td>test</td>
    <td>test</td>
    <td>test</td>
    <td>
      <button class="btn" v-if="!dialog" @click="dialog = !dialog">delete</button>
      <div v-else>
        <app-dialog @close_dialog="() => {dialog = false}" />
      </div>
    </td>
  </tr>
</template>

<script>
import checkbox from "./Checkbox";
import appDialog from "./Dialog";
export default {
  components: {
    checkbox,
    appDialog
  },
  data() {
    return {
      dialog: false,
      row_is_select: false
    };
  },
  methods: {
    select_row() {
      console.log("select_row!");
    }
  }
};
</script>

<style lang="scss" scoped>
</style>