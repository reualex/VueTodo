<template>
  <div>
    <slot></slot>

    <div class="items">
      <FilterByTag
        class="items__filter"
        :allItems="allItems"
        :disabled="!items.length"
        @handleFilter="filteringTags"
      />
      <ul v-if="filteringItems.length" class="items__list">
        <li v-for="item in filteringItems" :key="item.id">
          <TodoItem :task="item" />
        </li>
      </ul>
      <div v-else class="items__list">{{ noTaskText }}</div>
    </div>
  </div>
</template>

<script>
import TodoItem from "@/components/TodoItem";
import FilterByTag from "@/components/FilterByTag";
export default {
  name: "TodoListItems",
  components: {
    TodoItem,
    FilterByTag,
  },
  props: {
    items: { type: Array, default: () => [] },
    type: { type: String, default: "todo" },
  },
  data() {
    return {
      allItems: this.items,
      filteringItems: this.items,
    };
  },
  watch: {
    items() {
      this.allItems = this.items;
    },
  },
  computed: {
    noTaskText() {
      if (!this.items.length) {
        return this.type === "todo"
          ? this.$t("message.TodosText.NoTodoTasks")
          : this.$t("message.TodosText.NoDoneTasks");
      } else {
        return this.$t("message.TodosText.NoFilteringTask");
      }
    },
  },

  methods: {
    filteringTags(items) {
      this.filteringItems = items;
    },
  },
};
</script>

<style lang="scss" scoped>
.items {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 12px;

  &__list {
    display: flex;
    flex-direction: column;
    align-items: center;

    li + li {
      margin-top: 12px;
    }
  }

  &__filter {
    margin-bottom: 24px;
  }

  @media (min-width: 1024px) {
    padding: 24px 12px;
  }
}
</style>
