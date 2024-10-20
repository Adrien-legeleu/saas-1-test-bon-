"use client";
import { NotebookText, Settings, CreditCard } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function DashboardNav() {
  const pathname = usePathname();
  const menuDashboard = [
    { name: "Notes", icon: NotebookText, path: "/dashboard/notes" },
    { name: "Settings", icon: Settings, path: "/dashboard/settings" },
    { name: "Payment", icon: CreditCard, path: "/dashboard/payment" },
  ];

  return (
    <nav className="flex md:flex-col md:h-full md:w-16 w-full lg:w-40 gap-2">
      {menuDashboard.map((link, idx) => {
        const isActive = pathname?.startsWith(link.path);
        return (
          <Link href={link.path} id={"link:" + idx}>
            <div
              className={`flex items-center justify-center lg:justify-start gap-2 cursor-pointer lg:p-3 p-2 hover:bg-orange-500 hover:bg-opacity-50 hover:text-white text-sm fond-bold rounded-md ${
                isActive && "bg-orange-500 text-white"
              }`}
            >
              <link.icon className="w-4" />
              <span className="hidden lg:block">{link.name}</span>
            </div>
          </Link>
        );
      })}
    </nav>
  );
}
