<template>
  <div class="todo">
    <div class="todo__container">
      <h1>{{ $t("message.Title") }}</h1>
      <div class="todo__items">
        <TodoListItems class="todo__items__item" :items="getTodoItems">
          <h2 class="todo__title">
            {{ $t("message.TodosText.TitleTodo") }}
          </h2>
        </TodoListItems>
        <hr />
        <TodoListItems
          class="todo__items__item"
          :items="getDoneItems"
          type="done"
        >
          <h2 class="todo__title">
            {{ $t("message.TodosText.TitleDone") }}
          </h2>
        </TodoListItems>
      </div>

      <div class="todo__add-item">
        <AddTodo :addTask="addTask" />
      </div>
    </div>
    <vue-final-modal v-model="showModal" name="taskModal" :ssr="false">
      <template v-if="showModal" v-slot="{ params }">
        <TaskModal :id="params.id" />
      </template>
    </vue-final-modal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import TodoListItems from "@/components/TodoList/TodoListItems";
import TaskModal from "@/components/TaskModal";
import AddTodo from "@/components/AddTodo";

export default {
  name: "TodoList",
  components: {
    TodoListItems,
    AddTodo,
    TaskModal,
  },
  data() {
    return {
      showModal: false,
    };
  },

  computed: {
    ...mapGetters(["getTodoItems", "getDoneItems"]),
  },
  methods: {
    ...mapActions(["addTask"]),
  },
};
</script>

<style lang="scss">
.todo {
  &__container {
    margin: 0 auto;
    padding: 12px;

    @media (min-width: 1024px) {
      padding: 32px;
      max-width: 1600px;
    }
  }

  &__title {
    padding-bottom: 15px;
    font-weight: 500;
    font-size: 24px;
    border-bottom: 1px rgb(102, 255, 0) solid;
  }

  &__items {
    display: flex;
    flex-direction: column;
    margin: 20px auto;
    min-height: 250px;

    &__item {
      width: 100%;

      &:last-child {
        margin-top: 32px;

        @media (min-width: 1024px) {
          margin-top: 0;
        }
      }
    }

    hr {
      margin: 0;
      border: none;
      width: 1px;
      background-color: rgb(102, 255, 0);
    }

    @media (min-width: 1024px) {
      max-width: 70%;
      flex-direction: row;
      justify-content: space-between;
    }

    @media (min-width: 1440px) {
      max-width: 60%;
    }
  }
}
</style>
