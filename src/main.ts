import Vue from "vue";
import Router from "vue-router";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import "bootstrap";
Vue.use(Router);
Vue.config.productionTip = true;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
