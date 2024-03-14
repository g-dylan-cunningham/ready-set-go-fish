'use client';

import { createContext, useReducer, useEffect } from 'react';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'LOGIN':
      return {
        user:  { ...payload?.user },
        token: payload?.token,
        store: { ...payload?.store },
      };
    case 'LOGOUT':
      return { user: {}, token: null, store: {} };
    case 'STORE_LOGIN':
      return {
        ...state,
        token: payload?.token,
        store: { ...payload?.store },
      };
    default:
      return state;
  }
}

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {});

  useEffect(() => {
    dispatch({ type: 'LOGIN', payload: JSON.parse(localStorage.getItem('details'))});
  }, [])
  console.log('AuthContext state: ', state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}