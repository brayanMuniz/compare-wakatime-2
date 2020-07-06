import Vue from "vue";
import Vuex from "vuex";
import userModule from "./userModule";
import userData from './userData'
Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    userModule,
    userData
  },
});
