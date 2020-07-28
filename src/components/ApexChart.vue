<template>
  <div></div>
</template>

<script lang="ts">
import Vue from "vue";
import ApexCharts from "apexcharts";

export default Vue.extend({
  data() {
    return {
      options: {
        chart: {
          type: "line",
        },
        series: [
          {
            name: "sales",
            data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
          },
        ],
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
        },
      },
    };
  },
  mounted(){
      let chart = new ApexCharts(do)
  }
});
</script>

<style></style>
