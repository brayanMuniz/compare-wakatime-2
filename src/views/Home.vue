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
import LineChart from "@/components/LineChart.vue";
import UserTable from "@/components/UserTable.vue";
import { WakaData, DataCollection } from "@/Classes/WakaData";
import store from "@/store/index";
export default Vue.extend({
  components: {
    LineChart,
    UserTable,
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
