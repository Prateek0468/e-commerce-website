import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

const SignIn = () => {
  // call to any database will be asynchronous
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  return (
    <div>
      <h1>Hey This is signin</h1>
      <button onClick={logGoogleUser}>Sign In with Google popup</button>
    </div>
  );
};

export default SignIn;
