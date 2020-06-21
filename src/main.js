import Vue from "vue";
import App from "./App.vue";
import Gradient from "./components/Gradient";
import Forecast from "./components/Forecast";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.config.productionTip = false;
Vue.component("Gradient", Gradient);
Vue.component("Forecast", Forecast);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
