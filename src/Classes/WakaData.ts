export class WakaData {
  async formatWakatimeData(dataCollection: DataCollection) {
    // const orderedDates = dataCollection.labels.sort((a, b) => {
    //   return new Date(a).valueOf() - new Date(b).valueOf();
    // });
    // console.log('orderedDates', orderedDates)
    // dataCollection.labels = orderedDates;
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
            // type: "time",
            ticks: {
              fontColor: "#FFFFFF",
              beginAtZero: true,
              padding: 25,
            },
          },
        ],
        xAxes: [
          {
            // type: "time",
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
  datasets: Array<Dataset>;
}

interface Dataset {
  backgroundColor: string;
  data: Array<number>;
  label: string;
}
export interface UserData {
  firebaseUID: Array<string>;
  wakatimeUserName: Array<string>;
}
