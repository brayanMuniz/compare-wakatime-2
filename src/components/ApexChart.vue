<template>
  <div>
    <apexcharts
      width="1725"
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
  props: ["stockData"],
  watch: {
    stockData() {
      this.series = [
        {
          data: this.stockData.datasets[0].data,
          name: this.stockData.datasets[0].label,
        },
        {
          data: this.stockData.datasets[1].data,
          name: this.stockData.datasets[1].label,
        },
      ];
      this.chartOptions = {
        chart: {
          id: "Wakatime",
        },
        xaxis: {
          categories: this.stockData.labels,
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
      this.chartOptions.xaxis.categories = this.stockData.labels;
      this.series[0].data = this.stockData.datasets[0].data;
    },
  },
});
</script>

<style></style>
