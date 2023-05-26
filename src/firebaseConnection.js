import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyCEhUjoCu3JEZZE1M536v3o1xuvC64HgMA",
    authDomain: "task-hub-eb98f.firebaseapp.com",
    projectId: "task-hub-eb98f",
    storageBucket: "task-hub-eb98f.appspot.com",
    messagingSenderId: "308292746821",
    appId: "1:308292746821:web:a656d04c1c6a6ef8282d2c",
    measurementId: "G-3ZSLK9JRK6"
  };

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp)

export { db, auth };