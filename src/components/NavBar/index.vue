<template>
  <nav id="nav" class="nav-bar">
    <router-link
      :to="{ name: 'Home', path: '/', params: { lang: this.$i18n.locale } }"
      class="nav-bar__link"
      >{{ $t("message.Routes.Home") }}</router-link
    >
    <router-link
      :to="{
        name: 'About',
        path: '/about',
        params: { lang: this.$i18n.locale },
      }"
      class="nav-bar__link"
      >{{ $t("message.Routes.About") }}</router-link
    >
    <ChangeLanguage />
  </nav>
</template>

<script>
import ChangeLanguage from "@/components/ChangeLanguage";

export default {
  name: "NavBar",
  components: {
    ChangeLanguage,
  },
};
</script>

<style lang="scss" scoped>
.nav-bar {
  display: flex;
  justify-content: center;

  &__link {
    position: relative;
    margin-right: 12px;
    height: max-content;

    &::after {
      content: "";
      width: 0;
      height: 100%;
      position: absolute;
      border-right: 1px solid black;
      top: 0;
      right: -6px;
    }
  }
}
</style>
