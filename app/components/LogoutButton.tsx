"use client";
import { Button } from "@/components/ui/button";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <Button
      className="flex items-center gap-2"
      onClick={() => signOut()} // Important : Spécifie bien "github"
    >
      <span>Logout</span>
    </Button>
  );
}
