import Rebase from 're-base'
import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBAm-UVu-WmpFlFWE6FhPb_qqKmXrYrq64",
    authDomain: "catch-of-the-day-ih.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-ih.firebaseio.com",
  });

  const base = Rebase.createClass(firebaseApp.database());

  // this is a named export
  export {firebaseApp};

  // this is a default export
  export default base;