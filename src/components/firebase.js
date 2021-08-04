import firebase from 'firebase';
import 'firebase/auth';

const  firebaseConfig = {
    apiKey: "AIzaSyC5Kf2tfQ_yPL2xmAHaaz02EnMC3oNFW48",
    authDomain: "disneyplus-clone-7c64f.firebaseapp.com",
    projectId: "disneyplus-clone-7c64f",
    storageBucket: "disneyplus-clone-7c64f.appspot.com",
    messagingSenderId: "407766736932",
    appId: "1:407766736932:web:76460efb9d02b708e9b8b1"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  const storage = firebase.storage();



  export {auth,provider, storage};
  export default db;