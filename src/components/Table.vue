<template>
  <div>
    <table>
      <thead>
        <tr>
          <th></th>
          <th v-for="item in headers" :key="item">{{item.text}}</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <row v-for="item in table_data" :item="item" :key="item.id" :headers="headers" />
      </tbody>
    </table>selected items
    <!-- НА УДАЛЕНИЕ  -->
    <div
      v-for="item in selected_items"
      :key="item.id"
      style="margin-top: 20px"
    >------- {{item.product}}</div>
    <div style="position: relative">
      <button
        class="btn"
        :disabled="!selected_items.length"
        @click.stop="dialog = !dialog"
      >remove all</button>
      <template v-if="dialog">
        <app-dialog
          msg="delete items"
          @close_dialog="() => {dialog = false}"
          @remove_item="remove"
        />
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import row from "./Row";
import appDialog from "./Dialog";
export default {
  components: {
    row,
    appDialog
  },
  data() {
    return {
      headers: [
        {
          text: "Product (100g serving)",
          name: "product"
        },
        {
          text: "Calories",
          name: "calories"
        },
        {
          text: "Fat (g)",
          name: "fat"
        },
        {
          text: "Carbs (g)",
          name: "carbs"
        },
        {
          text: "Protein (g)",
          name: "protein"
        },
        {
          text: "Iron (%)",
          name: "iron"
        }
      ],
      dialog: false
    };
  },
  computed: {
    ...mapGetters(["table_data", "selected_items"])
  },
  methods: {
    ...mapActions(["remove_item"]),
    remove() {
      this.selected_items.forEach(item => {
        this.remove_item(item);
      });
      this.dialog = false;
    },
    show_dialog() {
      this.dialog = true;
    }
  }
};
</script>

<style lang="scss" scoped>
table {
  border-collapse: collapse;
}
</style>