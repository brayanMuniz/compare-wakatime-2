<template>
  <div class="home">
    <div class="container-fluid" style="margin-top: 10px">
      <div class="row">
        <div class="col-12">
          <div class="card" style="background-color: #232627">
            <div class="card-body">
              <!-- <h5 class="card-title">Card title</h5> -->
              <!-- <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6> -->
              <area-chart :wakaData="wakatimeData" />
            </div>
          </div>
        </div>
      </div>
      <div
        class="row justify-content-center"
        style="margin-top: 10px; margin-bottom: 10px"
      >
        <div class="col-6">
          <div class="card" style="background-color: #232627; width: 525px">
            <div class="card-body">
              <pie-chart :userData="wakatimeData" />
            </div>
          </div>
        </div>
      </div>
    </div>
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
