import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// import { seedDatabase } from "../seed"

const config = {apiKey: "AIzaSyDd_QIeVzgsKNB_SVQZWaEegGnXMaS7KCk",
authDomain: "instagram-96974.firebaseapp.com",
projectId: "instagram-96974",
storageBucket: "instagram-96974.appspot.com",
messagingSenderId: "963408903548",
appId: "1:963408903548:web:1fd4c87375c224683cb8f9"};

// seedDatabase(firebase)

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

export { firebase, FieldValue };

