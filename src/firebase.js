import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
const firebaseConfig = {
    apiKey: "AIzaSyASiLx96WjdWyqofp9-NvOjckNL2jjKU_Y",
    authDomain: "clone-app-fbaa5.firebaseapp.com",
    projectId: "clone-app-fbaa5",
    storageBucket: "clone-app-fbaa5.appspot.com",
    messagingSenderId: "669177986097",
    appId: "1:669177986097:web:58bb223fa3ac1e00262910",
    measurementId: "G-GH4SRD2DVV"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  export { db, auth };
  