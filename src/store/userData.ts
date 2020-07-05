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
      labels: [],
      datasets: [],
    };

    interface UserData2 {
      firebaseUid: string;
      wakatimeUserName: string;
    }

    const userData: UserData = {
      firebaseUID: [],
      wakatimeUserName: [],
    };

    const allUsers: Array<UserData2> = [];

    await firebaseApp
      .firestore()
      .collection("users")
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach((doc) => {
          if (doc.exists)
            allUsers.push({
              firebaseUid: doc.id,
              wakatimeUserName: doc.data().wakatimeUserName,
            });

          userData.firebaseUID.push(doc.id);
          userData.wakatimeUserName.push(doc.data().wakatimeUserName);
        });
      })
      .catch((err) => {
        console.error(err);
      });

    for (let i = 0; i < allUsers.length; i++) {
      await firebaseApp
        .firestore()
        .collection("users")
        .doc(allUsers[i].firebaseUid)
        .collection("summaries")
        .where("range.date", ">", moment(moment().subtract(3, "days")).format("YYYY-MM-DD") as string)
        .get()
        .then(() => {
          const payload: Dataset = {
            label: String(),
            backgroundColor: "rgb(255, 99, 132)",
            data: [],
          };
          dataCollection.labels.push(allUsers[i].wakatimeUserName);
          dataCollection.datasets.push(payload);
        });
    }

    for (const [index, user] of userData.firebaseUID.entries()) {
      dataCollection.datasets[index].label = userData.wakatimeUserName[index];
      await firebaseApp
        .firestore()
        .collection("users")
        .doc(user)
        .collection("summaries")

        .where("range.date", ">", moment(moment().subtract(3, "days")).format("YYYY-MM-DD") as string)
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach((doc) => {
            if (index === 1) {
              dataCollection.labels.push(doc.id);
            }
            dataCollection.datasets[index].data.push(
              Math.round((doc.data().grand_total.total_seconds / 60 / 60 + Number.EPSILON) * 100) / 100
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
