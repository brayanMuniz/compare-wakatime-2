<template>
  <div id="app">
    <navbar></navbar>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Navbar from "@/components/Navbar.vue";
import { Account } from "@/Classes/Account";
import store from "@/store/index";
import { firebaseApp } from "@/db";
export default Vue.extend({
  name: "App",
  components: {
    Navbar,
  },
  async mounted() {
    await firebaseApp.auth().onAuthStateChanged(async (user) => {
      if (user) {
        const account: Account = new Account(user);
        store.commit("userModule/setAccount", account);
      }
    });
  },
});
</script>

<style scoped>
@import "~bootstrap/dist/css/bootstrap.css";
#app {
  /* Make the width bigger */
  background-color: #343a40;
}
</style>
