import firebaseApp from "firebase";
import { data } from "jquery";

export class WakaData {
  async getUserData() {
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
        // Todo: Make this query all users
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
