// auth.config.ts
import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  basePath: "/api/auth", // ← AGREGA ESTO
  pages: {
    signIn: "/login",
    error: "/login", 
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");

      if (isOnDashboard && !isLoggedIn) return false;
      return true; 
    },
  },
  providers: [],
} satisfies NextAuthConfig;