"use client";

import Link from "next/link";
import React from "react";
import { ModeToggle } from "./toggle-mode";

export default function Nav() {
  return (
    <nav className="max-w-[1300px] w-full mx-auto h-[80px] flex items-center justify-between p-5 border-b border-gray-300">
      <div>
        <Link href="/">SAAS</Link>
      </div>
      <div className="flex items-center gap-4">
        <ModeToggle />
      </div>
    </nav>
  );
}
