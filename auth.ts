import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email"; // Correction ici

import { prisma } from "./lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

const githubId = process.env.AUTH_GITHUB_ID;
const githubSecret = process.env.AUTH_GITHUB_SECRET;
const googleId = process.env.AUTH_GOOGLE_ID;
const googleSecret = process.env.AUTH_GOOGLE_SECRET;
const emailServer = process.env.EMAIL_SERVER;
const emailFrom = process.env.EMAIL_FROM;

if (!githubId || !githubSecret) {
  throw new Error(
    "githubId or githubSecret are not defined in the environment"
  );
}
if (!googleId || !googleSecret) {
  throw new Error(
    "googleId or googleSecret are not defined in the environment"
  );
}
if (!emailServer || !emailFrom) {
  throw new Error(
    "emailFrom or emailServer are not defined in the environment"
  );
}

export const authConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: githubId,
      clientSecret: githubSecret,
    }),
    GoogleProvider({
      clientId: googleId,
      clientSecret: googleSecret,
    }),
    EmailProvider({
      // Utilisation d'EmailProvider
      server: emailServer,
      from: emailFrom,
    }),
  ],

  callbacks: {
    async session({ session, user }: any) {
      session.user.id = user.id;
      console.log("Session:", session);
      return session;
    },
  },
};

export default NextAuth(authConfig);
