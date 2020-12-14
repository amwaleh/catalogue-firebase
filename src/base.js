import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore"



export const config = {
  apiKey: "AIzaSyBU5XP31-PjeYG99SNFCDszzQMM8zvWH60",
  authDomain: "catalog-pbp.firebaseapp.com",
  databaseURL: "https://catalog-pbp-default-rtdb.firebaseio.com",
  projectId: "catalog-pbp",
  storageBucket: "catalog-pbp.appspot.com",
  messagingSenderId: "19413046548",
  appId: "1:19413046548:web:96cc3fcdcaf98f37fc1e01",
  measurementId: "G-QWJ8W7BG7R"
};


export default firebase.initializeApp(config);

