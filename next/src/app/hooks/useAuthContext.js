import { AuthContext } from "../context/authContext";
import { useContext } from 'react';

export default function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error('useAuthContext must be inside its provider')
  }
  return context;
}
