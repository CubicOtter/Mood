import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { decode, encode } from 'base-64'

// Firestore tutorial: https://firebase.google.com/docs/firestore/quickstart#web


// Data to retrieve the firebase server
// Directly obtained through the firebase website
const firebaseConfig = {
    apiKey: "AIzaSyA6rdHT_GqvBAyupfwCwerrZp0CNM1ZFC8",
    authDomain: "mood-firebase-ba790.firebaseapp.com",
    databaseURL: "https://mood-firebase-ba790.firebaseio.com",
    projectId: "mood-firebase-ba790",
    storageBucket: "mood-firebase-ba790.appspot.com",
    messagingSenderId: "652979216131",
  }; 

  // Utility class for Firebase
  class firebase {
        constructor() {
            app.initializeApp(firebaseConfig);
            this.auth = app.auth();
            this.db = app.firestore();

            // There is a bug encoutnered while logging the firestore function
            // Is it resolve by the following:
            global.crypto = require("@firebase/firestore");
            global.crypto.getRandomValues = byteArray => { for (let i = 0; i < byteArray.length; i++) { byteArray[i] = Math.floor(256 * Math.random()); } }
            if (!global.btoa) { global.btoa = encode; }
            if (!global.atob) { global.atob = decode; }
        };

        login(email, password) {
            return this.auth.signInWithEmailAndPassword(email, password);
        };

        logout() {
            return this.auth.signOut();
        };

        async register(name, email, password) {
            await this.auth.createUserWithEmailAndPassword(email, password)
		    return this.auth.currentUser.updateProfile({
                displayName: name,
                displayEmail: email
		    });
        };

        isInitialized() {
            return new Promise(resolve => {
                this.auth.onAuthStateChanged(resolve)
            });
        };

        getCurrentUsername() {
            return this.auth.currentUser && this.auth.currentUser.displayName; // return name of user if user exists
        };

        getCurrentUserEmail() {
            return this.auth.currentUser && this.auth.currentUser.email; // return email of user if user exists
        };
        

        // How is cosntructed the database:
        // To each user is assign a collection which name is the user email
        // Each time an user rate his/her mood, a new document is created whith the corresponding data
        registerMood(rating, comment){
            this.db.collection(this.auth.currentUser.email).add({
                Date: Date.now(),
                Rate: rating,
                Comment: comment,
                
            })
            .then(function(docRef) {
                console.log("Document written with ID: ", docRef.id); // Get generated id for the new document
            })           
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });
        };
        
  }; 

  export default new firebase();
