'use client';

import { createContext, useReducer, useEffect } from 'react';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  // debugger
  const { type, payload } = action;
  switch (type) {
    case 'LOGIN':
      return {
        ...state,
        user:  { ...payload?.user },
        token: payload?.token,
        ...(payload?.store && {store: { ...payload.store }}),
      };
    case 'LOGOUT':
      return { user: {}, token: null, store: {} };
    case 'STORE_LOGIN':
      const newState = {
        ...state,
        token: payload?.token,
        // store: { ...payload?.store },
        // ...(payload.user && {user: { ...payload.user }}),
        ...(payload.store && {store: { ...payload.store }}),
      }
      console.log('STORE_LOGIN', payload, state, newState)
      return newState;
    default:
      return state;
  }
}

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {});

  useEffect(() => {
    dispatch({ type: 'LOGIN', payload: JSON.parse(localStorage.getItem('details'))});
  }, [])
  // console.log('AuthContext state: ', state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}