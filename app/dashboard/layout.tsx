import { getUser } from "@/lib/actionsUsers";
import DashboardNav from "../components/DashboardNav";
import LogoutButton from "../components/LogoutButton";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  if (!user) {
    return <div>Veuillez vous connectez</div>;
  }
  if (!user?.stripeCustomerId) {
    const stripeCustomer = await stripe.customers.create({
      email: user?.email as string,
    });
    await prisma.user.update({
      where: {
        id: user.id as string,
      },
      data: {
        stripeCustomerId: stripeCustomer.id as string,
      },
    });
  }

  return (
    <section className="max-w-[1200px] mx-auto md:flex md:items-center md:gap-4 h-screen w-full mt-2 p-8">
      <DashboardNav />
      <div className="h-full w-full">
        <LogoutButton />
        {children}
        <ToastContainer />
      </div>
    </section>
  );
}
