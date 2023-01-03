import { createContext, useState, useEffect } from "react";
import { createUserDocumentFromAuth, onAuthStateChangedListener } from "../utils/firebase/firebase.utils";

// as the actual value that needs to be accessed
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

// Component which wraps around any component that needs access to the context values
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
        if(user){
         createUserDocumentFromAuth(user);
        }
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  const value = { currentUser, setCurrentUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
