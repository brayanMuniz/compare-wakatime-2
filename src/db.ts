import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyC2ilXBezBS-Mx_UlrE_MczlluIlN11l08",
  authDomain: "wakatimesaveddata.firebaseapp.com",
  databaseURL: "https://wakatimesaveddata.firebaseio.com",
  projectId: "wakatimesaveddata",
  storageBucket: "wakatimesaveddata.appspot.com",
  messagingSenderId: "375670754245",
  appId: "1:375670754245:web:177a63d745fc4fab5a59ac",
};
export const firebaseApp = firebase.initializeApp(firebaseConfig);
