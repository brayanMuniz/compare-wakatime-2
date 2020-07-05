import { ActionTree, GetterTree, MutationTree } from "vuex";
import { firebaseApp } from "@/db";
import { DataCollection, UserData } from "@/Classes/WakaData";

const state = {};

const getters: GetterTree<any, any> = {};

const mutations: MutationTree<any> = {};

const actions: ActionTree<any, any> = {
  async getWakatimeData() {
    const dataCollection: DataCollection = {
      labels: [],
      datasets: [
        {
          label: String(),
          backgroundColor: "rgb(255, 99, 132)",
          data: [],
        },
        // {
        //   label: String(),
        //   backgroundColor: "rbg(0, 0, 230)",
        //   data: [],
        // },
      ],
    };
    const userData: UserData = {
      firebaseUID: [],
      wakatimeUserName: [],
    };
    await Promise.resolve(
      firebaseApp
        .firestore()
        .collection("users")
        // Todo: Make this query all users
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach((doc) => {
            userData.firebaseUID.push(doc.id);
            userData.wakatimeUserName.push(doc.data().wakatimeUserName);
          });
        })
        .catch((err) => {
          console.error(err);
        })
    );
    // userData.firebaseUID.forEach((user: string, index: number) => {
    dataCollection.datasets[0].label = userData.wakatimeUserName[1];
    await Promise.resolve(
      firebaseApp
        .firestore()
        .collection("users")
        .doc(userData.firebaseUID[1])
        .collection("summaries")
        // Todo: Limit the number dates to 7 or 14
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach((doc) => {
            // console.log(doc.id, "=>", doc.data());
            dataCollection.datasets[0].data.push(
              Math.round(
                (doc.data().grand_total.total_seconds / 60 / 60 +
                  Number.EPSILON) *
                  100
              ) / 100
            );
            dataCollection.labels.push(doc.id);
          });
        })
    );
    // });
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
