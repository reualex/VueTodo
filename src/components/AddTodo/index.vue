<template>
  <div class="add-todo">
    <BasicInput
      :value="taskTitle"
      :placeholder="$t('message.TodosText.AddBtnPlaceholder')"
      @changeInput="handleInput"
    />
    <button type="button" class="add-todo__btn" @click="addNewTask">
      {{ $t("message.TodosText.AddBtntext") }}
    </button>
    <div v-if="error" class="error">
      {{ error }}
    </div>
  </div>
</template>

<script>
import BasicInput from "@/components/Inputs/BasicInput.vue";

export default {
  name: "AddTodo",
  props: {
    addTask: { type: Function, default: () => {} },
  },
  components: {
    BasicInput,
  },
  data() {
    return {
      taskTitle: "",
      error: "",
    };
  },
  methods: {
    handleInput(value) {
      this.taskTitle = value;
    },
    addNewTask() {
      if (this.taskTitle.length > 3) {
        this.addTask({
          id: this.$uuid.v4(),
          title: this.taskTitle.trim(),
          description: "",
          tag: { label: "white", value: "white", text: "" },
          status: false,
        });
        this.taskTitle = "";
        this.error = "";
      } else {
        this.error = "title must be more than 3 characters";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.add-todo {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 250px;

  .error {
    margin-top: 8px;
    font-size: 12px;
    color: red;
  }

  &__btn {
    padding: 8px;
    border: 1px solid #66ff00;
    border-radius: 4px;
    background-color: #f0fff1;
    cursor: pointer;

    &:hover {
      background-color: darken(#f0fff1, 10%);
      border-color: lighten(#66ff00, 10%);
    }

    &:active {
      opacity: 0.5;
      background: linear-gradient(#f0fff1, #66ff00);
      box-shadow: 2px 4px 8px 0px rgba(2, 250, 229, 0.384);
      transition: opacity 500ms linear;
    }
  }

  input {
    margin-bottom: 16px;
  }
}
</style>
