import { ActionTree, GetterTree, MutationTree } from "vuex";
import { firebaseApp } from "@/db";
import { DataCollection, UserData, Dataset } from "@/Classes/WakaData";
import moment from "moment";

const state = {};
// eslint-disable-next-line
const getters: GetterTree<any, any> = {};
// eslint-disable-next-line
const mutations: MutationTree<any> = {};
// eslint-disable-next-line
const actions: ActionTree<any, any> = {
  async getWakatimeData() {
    const dataCollection: DataCollection = {
      labels: [] as Array<string>,
      datasets: [] as Array<Dataset>,
    };
    const userData: UserData = {
      firebaseUID: [] as Array<string>,
      wakatimeUserName: [] as Array<string>,
    };

    await firebaseApp
      .firestore()
      .collection("users")
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach((doc) => {
          if (doc.exists) {
            userData.firebaseUID.push(doc.id);
            userData.wakatimeUserName.push(doc.data().wakatimeUserName);
          }
        });
      })
      .catch((err) => {
        console.error(err);
      });
    // ? Find a better way to get colors, can't use random num generator
    for (const [index, user] of userData.firebaseUID.entries()) {
      dataCollection.datasets[index] = {
        label: String(),
        data: [] as Array<number>,
      };
      dataCollection.datasets[index].label = userData.wakatimeUserName[index];
      await firebaseApp
        .firestore()
        .collection("users")
        .doc(user)
        .collection("summaries")
        .where(
          "range.date",
          ">",
          moment(moment().subtract(7, "days")).format("YYYY-MM-DD") as string
        )
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach((doc) => {
            if (index === 1) {
              dataCollection.labels.push(doc.id);
            }
            console.log(user, "=>", doc.id, doc.data().projects);
            dataCollection.datasets[index].data.push(
              Math.round(
                (doc.data().grand_total.total_seconds / 60 / 60 +
                  Number.EPSILON) *
                  100
              ) / 100
            );
          });
        });
    }
    return dataCollection;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
