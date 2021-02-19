import { firebase, FieldValue } from "./lib/firebase";
import FirebaseContext from "./context/firebase";

function App() {
  return (
    <FirebaseContext.Provider value ={{ firebase, FieldValue }}>
      <h1 className="text-red-500">Hello World!</h1>
    </FirebaseContext.Provider>
  );
}

export default App;

// < !--The core Firebase JS SDK is always required and must be listed first-- >
// <script src="https://www.gstatic.com/firebasejs/8.2.8/firebase-app.js"></script>

// <!--TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries -->

// <script>
//   // Your web app's Firebase configuration
//   var firebaseConfig = {
//     apiKey: "AIzaSyA_C0tKU78JQICf919-dTd56qNk2qjX_bs",
//     authDomain: "instagram-clone-8dfd2.firebaseapp.com",
//     projectId: "instagram-clone-8dfd2",
//     storageBucket: "instagram-clone-8dfd2.appspot.com",
//     messagingSenderId: "315780468379",
//     appId: "1:315780468379:web:56970ce747e59f3966803e"
//   };
//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);
// </script>