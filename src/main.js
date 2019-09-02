import Vue from "vue";
import BootstrapVue from "bootstrap-vue";

import App from "./App.vue";
import router from "./router";
import { store } from "./store";

import "./sass/main.scss";

Vue.config.productionTip = false;
Vue.config.devtools = true;

Vue.use(BootstrapVue);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
