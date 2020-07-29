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
import { Dataset } from "../Classes/WakaData";
export default Vue.extend({
  components: {
    apexcharts: VueApexCharts,
  },
  data() {
    return {
      chartOptions: {
        chart: {
          id: "Wakatime",
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
      series: [] as Array<Series>,
    };
  },
  props: ["wakaData"],
  watch: {
    wakaData() {
      this.wakaData.datasets.forEach((userData: Dataset) => {
        console.log(userData);
        const userGraph: { data: Array<number>; name: string } = {
          data: userData.data,
          name: userData.label,
        };
        this.series.push(userGraph);
      });
    },
  },
});

interface Series {
  name: string;
  data: Array<number>;
}
</script>

<style></style>
