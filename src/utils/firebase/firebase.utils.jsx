import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAN0C_VnmeAUe4WopQBN0xWs_qtRCD5nEE",
  authDomain: "e-commerce-webb.firebaseapp.com",
  projectId: "e-commerce-webb",
  storageBucket: "e-commerce-webb.appspot.com",
  messagingSenderId: "180618110408",
  appId: "1:180618110408:web:59ed878c8e3c6057794cfd",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// GoogleAuthProvider is class
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  promp: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      alert("error creating the user", error.message);
    }

    return userDocRef;
  }

  // if user data does not esxist
  // create / set the document with the data from userAuth in my collection

  // if user data exists
  // return userDocRef
};
