'use client';

import { createContext, useReducer, useEffect } from 'react';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'LOGIN':
      return { user: payload };
    case 'LOGOUT':
      return { user: null };
    default:
      return state;
  }
}

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {});

  useEffect(() => {
    dispatch({ type: 'LOGIN', payload: JSON.parse(localStorage.getItem('user'))});
  }, [])
  console.log('AuthContext state: ', state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}