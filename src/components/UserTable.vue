<template>
  <div>
    <table class="table table-dark" v-if="timeDataLoaded">
      <thead>
        <tr>
          <!-- <th scope="col">Rank</th> -->
          <th scope="col">User</th>
          <th scope="col">Time</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in userTime" :key="index">
          <!-- <th scope="row">{{ index + 1 }}</th> -->
          <td>{{ user.userName }}</td>
          <td>{{ user.userTime }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { DataCollection, Dataset, UserTimeData } from "@/Classes/WakaData";
export default Vue.extend({
  props: ["wakaData"],
  data() {
    return {
      timeDataLoaded: false,
      userTime: [] as unknown
    };
  },
  methods: {
    compareTime(timePayload: DataCollection) {
      this.timeDataLoaded = false;
      const totalUserTime: Array<UserTimeData> = [];
      timePayload.datasets.forEach((userData: Dataset) => {
        const payload: UserTimeData = {
          userName: userData.label,
          userTime: Number(
            userData.data.reduce((a: number, b: number) => a + b, 0).toFixed(2)
          )
        };
        totalUserTime.push(payload);
      });
      this.timeDataLoaded = true;
      this.userTime = totalUserTime;
    }
  },
  watch: {
    wakaData() {
      this.compareTime(this.wakaData);
    }
  }
});
</script>

<style></style>
