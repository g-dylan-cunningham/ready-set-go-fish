"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthContextProvider } from "./authContext";

export function Providers({ children }) {
  const queryClient = new QueryClient() // Instance of QueryClient
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>{children}</AuthContextProvider>
    </QueryClientProvider>
  );
}
