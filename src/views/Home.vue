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
import { WakaData } from "@/Classes/WakaData";
export default Vue.extend({
  components: {
    LineChart,
    UserTable,
  },
  data() {
    return {
      loaded: Boolean(),
      // type cast this correctly
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
