import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged, // returns back a listener
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

// GoogleAuthProvider is class. You can have different providers for different use cases(login with FB etc.)
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  promp: "select_account",
});

// auth keeps track of the authentication state of the entire application, even when we re-direct.
// It is the only way to keep track if user navigates away from the application
export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

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
        ...additionalInformation,
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

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

// always listens when a user's auth state changes.(signed In or signed Out)
export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
