import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID || "",
      clientSecret: process.env.FACEBOOK_SECRET || "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        // Here you would typically fetch the user from your database
        // For now, we'll use a mock user for demonstration
        const mockUser = {
          id: "1",
          email: "user@example.com",
          password: await bcrypt.hash("password123", 10),
          name: "Test User",
        };

        const isValid = await bcrypt.compare(
          credentials.password,
          mockUser.password
        );

        if (isValid) {
          return {
            id: mockUser.id,
            email: mockUser.email,
            name: mockUser.name,
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/", // We're using a modal, so we'll handle sign-in in the main page
  },
  secret: process.env.NEXTAUTH_SECRET || "your-default-secret",
};

const handler = NextAuth(authOptions);

// In Next.js 13+ App Router, we need to export the handlers as named exports
export const GET = handler;
export const POST = handler;
