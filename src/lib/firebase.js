const firebaseConfig = {
    apiKey: "AIzaSyA_C0tKU78JQICf919-dTd56qNk2qjX_bs",
    authDomain: "instagram-clone-8dfd2.firebaseapp.com",
    projectId: "instagram-clone-8dfd2",
    storageBucket: "instagram-clone-8dfd2.appspot.com",
    messagingSenderId: "315780468379",
    appId: "1:315780468379:web:56970ce747e59f3966803e"
};

const firebase = window.firebase.initializeApp(firebaseConfig);
const { FieldValue } = window.firebase.firestore;

export { firebase, FieldValue };