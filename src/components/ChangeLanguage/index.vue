<template>
  <ul class="change-lang">
    <li>
      <button type="button" @click="() => changeLang('ru')">ru</button>
    </li>
    <li>
      <button type="button" @click="() => changeLang('en')">en</button>
    </li>
  </ul>
</template>

<script>
export default {
  name: "ChangeLanguage",
  methods: {
    changeLang(lang) {
      this.$i18n.locale = lang;
    },
  },
};
</script>

<style lang="scss" scoped>
.change-lang {
  display: flex;

  li + li {
    margin-left: 4px;
  }

  li {
    button {
      padding: 2px 8px;
      background-color: #f0fff1;
      border: 1px solid #66ff00;
      border-radius: 4px;
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
  }
}
</style>
