import DashboardNav from "../components/DashboardNav";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="max-w-[1200px] mx-auto md:flex md:items-center md:gap-4 h-screen w-full mt-2 p-8">
      <DashboardNav />
      <div className="h-full w-full">{children}</div>
    </section>
  );
}
