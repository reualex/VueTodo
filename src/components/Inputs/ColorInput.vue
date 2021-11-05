<template>
  <input
    class="color-input"
    v-debounce:300ms="handleInput"
    :style="{ background: color }"
    :class="colorInputClass"
    :value="value"
    :disabled="disabled"
    :type="type"
  />
</template>

<script>
export default {
  name: "ColorInput",
  props: {
    type: { type: String, default: "text" },
    value: { type: String, default: "" },
    color: { type: String, default: "" },
    disabled: { type: Boolean, default: false },
  },

  computed: {
    // improvement add function
    colorInputClass() {
      if (this.color === "black") {
        return "input-dark-mode";
      } else {
        return "input-light-mode";
      }
    },
  },

  methods: {
    handleInput(value) {
      this.$emit("changeInput", value);
    },
  },
};
</script>

<style lang="scss" scoped>
.color-input {
  margin: 0;
  padding: 4px 12px;
  border: 1px solid rgba(60, 60, 60, 0.26);
  border-radius: 6px;
}

.input-light-mode {
  color: black;
}

.input-dark-mode {
  color: white;
}
</style>
