import Image from "next/image";
import LogoutButton from "./LogoutButton";
import { getRequiredAuthSession } from "@/lib/auth";

export const User = async () => {
  const session = await getRequiredAuthSession();

  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <div className="card-body">
        <div className="avatar">
          <div className="w-24 h-24 ">
            <Image
              width={50}
              height={50}
              className="rounded-full"
              src={session?.user.image ?? ""}
              alt={`avatar de ${session.user.name}`}
            />
          </div>
        </div>
        <h2 className="card-title">{session.user.name}</h2>
        <p>{session.user.email}</p>
        <p className="text-xs italic text-gray-300">{session.user.id}</p>
        <div className="card-actions justify-end">
          <LogoutButton />
        </div>
      </div>
    </div>
  );
};
