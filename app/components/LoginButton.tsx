"use client";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export default function LoginButton() {
  return (
    <Button
      className="flex items-center gap-2"
      onClick={() => signIn()} // Important : Spécifie bien "github"
    >
      <span>Login</span>
    </Button>
  );
}
