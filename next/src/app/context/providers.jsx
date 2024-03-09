'use client';

import { AuthContextProvider } from './authContext';

export function Providers({ children }) {
  return (
    <AuthContextProvider>{children}</AuthContextProvider>
  );
}