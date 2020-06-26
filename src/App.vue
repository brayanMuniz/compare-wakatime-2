<template>
  <div id="app">
    <router-view v-if="dataLoaded" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { firebaseApp } from "@/db";
import store from "@/store";

export default Vue.extend({
  data() {
    return {
      dataLoaded: false
    };
  },
  async created() {
    console.log("Getting user data...");
    await firebaseApp.auth().onAuthStateChanged(user => {
      if (user) {
        store.commit("updateUserFBStatus", user.uid);
        console.log("User", user.uid, "signed in.");
        this.dataLoaded = true;
      } else {
        store.commit("updateUserFBStatus", undefined);
        console.log("User not signed in");
        this.dataLoaded = true;
      }
    });
  }
});
</script>

