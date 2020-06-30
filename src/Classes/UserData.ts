import firebaseApp from "firebase";

export class UserData {
  getUserData() {
    firebaseApp
      .firestore()
      .collection("Users")
      .doc("E9CvU8HjhpO0Xj5If3c6KBxsmth1")
      .collection("Summaries")
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach((doc) => {
          console.log(doc.id, "=>", doc.data().grand_total.total_seconds);
        //   this.wakatimeData.push(doc.data());
        });
      });
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
    labels: Array<any>;
    datasets: Array<any>;
  }