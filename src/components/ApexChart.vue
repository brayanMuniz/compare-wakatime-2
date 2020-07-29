<template>
  <div>
    <!-- Change width and height to match users screen not by PIXELS -->
    <apexcharts
      width="100%"
      height="500"
      type="area"
      :options="chartOptions"
      :series="series"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import VueApexCharts from "vue-apexcharts";
export default Vue.extend({
  components: {
    apexcharts: VueApexCharts,
  },
  data() {
    return {
      chartOptions: {
        chart: {
          id: "basic-bar",
        },
        xaxis: {
          categories: [],
        },
        legend: {
          show: true,
          labels: {
            useSeriesColors: true,
          },
        },
        grid: {
          show: false,
        },
      },
      series: [
        {
          name: "series-1",
          data: [],
        },
      ],
    };
  },
  props: ["userData"],
  watch: {
    userData() {
      this.series = [
        {
          data: this.userData.datasets[0].data,
          name: this.userData.datasets[0].label,
        },
        {
          data: this.userData.datasets[1].data,
          name: this.userData.datasets[1].label,
        },
      ];
      this.chartOptions = {
        chart: {
          id: "Wakatime",
        },
        xaxis: {
          categories: this.userData.labels,
        },
        legend: {
          show: true,
          labels: {
            useSeriesColors: true,
          },
        },
        grid: {
          show: false,
        },
      };
      this.chartOptions.xaxis.categories = this.userData.labels;
      this.series[0].data = this.userData.datasets[0].data;
    },
  },
});
</script>

<style></style>
