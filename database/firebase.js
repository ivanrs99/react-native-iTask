import firebase from 'firebase/app'
import "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyAdUP7BA5E2QV3FLFdYpd4dFxyqg6Ej9EI",
    authDomain: "itask-6b5bd.firebaseapp.com",
    databaseURL: "https://itask-6b5bd-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "itask-6b5bd",
    storageBucket: "itask-6b5bd.appspot.com",
    messagingSenderId: "1078365011939",
    appId: "1:1078365011939:web:8966b5efc81545139b2ad6"
  };

  firebase.initializeApp(firebaseConfig);

  export default firebase;