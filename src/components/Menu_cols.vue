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
  }
};
</script>

<style lang="scss" scoped>
.options {
  position: absolute;
  background: white;
  max-height: 240px;
  z-index: 10;
  top: 40px;
  min-width: 100%;
  border-radius: 4px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.16);
  .btn {
    margin: 0;
    display: flex;
    align-items: center;
    width: 100%;
    border: none;
    transition: 0.4s;
  }
  .btn:hover {
    background: #cecece;
  }
}
</style>