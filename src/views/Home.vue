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
import firebaseApp from "firebase";
import LineChart, { ChartData } from "@/components/LineChart.vue";
import UserTable from "@/components/UserTable.vue";
import { DataCollection } from "@/Classes/UserData";
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
    };
  },
  methods: {
    async formatWakatimeData() {
      const dataCollection: DataCollection = {
        labels: [],
        datasets: [
          {
            label: "jahirPorcayo",
            backgroundColor: ["rgb(255, 99, 132)"],
            data: [],
          },
        ],
      };

      await Promise.resolve(
        firebaseApp
          .firestore()
          .collection("Users")
          .doc("E9CvU8HjhpO0Xj5If3c6KBxsmth1")
          .collection("Summaries")
          .where("grand_total.total_seconds", ">", 1000)
          .get()
          .then(function(querySnapshot) {
            querySnapshot.forEach((doc) => {
              dataCollection.datasets[0].data.push(
                doc.data().grand_total.total_seconds
              );
              dataCollection.labels.push(doc.id);
            });
          })
          .catch((err) => {
            console.error(err);
          })
      );
      console.log(dataCollection);
      const orderedDates = dataCollection.labels.sort((a, b) => {
        return new Date(a).valueOf() - new Date(b).valueOf();
      });
      dataCollection.labels = orderedDates;
      this.wakatimeData = dataCollection;
      this.wakatimeOptions = {
        responsive: true,
        lineTension: 1,
        maintainAspectRatio: false,
        color: ["white"],
        legend: {
          labels: {
            // This more specific font property overrides the global property
            fontColor: "#FFFFFF",
          },
          datasets: {
            label: {
              fontColor: "#FFFFFF",
            },
          },
        },
        scales: {
          yAxes: [
            {
              ticks: {
                fontColor: "#FFFFFF",
                beginAtZero: true,
                padding: 25,
              },
            },
          ],
          xAxes: [
            {
              ticks: {
                fontColor: "#FFFFFF",
              },
            },
          ],
        },
      };
      this.loaded = true;
    },
  },
  mounted() {
    this.formatWakatimeData();
  },
});
</script>
