import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCN7HgymCKctXhDr27VKtJbV9mvacw5nZo",
  authDomain: "dbmsflow.firebaseapp.com",
  projectId: "dbmsflow",
  storageBucket: "dbmsflow.firebasestorage.app",
  messagingSenderId: "786472933671",
  appId: "1:786472933671:web:1a0dc836c24fb6b36ff102",
  measurementId: "G-88597PCWRD"
};

const firebaseApp = initializeApp(firebaseConfig);
// const db = firebaseApp.firestore();
const analytics = getAnalytics(firebaseApp);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export { auth, provider, analytics};
// export default db;