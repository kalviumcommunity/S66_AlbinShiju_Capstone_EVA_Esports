import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyC93HXkrHyjlSmGgc8H0hYr8kbIf_yjcq8",
  authDomain: "eva-esports.firebaseapp.com",
  projectId: "eva-esports",
  storageBucket: "eva-esports.appspot.com", // <-- typo fix
  messagingSenderId: "699057319483",
  appId: "1:699057319483:web:0c67740f97a3c126b4b61e",
  measurementId: "G-VXSCX7CZTK"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const auth = getAuth();

// Create the context
const AuthContext = createContext();

// This PROVIDER should wrap <App />
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => useContext(AuthContext);
