import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import dbConnection from "@/lib/db";
import User from "@/database/models/Users";

const authOptions = {
  providers: [
    // Login con email y password
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // Conexión a MongoDB
        await dbConnection();

        // Buscar usuario
        const user = await User.findOne({ email: credentials.email });
        if (!user) return null;

        // Validar contraseña (en texto plano por ahora, idealmente usar bcrypt)
        if (user.password !== credentials.password) return null;

        // Retornar objeto de usuario para NextAuth
        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name || user.email,
        };
      },
    }),

    // Login con Google
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  pages: {
    signIn: "/login", // Página de login
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const { handlers } = NextAuth(authOptions);
export const { GET, POST } = handlers;
