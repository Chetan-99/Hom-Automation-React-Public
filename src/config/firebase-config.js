import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import Config from "./config.json";

const firebaseConfig = {
  apiKey: Config.apiKey,
  authDomain: Config.authDomain,
  databaseURL: Config.databaseURL,
  projectId: Config.projectId,
  storageBucket: Config.storageBucket,
  messagingSenderId: Config.messagingSenderId,
  appId: Config.appId,
  measurementId: Config.measurementId,
};

firebase.initializeApp(firebaseConfig);

export { firebase };
