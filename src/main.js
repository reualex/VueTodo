import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { messages } from "./components/common/i18n/messages";
import UUID from "vue-uuid";
import vueDebounce from "vue-debounce";
import VueI18n from "vue-i18n";
import { vfmPlugin } from "vue-final-modal";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: "en",
  messages,
});

Vue.config.productionTip = false;

Vue.use(UUID);
Vue.use(vueDebounce, {
  defaultTime: "500ms",
});
Vue.use(vfmPlugin);
Vue.component("v-select", vSelect);

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
