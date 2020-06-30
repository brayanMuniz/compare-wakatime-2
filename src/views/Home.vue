<template>
  <div class="home">
    <line-chart
      v-if="loaded"
      :chartData="wakatimeData"
      :chartOptions="wakatimeOptions"
    />
    <user-table />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import LineChart, { ChartData } from "@/components/LineChart.vue";
import UserTable from "@/components/UserTable.vue";
import { WakaData } from "@/Classes/WakaData";
import planetChartData from "@/chartData/chartData";
export default Vue.extend({
  components: {
    LineChart,
    UserTable,
  },
  data() {
    return {
      loaded: Boolean(),
      planetData: planetChartData.data as ChartData,
      // type cast this correctly
      planetOptions: planetChartData.options,
      wakatimeData: {},
      wakatimeOptions: {},
      wakaDataClass: new WakaData() as WakaData,
    };
  },
  methods: {
    async formatWakatimeData() {
      await this.wakaDataClass.getUserData().then((res) => {
        this.wakatimeData = res.dataCollection;
        this.wakatimeOptions = res.wakatimeOptions;
      });
      this.loaded = true;
    },
  },
  mounted() {
    this.formatWakatimeData();
  },
});
</script>
