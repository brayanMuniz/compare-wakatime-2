<template>
  <div class="home">
    <h1>bruh</h1>
    <h3>{{ count }}</h3>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class Home extends Vue {
  data() {
    return {
      count: Number(),
    };
  }
}
</script>
