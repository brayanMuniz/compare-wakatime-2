<template>
  <div id="app">
    <navbar></navbar>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Navbar from "@/components/Navbar.vue";
export default Vue.extend({
  components: {
    Navbar,
  },
});
</script>

<style scoped>
@import "~bootstrap/dist/css/bootstrap.css";
#app {
  background-color: #343a40;
}
</style>
