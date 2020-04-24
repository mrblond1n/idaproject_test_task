<template>
  <div>
    <table>
      <thead>
        <tr></tr>
      </thead>
      <tbody>
        <row
          v-for="item in table_data"
          :item="item"
          :key="item.id"
          :headers="headers"
          @add_select_row="add_select_row"
        />
      </tbody>
    </table>selected items
    <div
      v-for="item in selected_items"
      :key="item.id"
      style="margin-top: 20px"
    >------- {{item.product}}</div>
    <div>
      <button @click="remove">remove all</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import row from "./Row";
export default {
  components: {
    row
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
      ]
    };
  },
  computed: {
    ...mapGetters(["table_data", "selected_items"])
  },
  methods: {
    ...mapActions(["remove_item"]),
    add_select_row(item) {
      let items = this.selected_items;
      let index = items.indexOf(item);
      items.includes(item) ? items.splice(index, 1) : items.push(item);
    },
    remove() {
      this.selected_items.forEach(item => {
        this.remove_item(item);
      });

      // this.remove_items(this.selected_items);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>