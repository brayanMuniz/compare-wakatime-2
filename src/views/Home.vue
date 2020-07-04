<template>
  <div v-if="userSignedIn">
    <div v-if="userAuthenticatedWithWaka">This is where the real stuff will be</div>

    <div v-else>
      Authenticate this application with
      <a :href="wakaTimeRedirect">wakatime</a>
    </div>
  </div>

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

    <p>Or Sign In</p>
    <form @submit.prevent="signIn">
      <div class="form-group">
        <label for="Email">Email address</label>
        <input type="email" class="form-control" aria-describedby="emailHelp" v-model.trim="email" />
      </div>

      <div class="form-group">
        <label for="Password">Password</label>
        <input v-model.trim="password" type="password" class="form-control" />
      </div>

      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>
<script lang='ts'>
import Vue from "vue";
import store from "@/store";
import { firebaseAuth } from "@/db";
import url from "url";
import axios from "axios";
export default Vue.extend({
  name: "Home",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  async created() {
    if (
      this.$route.query.code !== undefined &&
      this.$route.query.code !== null &&
      typeof this.$route.query.code == "string"
    ) {
      const code: string = this.$route.query.code;
      await this.callableFirebaseFunction(code);
    }
  },
  methods: {
    async makeFirebaseAccount() {
      if (this.password.length < 6) {
        alert("Make password at least 6 characters");
      } else {
        console.log("Making User....");

        await firebaseAuth
          .createUserWithEmailAndPassword(this.email, this.password)
          .then(async res => {
            if (res.user) {
              const myUid: string = res.user.uid;
              store.commit("updateUserFBStatus", res.user.uid);
              console.log("Made user", myUid);
            }
          })
          .catch(err => {
            console.error("Failed to make user");
            store.commit("updateUserFBStatus", undefined);
            console.error(err.code, err.message);
          });
      }
    },
    async callableFirebaseFunction(code: string) {
      const userUID: string | undefined = store.getters.getUserUID;
      if (userUID !== undefined) {
        console.log("calling it ");
        const parameters = {
          // eslint-disable-next-line
          redirect_uri: "http://localhost:8080",
          userUID,
          code
        };
        await axios
          .post(
            "https://us-central1-wakatime-data.cloudfunctions.net/widgets/serverSidePostWakatimeRequest/",
            parameters
          )
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.error(err);
          });
      }
    },
    async signIn() {
      console.log("Signing in user...");
      await firebaseAuth
        .signInWithEmailAndPassword(this.email, this.password)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.error(err);
        });
    }
  },
  computed: {
    userSignedIn(): boolean {
      return store.getters.userSignedIn;
    },
    userAuthenticatedWithWaka(): boolean {
      return store.getters.getUserWakaAuth;
    },
    wakaTimeRedirect(): string {
      const scope =
        "read_stats,read_logged_time,read_orgs,read_private_leaderboards";
      const fullUrl = url.format({
        pathname: "https://wakatime.com/oauth/authorize",
        // Todo: configure eslint to allow those 3
        query: {
          // eslint-disable-next-line
          client_id: store.state.wakaTimeClientId,
          // eslint-disable-next-line
          response_type: "code",
          // eslint-disable-next-line
          redirect_uri: "http://localhost:8080",
          scope
        }
      });
      return fullUrl;
    }
  }
});
</script>
