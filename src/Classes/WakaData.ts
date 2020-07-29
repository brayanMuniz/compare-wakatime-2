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

export interface Dataset {
  data: Array<number>;
  label: string;
}
export interface UserData {
  firebaseUID: Array<string>;
  wakatimeUserName: Array<string>;
}

export interface UserTimeData {
  userName: string;
  userTime: number;
}
