<template>
  <div>
    <apexchart
      type="donut"
      :options="chartOptions"
      :series="series"
      width="500"
      height="500"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import VueApexCharts from "vue-apexcharts";
import { DataCollection, Dataset } from "../Classes/WakaData";
export default Vue.extend({
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      series: [] as Array<number>,
      chartOptions: {
        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: true,
                name: {
                  show: true,
                  color: "white",
                },
                value: {
                  show: true,
                  color: "white",
                },
                total: {
                  show: true,
                  label: "Total Hours",
                  color: "white",
                },
              },
            },
          },
        },
        chart: {
          type: "donut",
        },
        labels: [] as Array<string>,
        legend: {
          show: true,
          labels: {
            useSeriesColors: true,
          },
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 100,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
    };
  },
  props: ["userData"],
  methods: {
    compareTime(userData: DataCollection) {
      userData.datasets.forEach((userData: Dataset) => {
        this.chartOptions.labels.push(userData.label);
        this.series.push(
          Number(
            userData.data.reduce((a: number, b: number) => a + b, 0).toFixed(2)
          )
        );
      });
    },
  },
  watch: {
    userData() {
      this.compareTime(this.userData);
    },
  },
});
</script>

<style></style>
