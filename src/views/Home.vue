<template>
  <div v-if="userSignedIn"></div>
  <div v-else>
    <p>Make A Firebase account</p>
    <form @submit.prevent="makeFirebaseAccount">
      <div class="form-group">
        <label for="Email">Email address</label>
        <input
          type="email"
          class="form-control"
          id="Email"
          aria-describedby="emailHelp"
          v-model.trim="email"
        />
      </div>

      <div class="form-group">
        <label for="Password">Password</label>
        <input v-model.trim="password" type="password" class="form-control" id="Password" />
      </div>

      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import store from "@/store";
import { firebaseApp } from "@/db";

export default Vue.extend({
  name: "Home",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    async makeFirebaseAccount() {
      if (this.password.length < 6) {
        alert("Make password at least 6 characters");
      } else {
        console.log("Making User....");

        await firebaseApp
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then(async res => {
            if (res.user) {
              const myUid: string = res.user.uid;
              console.log("Made user", myUid);
            }
          })
          .catch(err => {
            console.error("Failed to make user");
            console.error(err.code, err.message);
          });
      }
    }
  },
  computed: {
    userSignedIn(): boolean {
      return store.getters.userSignedIn;
    }
  }
});
</script>
