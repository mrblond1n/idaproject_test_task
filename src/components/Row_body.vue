<template>
  <tr
    class="table__row"
    @click="select_row"
    :class="(selected_items.rows.includes(item) && 'selected')"
  >
    <td class="table__item">
      <checkbox :is_checked="selected_items.rows.includes(item)" />
    </td>
    <td class="table__item" v-if="sort_item.item">{{item[sort_item.item.name]}}</td>
    <template v-for="(header, i) in selected_items.cols">
      <td
        class="table__item"
        :key="`${item.id}_${i}`"
        v-if="header.name != sort_item.item.name"
      >{{item[header.name]}}</td>
    </template>
    <td class="table__item">
      <button class="btn" @click.stop="dialog = !dialog">
        <svg width="14" height="16" viewBox="0 0 14 16">
          <path
            d="M12.2326 1.88398H10.0963V0.495768C10.0963 0.216339 9.8709 0 9.59149 0C9.56438 0 9.54629 0.00905115 9.53747 0.0180816C9.52842 0.00905115 9.51034 0 9.50131 0H4.48046H4.4445H4.40834C4.12893 0 3.91259 0.216339 3.91259 0.495768V1.884H1.76726C1.1542 1.884 0.676514 2.36169 0.676514 2.97475V3.76801V4.75952H1.62302V14.9183C1.62302 15.5314 2.09168 16 2.70474 16H11.2951C11.9082 16 12.3859 15.5314 12.3859 14.9183V4.75952H13.3233V3.76801V2.97475C13.3233 2.36169 12.8455 1.88398 12.2326 1.88398ZM4.90411 0.991515H9.09574V1.88398H4.90411V0.991515ZM11.3853 14.9183C11.3853 14.9816 11.3582 15.0085 11.2951 15.0085H2.70474C2.64167 15.0085 2.61456 14.9816 2.61456 14.9183V4.7595H11.3853V14.9183ZM12.3228 3.76799H1.67706V2.97473C1.67706 2.91164 1.70417 2.8755 1.76724 2.8755H12.2326C12.2957 2.8755 12.3228 2.91164 12.3228 2.97473V3.76799Z"
            fill="#5B5E77"
          />
          <path d="M9.81689 5.92236H8.81635V14.1251H9.81689V5.92236Z" fill="#5B5E77" />
          <path d="M7.50915 5.92236H6.50861V14.1251H7.50915V5.92236Z" fill="#5B5E77" />
          <path d="M5.20153 5.92236H4.20099V14.1251H5.20153V5.92236Z" fill="#5B5E77" />
        </svg>
        delete
      </button>
      <template v-if="dialog">
        <app-dialog
          :loading="loading"
          @close_dialog="() => {dialog = false}"
          @remove_item="remove(item)"
        />
      </template>
    </td>
  </tr>
</template>

<script>
import checkbox from "./Checkbox";
import appDialog from "./Dialog";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    checkbox,
    appDialog
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    headers: {
      type: Array,
      default: () => {}
    },
    sort_item: {
      type: Object,
      default: () => {}
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialog: false,
      notify: null
    };
  },
  computed: {
    ...mapGetters(["selected_items"])
  },
  methods: {
    ...mapActions(["select_item"]),
    select_row() {
      this.select_item({ rows: Array(this.item) });
    },
    remove(item) {
      this.$emit("remove_item", item);
    }
  }
};
</script>

<style lang="scss" scoped>
.btn {
  border-color: transparent;
  display: flex;
  align-items: center;
  opacity: 0;
  svg {
    margin-right: 5px;
  }
}
.table__row:hover {
  .btn {
    opacity: 1;
  }
}
</style>