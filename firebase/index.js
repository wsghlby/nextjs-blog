import * as firebase from "firebase"
// import firebase from 'firebase/app';

import { FirebaseConfig } from "./config";

if (!firebase.apps.length) {
    firebase.initializeApp(FirebaseConfig);
    // console.log('FirebaseConfig');
    // console.log(FirebaseConfig);

}


export default firebase;
// export const auth-action = firebase.auth-action();
// const databaseRef = firebase.database().ref();
// export const todosRef = databaseRef.child("todos");
