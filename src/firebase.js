import firebase from 'firebase'
    // Initialize Cloud Firestore through Firebase

    firebase.initializeApp({
        apiKey: FIREBASE_KEY,
        authDomain: "react-books-42aa1.firebaseapp.com",
        databaseURL: "https://react-books-42aa1.firebaseio.com",
        projectId: "react-books-42aa1",
        storageBucket: "react-books-42aa1.appspot.com",
        messagingSenderId: "1093912261475",
        appId: "1:1093912261475:web:3765a6ea729962e1491956"
    });
  

    const db = firebase.firestore();
    const auth = firebase.auth();

export { db, auth };
