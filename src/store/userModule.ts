import Vue from "vue";
import { Account, UserInput } from "@/Classes/Account";
import { ActionTree, GetterTree, MutationTree } from "vuex";

const state = {
  user: Object(),
  account: Account,
  userFetched: Boolean(),
};

const getters: GetterTree<any, any> = {
  getAccount: (state: State) => {
    return state.account;
  },
};

const mutations: MutationTree<any> = {
  setAccount(state: State, user: any) {
    Vue.set(state, "account", user);
  },
};

const actions: ActionTree<any, any> = {
  login({ state }, userInput: UserInput) {
    state.account.login(userInput as UserInput);
  },
  async signOut({ state }) {
    state.account.signOut();
  },
  createNewUser({ state }, userInput: UserInput) {
    state.account.createNewUser(userInput as UserInput);
  },
  saveProfileChanges({ state }, userChanges: string) {
    state.account.changeUserProfile(userChanges as string);
  },
};

interface State {
  user: Record<string, any>;
  account: Account;
  userFetched: boolean;
}

export default {
  namespaced: true, 
  state,
  getters,
  mutations,
  actions,
};
