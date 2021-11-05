<template>
  <div class="modal">
    <div class="modal__container">
      <div class="modal__content">
        <div class="modal__content__item">
          <p class="modal__content__item__title">
            {{ $t("message.ModalText.Title") }}:
          </p>
          <span class="modal__content__item__input">
            <BasicInput
              :value="task.title"
              :disabled="task.status"
              @changeInput="(value) => changeText({ value })"
            />
          </span>
        </div>
        <div class="modal__content__item">
          <p class="modal__content__item__title">
            {{ $t("message.ModalText.Desc") }}:
          </p>
          <span class="modal__content__item__input">
            <BasicInput
              :value="task.description"
              :disabled="task.status"
              @changeInput="
                (value) => changeText({ value, type: 'description' })
              "
            />
          </span>
        </div>
        <div class="modal__content__item">
          <p class="modal__content__item__title">
            {{ $t("message.ModalText.Tag") }}:
          </p>
          <span class="modal__content__item__input">
            <CustomColorSelect
              :options="getTags"
              :currentValue="tagTask"
              @setColor="setColor"
            />
          </span>
        </div>
        <div class="modal__content__item">
          <p class="modal__content__item__title"></p>
          <span class="modal__content__item__input">
            <ColorInput
              :value="currentTagText"
              :color="tagTask.value"
              @changeInput="(text) => handleColorInput({ text })"
            />
          </span>
        </div>

        <div class="modal__content__item">
          <p class="modal__content__item__title">
            {{ $t("message.ModalText.Status") }}:
          </p>
          <span class="modal__content__item__input"
            ><v-select
              :value="taskStatus"
              :options="statusOptions"
              :clearable="false"
              :searchable="false"
              @input="setSelected"
            ></v-select
          ></span>
        </div>
      </div>
      <button
        type="button"
        class="modal__close-btn"
        @click="closeModal"
      ></button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import store from "@/store";
import BasicInput from "@/components/Inputs/BasicInput.vue";
import CustomColorSelect from "@/components/Inputs/CustomColorSelect.vue";
import ColorInput from "@/components/Inputs/ColorInput.vue";

export default {
  name: "TaskModal",
  props: {
    id: { type: String, default: "" },
  },
  components: {
    BasicInput,
    CustomColorSelect,
    ColorInput,
  },
  data() {
    return {
      task: {},
      taskStatus: { label: "Not performed", value: false },
      tagTask: {},
      currentTagText: "",
      statusOptions: [
        { label: "Done", value: true },
        { label: "Not performed", value: false },
      ],
    };
  },
  mounted() {
    this.task = store.getters.getCurrentTask(this.id);
    if (this.task.status) {
      this.taskStatus = { label: "Done", value: true };
    } else {
      this.taskStatus = { label: "Not performed", value: false };
    }
    this.tagTask = this.task.tag;
    this.currentTagText = this.getCurrentTagByValue(this.tagTask.value).text;
  },
  watch: {
    taskStatus() {
      this.changeTaskStatus(this.taskStatus);
    },
  },
  computed: {
    ...mapGetters(["getTags", "getCurrentTagByValue"]),
    itemStatus() {
      return this.task.status ? "Done" : "Not performed";
    },
  },

  methods: {
    ...mapActions([
      "deleteTask",
      "toggleStatus",
      "changeTaskText",
      "changeStatus",
      "changeTag",
      "changeTagText",
    ]),
    setColor(color) {
      // we needed get text for choosen tag, getCurrentTagByValue return needed tag by getting value from select
      this.tagTask = {
        ...color,
        text: this.getCurrentTagByValue(color.value).text,
      };
      this.changeTag({ id: this.id, tagValue: this.tagTask.value });
      this.currentTagText = this.tagTask.text;
    },
    setSelected(status) {
      this.taskStatus = status;
    },
    changeText({ value, type = "title" }) {
      if (!this.task.status) {
        this.changeTaskText({ id: this.id, text: value, type });
      }
    },
    changeTaskStatus() {
      this.changeStatus({ id: this.id, status: this.taskStatus.value });
    },
    handleColorInput({ text }) {
      console.log("handleColorInput: ", this.tagTask.value);
      this.changeTagText({ value: this.tagTask.value, text });
    },
    closeModal() {
      this.$vfm.hideAll();
    },
  },
};
</script>

<style lang="scss" scoped>
.modal {
  &__container {
    position: relative;
    width: 100%;
    min-width: 300px;
    max-width: 550px;
    height: 100%;
    padding: 32px 12px;
    background-color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    @media (min-width: 420px) {
      width: 40%;
      height: 40%;
      padding: 64px 32px;
      border-radius: 25px;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .modal__content__item + .modal__content__item {
      margin-top: 12px;
    }

    .modal__content__item {
      display: flex;
      align-items: center;
      width: 250px;

      &__title {
        margin-right: 16px;
        text-align: left;
        white-space: nowrap;
      }

      &__input {
        width: 100%;

        input {
          width: 100%;
        }
      }
    }
  }

  &__close-btn {
    width: 24px;
    height: 24px;
    position: absolute;
    top: 16px;
    right: 16px;
    background-image: url(../../assets/toggle-icon-2.svg);
    border: none;
    background-color: unset;
  }
}
</style>
