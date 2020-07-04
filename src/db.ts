import { initializeApp, auth } from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyA3RsY5YxNPsEogNCUDn2uGgy4-68AbRAY",
  authDomain: "wakatime-data.firebaseapp.com",
  databaseURL: "https://wakatime-data.firebaseio.com",
  projectId: "wakatime-data",
  messagingSenderId: "863082391279",
  appId: "1:863082391279:web:ebfdce1accf2ee6ed95d1a",
};

initializeApp(firebaseConfig);

export const firebaseAuth = auth();
