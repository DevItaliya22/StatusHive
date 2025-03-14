import { QueryProvider } from "@/components/providers/query-provider";
import { AppSidebar } from "./_components/sideBar";
export default async function Page({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryProvider>
      <div className="flex min-h-screen">
        <AppSidebar className="max-w-[20vw]" />
        <main className=" min-w-[80vw]">
          <div className="py-6">{children}</div>
        </main>
      </div>
    </QueryProvider>
  );
}
