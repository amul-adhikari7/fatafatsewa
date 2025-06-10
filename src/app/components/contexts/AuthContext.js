"use client";
import { createContext, useContext, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const { data: session, status } = useSession();
  const [authError, setAuthError] = useState("");

  const login = async (email, password) => {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setAuthError(result.error);
        return false;
      }
      return true;
    } catch (error) {
      setAuthError(error.message);
      return false;
    }
  };

  const register = async (name, email, password, phone) => {
    try {
      // Here you would typically make an API call to create the user
      // For now, we'll simulate a success
      const success = true;

      if (success) {
        // Auto login after registration
        return await login(email, password);
      }
      return false;
    } catch (error) {
      setAuthError(error.message);
      return false;
    }
  };

  const socialLogin = async (provider) => {
    try {
      await signIn(provider, { callbackUrl: window.location.origin });
      return true;
    } catch (error) {
      setAuthError(error.message);
      return false;
    }
  };

  const logout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <AuthContext.Provider
      value={{
        user: session?.user,
        isAuthenticated: !!session?.user,
        isLoading: status === "loading",
        login,
        register,
        socialLogin,
        logout,
        authError,
        setAuthError,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
