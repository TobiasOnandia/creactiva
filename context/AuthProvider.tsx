"use client";
import { User } from "@supabase/supabase-js";
import { createContext, useContext } from "react";

export const AuthContext = createContext<User | null>(null);

export const AuthProvider = ({
  children,
  auth,
}: {
  children: React.ReactNode;
  auth: User | null;
}) => {
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const auth = useContext(AuthContext);
  return auth;
};
