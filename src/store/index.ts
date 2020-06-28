import Vue from "vue";
import Vuex from "vuex";
import userStore from "./modules/userStore";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    wakaTimeClientId: "uB6e26g46qVjE4TJsjD2ua54",
  },
  mutations: {},
  actions: {},
  modules: {
    userStore,
  },
});
