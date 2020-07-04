<template>
  <div id="app">
    <router-view v-if="dataLoaded" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { firestore } from "firebase";
import { firebaseAuth } from "@/db";
import store from "@/store";

export default Vue.extend({
  data() {
    return {
      dataLoaded: false
    };
  },
  async mounted() {
    console.log("Checking user auth...");
    await firebaseAuth.onAuthStateChanged(async user => {
      if (user) {
        store.commit("updateUserFBStatus", user.uid);
        console.log("User", user.uid, "signed in.");

        console.log("Getting data from firebase...");
        await firestore()
          .collection("users")
          .doc(user.uid)
          .get()
          .then(res => {
            console.log("Got your data", res, res.data());
          })
          .catch(err => {
            console.error(err);
          });
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

