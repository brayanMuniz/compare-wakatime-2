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
import { WakaData, DataCollection } from "@/Classes/WakaData";
import store from "@/store/index";
export default Vue.extend({
  components: {
    AreaChart,
    PieChart,
  },
  data() {
    return {
      loaded: Boolean(),
      // type cast this correctly
      wakatimeData: Object() as DataCollection,
      wakatimeOptions: {},
      wakaDataClass: new WakaData() as WakaData,
    };
  },

  methods: {
    async renderWakatimeDataChart() {
      await store
        .dispatch("userData/getWakatimeData")
        .then((dataCollection: DataCollection) => {
          this.wakaDataClass.formatWakatimeData(dataCollection).then((res) => {
            this.wakatimeData = res.dataCollection;
            this.wakatimeOptions = res.wakatimeOptions;
          });
        });
      this.loaded = true;
    },
  },
  mounted() {
    this.renderWakatimeDataChart();
    // this.formatWakatimeData();
  },
});
</script>
