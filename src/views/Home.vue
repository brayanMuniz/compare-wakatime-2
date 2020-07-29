<template>
  <div class="home">
    <apex-chart :userData="wakatimeData" />
    <pie-chart :userData="wakatimeData" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ApexChart from "@/components/ApexChart.vue";
import PieChart from "@/components/PieChart.vue";
import { WakaData, DataCollection } from "@/Classes/WakaData";
import store from "@/store/index";
export default Vue.extend({
  components: {
    ApexChart,
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
