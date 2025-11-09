import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import { comparePasswords } from "./lib/auth-utils";

export const { handlers, signIn, signOut, auth } = NextAuth({
  useSecureCookies: true,
  trustHost: true,
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "credentials",
      type: "credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error("Invalid credentials");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email as string,
          },
        });

        if (!user) {
          throw new Error("User not found");
        }

        const isPasswordMatched = comparePasswords(
          credentials.password as string,
          user.hashedPassword as string
        );

        if (!isPasswordMatched) {
          throw new Error("Wrong password");
        }

        return user;
      },
    }),
  ],
});
