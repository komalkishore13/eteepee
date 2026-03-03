import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";
import Header from "@/components/youtube/Header";
import Sidebar from "@/components/youtube/Sidebar";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  const user = token ? verifyToken(token) : null;

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header user={user} />
      <div className="flex flex-1 overflow-hidden pt-14">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-white">
          {children}
        </main>
      </div>
    </div>
  );
}
