<template>
  <div class="task" :class="{ task__done: task.status }">
    <button
      @click="changeStatus"
      class="task__icon task__icon__toggle"
    ></button>
    <BasicInput
      :value="task.title"
      :disabled="task.status"
      @changeInput="changeText"
    />
    <div class="task__tag" :style="{ background: task.tag.value }"></div>
    <button
      type="button"
      class="task__icon task__icon__eye"
      @click="showModal"
    ></button>
    <button
      type="click"
      class="task__icon task__icon__delete"
      @click="deleteItem"
    ></button>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import BasicInput from "@/components/Inputs/BasicInput.vue";

export default {
  name: "TodoItem",
  props: {
    task: { type: Object, default: () => {} },
  },
  components: {
    BasicInput,
  },
  data() {
    return {
      text: this.task.title,
    };
  },
  methods: {
    ...mapActions(["deleteTask", "toggleStatus", "changeTaskText"]),
    showModal() {
      this.$vfm.show("taskModal", { id: this.task.id });
    },
    deleteItem() {
      this.deleteTask(this.task.id);
    },
    changeStatus() {
      this.toggleStatus(this.task.id);
    },
    changeText(value) {
      if (!this.task.status) {
        this.changeTaskText({ id: this.task.id, text: value });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.task {
  display: flex;
  align-items: center;

  &__title {
    margin: 0 12px;
    padding-bottom: 4px;
    border: none;
    border-bottom: 1px gray solid;
  }

  &__icon {
    margin: 0 4px;
    border: none;
    width: 24px;
    height: 24px;
    background-color: unset;
    cursor: pointer;

    &__delete {
      background-image: url(../../assets/delete-icon.svg);
    }

    &__toggle {
      background-image: url(../../assets/toggle-icon.svg);
    }

    &__eye {
      background-image: url(../../assets/eye-icon.svg);
    }
  }

  &__tag {
    margin: 0 4px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    border: 1px solid rgba(60, 60, 60, 0.26);
  }

  &__done {
    .task__icon__toggle {
      background-image: url(../../assets/toggle-icon-2.svg);
    }
  }
}
</style>
