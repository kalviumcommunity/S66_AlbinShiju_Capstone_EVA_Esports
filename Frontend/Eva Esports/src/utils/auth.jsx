import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC93HXkrHyjlSmGgc8H0hYr8kbIf_yjcq8",
  authDomain: "eva-esports.firebaseapp.com",
  projectId: "eva-esports",
  storageBucket: "eva-esports.firebasestorage.app",
  messagingSenderId: "699057319483",
  appId: "1:699057319483:web:0c67740f97a3c126b4b61e",
  measurementId: "G-VXSCX7CZTK"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const auth = getAuth();

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
