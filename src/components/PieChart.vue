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
import { DataCollection, UserTimeData, Dataset } from "../Classes/WakaData";
export default Vue.extend({
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      series: [] as Array<number>,
      chartOptions: {
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
    compareTime(timePayload: DataCollection) {
      const totalUserTime: Array<UserTimeData> = [];
      timePayload.datasets.forEach((userData: Dataset) => {
        const payload: UserTimeData = {
          userName: userData.label,
          userTime: Number(
            userData.data.reduce((a: number, b: number) => a + b, 0).toFixed(2)
          ),
        };
        totalUserTime.push(payload);
      });
      this.chartOptions.labels.push(totalUserTime[0].userName);
      this.chartOptions.labels.push(totalUserTime[1].userName);
      this.series.push(totalUserTime[0].userTime);
      this.series.push(totalUserTime[1].userTime);
      //   this.series = totalUserTime
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
