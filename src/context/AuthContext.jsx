import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../Database/firebase.config";
// step:1 Define the context
const AuthContext = createContext(); //************

// step:2 create and export provider function

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const[loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false)
      console.log(currentUser);
    });
    return () => unsubscribe();
  }, []);
  return (
    <AuthContext.Provider value={{ user,loading }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);