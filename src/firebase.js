import firebase from "firebase"
import "firebase/auth"
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDizX8L_u-9a7Z2rKedR92T-gItCHKyJjk",
    authDomain: "i-had-5-dollars.firebaseapp.com",
    databaseURL: "https://i-had-5-dollars.firebaseio.com",
    projectId: "i-had-5-dollars",
    storageBucket: "i-had-5-dollars.appspot.com",
    messagingSenderId: "686553006751",
    appId: "1:686553006751:web:f5a2da057b86bc47afd8aa",
    measurementId: "G-3WNEKQCY4K"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

export default firebase
