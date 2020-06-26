<template>
  <div class="home">
    <h1>bruh</h1>
    <button @click="addItSelf">Count: {{ count }}</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";

@Component
export default class Home extends Vue {
  count = Number();
  addItSelf() {
    this.count = this.count + 1;
    console.log("bruh");
  }
  @Watch("count")
  onCountChanged(val: number, oldVal: number) {
    console.log("val", val);
    console.log("oldVal", oldVal);
  }
}
</script>
