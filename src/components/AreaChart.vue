<template>
  <div>
    <!-- Change width and height to match users screen not by PIXELS -->
    <apexcharts
      width="99%"
      height="450"
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
  props: ["wakaData"],
  data() {
    return {
      chartOptions: {
        chart: {
          id: "Wakatime",
        },
        xaxis: {
          // type: "datetime",
          categories: [] as Array<string>,
          labels: {
            style: {
              colors: [
                "white",
                "white",
                "white",
                "white",
                "white",
                "white",
                "white",
              ],
            },
          },
        },
        yaxis: {
          labels: {
            style: {
              colors: [
                "white",
                "white",
                "white",
                "white",
                "white",
                "white",
                "white",
              ],
            },
          },
        },
        tooltip: {
          x: {
            format: "YYYY-MM-DD",
          },
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
  methods: {
    updateChart(): void {
      (this.chartOptions = {
        chart: {
          id: "Wakatime",
        },
        xaxis: {
          // type: "datetime",
          categories: this.wakaData.labels as Array<string>,
          labels: {
            style: {
              colors: [
                "white",
                "white",
                "white",
                "white",
                "white",
                "white",
                "white",
              ],
            },
          },
        },
        yaxis: {
          labels: {
            style: {
              colors: [
                "white",
                "white",
                "white",
                "white",
                "white",
                "white",
                "white",
              ],
            },
          },
        },
        tooltip: {
          x: {
            format: "YYYY-MM-DD",
          },
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
      }),
        this.wakaData.datasets.forEach((userData: Dataset) => {
          const userGraph: { data: Array<number>; name: string } = {
            data: userData.data,
            name: userData.label,
          };
          this.series.push(userGraph);
        });
    },
  },
  watch: {
    wakaData() {
      this.updateChart();
    },
    chartOptions() {
      console.log(this.chartOptions);
    },
  },
});

interface Series {
  name: string;
  data: Array<number>;
}
</script>

<style></style>
