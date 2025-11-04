import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  basePath: "/api/auth", 
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = {
          id: "1",
          name: "Admin",
          email: "admin@example.com",
        };

        if (
          credentials?.email === "admin@example.com" &&
          credentials?.password === "123456"
        ) {
          return user; 
        }

        console.log("Credenciales incorrectas:", credentials);
        return null; 
      },
    }),
  ],
});

export const { GET, POST } = handlers;