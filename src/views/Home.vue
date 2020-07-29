<template>
  <div class="home">
    <area-chart :wakaData="wakatimeData" />
    <pie-chart :userData="wakatimeData" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import AreaChart from "@/components/AreaChart.vue";
import PieChart from "@/components/PieChart.vue";
import { DataCollection } from "@/Classes/WakaData";
import store from "@/store/index";
export default Vue.extend({
  components: {
    AreaChart,
    PieChart,
  },
  data() {
    return {
      wakatimeData: Object() as DataCollection,
    };
  },

  methods: {
    async renderWakatimeDataChart() {
      await store
        .dispatch("userData/getWakatimeData")
        .then((dataCollection: DataCollection) => {
          this.wakatimeData = dataCollection;
        });
    },
  },
  mounted() {
    this.renderWakatimeDataChart();
  },
});
</script>
