import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firebase-firestore';

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
			    displayName: name
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
  }; 

  export default new firebase();
