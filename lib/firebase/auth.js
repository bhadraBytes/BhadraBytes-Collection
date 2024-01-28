// auth.js

import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from './firebaseConfig'; // Import directly from firebaseConfig
import { useStateContext } from '../../context/StateContext'; // Provide the correct path

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const { setCartItems, setTotalPrice, setTotalQuantities, setWishlistItems } = useStateContext();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }

      setLoading(false); // Set loading to false after checking authentication state
    });
  
    return () => unsubscribe();
  }, []);

  const clearUserData = () => {
    // Clear cart and wishlist data when the user logs out
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
    setWishlistItems([]);
  };

  const signIn = async (email, password) => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const signUp = async (email, password) => {
    try {
      await auth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
      clearUserData();
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ auth,user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
