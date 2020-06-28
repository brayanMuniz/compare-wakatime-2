<template>
  <div class="home">
    <line-chart :chartData="planetData" :chartOptions="planetOptions" />
    <user-table/>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import LineChart, { ChartData, ChartOptions } from "@/components/LineChart.vue";
import UserTable from '@/components/UserTable.vue'
import planetChartData from "@/chartData/chartData";
@Component({
  components: {
    LineChart,
    UserTable
  },
})
export default class Home extends Vue {
  planetData: ChartData = planetChartData.data;
  planetOptions: ChartOptions = planetChartData.options;
}
</script>
