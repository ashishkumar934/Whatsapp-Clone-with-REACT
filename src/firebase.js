import firebase from "firebase";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDAB7ilX5BWMNL6EMzlQ1_t9g0-4hH8k7Y",
  authDomain: "mywhatsapp-28281.firebaseapp.com",
  databaseURL: "https://mywhatsapp-28281.firebaseio.com",
  projectId: "mywhatsapp-28281",
  storageBucket: "mywhatsapp-28281.appspot.com",
  messagingSenderId: "1016402551140",
  appId: "1:1016402551140:web:1e2f09f2ebda9827cf1a71",
  measurementId: "G-8R842G2YF4",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth(); // for authentication
const provider = new firebase.auth.GoogleAuthProvider(); // for the google authentication

export { auth, provider };
export default db;
