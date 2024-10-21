"use client";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <div className="flex justify-end items-center mb-8">
      <Button
        className="flex bg-orange-500 hover:bg-orange-600 items-center gap-2"
        onClick={() => signOut({ callbackUrl: "/" })}
      >
        <LogOut className="text-white" />
        <span className="lg:block hidden">Déconnexion</span>
      </Button>
    </div>
  );
}
