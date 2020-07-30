<template>
  <div>
    <nav
      class="navbar navbar-expand-lg navbar-dark"
      style="background-color: #232627"
    >
      <router-link to="/" class="navbar-brand">
        Compare Wakatime
      </router-link>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto"></ul>
        <form class="form-inline my-2 my-lg-0" v-if="account">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item dropleft">
              <a
                class="nav-link dropdown-toggle text-light"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {{ account.user.email }}
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <router-link to="/" class="dropdown-item">Profile</router-link>
                <router-link to="/" class="dropdown-item">Sign out</router-link>
              </div>
            </li>
          </ul>
          <!-- <button class="btn btn-outline-light my-2 my-sm-0">
            Sign out
          </button> -->
        </form>
        <form class="from-inline my-2 my-lg-0" v-else>
          <button
            class="btn btn-outline-light my-2 my-sm-0"
            style="margin-right: 10px;"
          >
            Sign In
          </button>
          <button class="btn btn-outline-light my-2 my-sm-0">Sign Up</button>
        </form>
      </div>
    </nav>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
export default Vue.extend({
  computed: mapState("userModule", ["account"]),
});
</script>

<style></style>
