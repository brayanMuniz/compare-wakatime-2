import { ActionTree, GetterTree, MutationTree } from "vuex";
import { firebaseApp } from "@/db";
import { DataCollection, UserData } from "@/Classes/WakaData";
import moment from "moment";

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
        {
          label: String(),
          backgroundColor: "rbg(0, 0, 230)",
          data: [],
        },
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
    for (const [index, user] of userData.firebaseUID.entries()) {
      dataCollection.datasets[index].label = userData.wakatimeUserName[index];
      await Promise.resolve(
        firebaseApp
          .firestore()
          .collection("users")
          .doc(user)
          .collection("summaries")
          // Todo: Make a function using moment js that finds 8 days ago, but whenever there's more data
          // !                            ↓
          .where(
            "range.date",
            ">",
            moment(moment().subtract(3, "days")).format("YYYY-MM-DD") as string
          )
          // Todo: Limit the number dates to 7 or 14
          .get()
          .then(function(querySnapshot) {
            querySnapshot.forEach((doc) => {
              if (index === 1) {
                dataCollection.labels.push(doc.id);
              }
              dataCollection.datasets[index].data.push(
                Math.round(
                  (doc.data().grand_total.total_seconds / 60 / 60 +
                    Number.EPSILON) *
                    100
                ) / 100
              );
              // Todo: With Multiple users don't push the dates twice, only once
            });
          })
      );
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
