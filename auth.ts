import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import { prisma } from "./lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
// Assure-toi que c'est bien le chemin vers ton client Prisma

const githubId = process.env.AUTH_GITHUB_ID;
const githubSecret = process.env.AUTH_GITHUB_SECRET;
const googleId = process.env.AUTH_GOOGLE_ID;
const googleSecret = process.env.AUTH_GOOGLE_SECRET;

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

export const authConfig = {
  // Utilisation du Prisma Adapter pour gérer les utilisateurs
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
  ],

  callbacks: {
    async session({ session, user }: any) {
      // Récupère l'ID de l'utilisateur depuis Prisma et l'ajoute à la session
      session.user.id = user.id;
      console.log("Session:", session);
      return session;
    },
  },
};

export default NextAuth(authConfig);
