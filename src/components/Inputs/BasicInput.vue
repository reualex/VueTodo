<template>
  <input
    class="basic-input"
    v-debounce:100ms="handleInput"
    :value="value"
    :disabled="disabled"
    :type="type"
  />
</template>

<script>
export default {
  name: "BasicInput",
  props: {
    type: { type: String, default: "text" },
    value: { type: String, default: "" },
    disabled: { type: Boolean, default: false },
  },

  methods: {
    handleInput(value) {
      this.$emit("changeInput", value);
    },
  },
};
</script>

<style lang="scss" scoped>
.basic-input {
  margin: 0 12px;
  padding-bottom: 8px;
  border: none;
  border-bottom: 1px rgb(0, 0, 0) solid;

  &:focus-visible {
    outline: none;
    border-color: rgb(223, 255, 41);
  }

  &:disabled {
    background-color: #f0fff1;
    border-color: rgb(236, 235, 235);
  }
}
</style>
