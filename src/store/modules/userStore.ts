import { ActionTree, GetterTree, MutationTree } from "vuex";

const state: UserState = {
  isUserSignedIn: false,
  userWakaAuthentication: false,
  userUID: undefined,
};

const getters: GetterTree<any, any> = {
  userSignedIn(): boolean {
    return state.isUserSignedIn;
  },
  getUserUID(): string | undefined {
    return state.userUID;
  },
};
const mutations: MutationTree<any> = {
  updateUserFBStatus(state: UserState, newUserUID: string | undefined) {
    if (newUserUID != undefined) {
      state.isUserSignedIn = true;
      state.userUID = newUserUID;
    } else {
      state.isUserSignedIn = false;
      state.userUID = undefined;
    }
  },
};
const actions: ActionTree<any, any> = {};

interface UserState {
  isUserSignedIn: boolean;
  userWakaAuthentication: boolean;
  userUID: string | undefined;
}

export default {
  actions,
  mutations,
  getters,
  state,
};
