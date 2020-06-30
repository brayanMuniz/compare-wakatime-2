import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyA3RsY5YxNPsEogNCUDn2uGgy4-68AbRAY",
  authDomain: "wakatime-data.firebaseapp.com",
  databaseURL: "https://wakatime-data.firebaseio.com",
  projectId: "wakatime-data",
  storageBucket: "wakatime-data.appspot.com",
  messagingSenderId: "863082391279",
  appId: "1:863082391279:web:ebfdce1accf2ee6ed95d1a",
};
export const firebaseApp = firebase.initializeApp(firebaseConfig);
