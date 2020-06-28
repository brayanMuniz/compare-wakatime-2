<template>
  <div class="home">
    <line-chart :chartData="planetData" :chartOptions="planetOptions" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import LineChart from "@/components/LineChart.vue";
import planetChartData from "@/chartData/chartData";

export default Vue.extend({
  components: {
    LineChart,
  },
  props: ["chartdata", "options"],
  data() {
    return {
      planetData: planetChartData.data,
      planetOptions: planetChartData.options,
    };
  },
});
</script>
