import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAJnJxMuBEIbsppDqrdJBjDjilBq4f_WdE",
    authDomain: "web-app-e4eea.firebaseapp.com",
    databaseURL: "https://web-app-e4eea.firebaseio.com",
    projectId: "web-app-e4eea",
    storageBucket: "web-app-e4eea.appspot.com",
    messagingSenderId: "612497737463",
    appId: "1:612497737463:web:9ed14ef08bfc1214de75f2"
}

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;