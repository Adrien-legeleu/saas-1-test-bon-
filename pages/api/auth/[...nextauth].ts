import NextAuth from "next-auth";
import { authConfig } from "@/auth"; // Chemin vers ton fichier auth.ts

export default NextAuth(authConfig);
