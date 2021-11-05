<template>
  <div
    class="color-select"
    tabindex="0"
    :class="{ 'color-select__disabled': disabled }"
    @blur="showList = false"
  >
    <div @click="toggleShowList" class="color-select__active-color">
      <span class="color-select__label">{{ currentValue.label }}</span>
      <div
        class="color-select__icon"
        :class="{ 'color-select__icon__show': showList }"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="10"
          role="presentation"
          class="vs__open-indicator"
        >
          <path
            d="M9.211364 7.59931l4.48338-4.867229c.407008-.441854.407008-1.158247 0-1.60046l-.73712-.80023c-.407008-.441854-1.066904-.441854-1.474243 0L7 5.198617 2.51662.33139c-.407008-.441853-1.066904-.441853-1.474243 0l-.737121.80023c-.407008.441854-.407008 1.158248 0 1.600461l4.48338 4.867228L7 10l2.211364-2.40069z"
          ></path>
        </svg>
      </div>
    </div>
    <ul v-if="showList" class="color-select__list">
      <li
        v-for="option in options"
        :key="option.value"
        :class="option.value"
        @click="() => handleSelect(option)"
      >
        <div
          v-if="option.value !== currentValue.value"
          class="color-select__list__item"
        >
          {{ option.label }} <span v-if="option.text">({{ option.text }})</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "CustomColorSelect",
  props: {
    options: { type: Array, default: () => [] },
    currentValue: { type: Object, default: () => {} },
    disabled: { type: Boolean, default: false },
  },
  data() {
    return {
      showList: false,
    };
  },
  methods: {
    handleSelect(color) {
      this.$emit("setColor", color);
      this.showList = false;
    },
    toggleShowList() {
      if (!this.disabled) {
        this.showList = !this.showList;
      }
    },
  },
};
</script>

>
<style lang="scss" scoped>
.color-select {
  position: relative;
  width: 100%;
  cursor: pointer;
  transition: 800ms;

  &__disabled {
    background-color: rgba(60, 60, 60, 0.26);
    cursor: not-allowed;
    transition: 800ms;
  }

  &__active-color {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 4px;
    border: 1px solid rgba(60, 60, 60, 0.26);
    border-radius: 4px;
    transition: 0.5s;
  }

  &__label {
    color: #333;
    line-height: 1.4;
    padding: 0 0.25em;
    z-index: 0;
  }

  &__icon {
    padding: 4px 6px 0 3px;

    svg {
      transform: scale(1);
      transition: transform 0.15s cubic-bezier(1, -0.115, 0.975, 0.855);
      transition-timing-function: cubic-bezier(1, -0.115, 0.975, 0.855);
    }

    &__show {
      svg {
        transform: rotate(180deg) scale(1);
      }
    }
  }

  &__list {
    width: 100%;
    position: absolute;
    border: 1px gray solid;
    border-radius: 4px;
    background: rgb(224, 223, 223);
    z-index: 10;
    cursor: pointer;

    &__item {
      padding: 8px 12px;
    }

    // color personal styles

    .white {
      background: white;
      &:hover {
        background: darken(white, 10%);
      }
    }

    .black {
      background: black;
      &:hover {
        background: lighten(black, 30%);
      }
    }

    .yellow {
      background: yellow;
      &:hover {
        background: darken(yellow, 10%);
      }
    }

    .red {
      background: red;
      &:hover {
        background: darken(red, 10%);
      }
    }

    .blue {
      background: blue;
      &:hover {
        background: darken(blue, 10%);
      }
    }

    .aqua {
      background: aqua;
      &:hover {
        background: darken(aqua, 10%);
      }
    }

    .all-color {
      background: #66ff00;
      &:hover {
        background: darken(#66ff00, 10%);
      }
    }
  }
}
</style>
