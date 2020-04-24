<template>
  <div class="options">
    <button class="btn" @click="select_all">
      <app-checkbox :is_checked="all_cols_selected" />Select all
    </button>
    <template v-for="(item, i) in headers">
      <button class="btn" :key="i" @click="select_item({cols: Array(item)})">
        <app-checkbox :is_checked="selected_items.cols.includes(item)" />
        {{item.text}}
      </button>
    </template>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import appCheckbox from "@/components/Checkbox";
export default {
  components: {
    appCheckbox
  },
  data() {
    return {
      check: false
    };
  },
  props: {
    headers: {
      type: Array,
      default: () => {}
    }
  },
  computed: {
    ...mapGetters(["selected_items"]),
    all_cols_selected() {
      return this.headers.length === this.selected_items.cols.length;
    }
  },
  methods: {
    ...mapActions(["select_item"]),
    select_all() {
      if (this.all_cols_selected) {
        return this.headers.forEach(l => this.select_item({ cols: Array(l) }));
      }
      this.select_item({ cols: this.headers });
    }
  },
  mounted() {
    document.addEventListener("click", e => {
      !e.target.closest(".options") && this.$emit("close_menu");
    });
  }
};
</script>