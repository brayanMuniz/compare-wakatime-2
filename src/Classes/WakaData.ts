import firebaseApp from "firebase";

export class WakaData {
  async getUserData() {
    const dataCollection: DataCollection = {
      labels: [],
      datasets: [
        {
          label: String,
          backgroundColor: ["rgb(255, 99, 132)"],
          data: [],
        },
        {
          label: String,
          backgroundColor: ["rbg(0, 0, 230)"],
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
    userData.firebaseUID.forEach((user: string, index: number) => {
      dataCollection.datasets[index].label = userData.wakatimeUserName[index];
      Promise.resolve(
        firebaseApp
          .firestore()
          .collection("users")
          .doc(user as string)
          .collection("summaries")
          // Todo: Limit the number dates to 7 or 14
          .get()
          .then(function(querySnapshot) {
            querySnapshot.forEach((doc) => {
              // console.log(doc.id, "=>", doc.data());
              dataCollection.datasets[index].data.push(
                doc.data().grand_total.total_seconds
              );
              dataCollection.labels.push(doc.id);
            });
          })
      );
    });
    const orderedDates = dataCollection.labels.sort((a, b) => {
      return new Date(a).valueOf() - new Date(b).valueOf();
    });
    dataCollection.labels = orderedDates;
    const wakatimeOptions = {
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
    const data = {
      dataCollection,
      wakatimeOptions,
    };
    return data;
  }
}

export interface UserSystems {
  // Todo: Need to set them into arrays, except for grand_total
  catagories: Array<UserTime>;
  dependencies: Array<UserTime>;
  editors: Array<UserTime>;
  grand_total: UserTime;
  languages: Array<UserTime>;
  machines: Array<UserTime>;
  operating_systems: Array<UserTime>;
  range: UserRange;
}

export interface UserRange {
  data: string;
  end: string;
  start: string;
  text: string;
  timezone: string;
}

export interface UserTime {
  digital: string;
  hours: number;
  minutes: number;
  name: string;
  percent: number;
  seconds: number;
  text: string;
  total_seconds: number;
}

export interface DataCollection {
  labels: Array<string>;
  datasets: Array<any>;
}

interface UserData {
  firebaseUID: Array<string>;
  wakatimeUserName: Array<string>;
}
