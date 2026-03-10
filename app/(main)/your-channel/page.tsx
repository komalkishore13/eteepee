import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";

export default async function YourChannelPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  const user = token ? verifyToken(token) : null;
  const initials = user?.username?.slice(0, 2).toUpperCase() ?? "YT";

  return (
    <div className="px-4 py-6 max-w-[1000px] mx-auto">
      {/* Channel banner */}
      <div className="h-32 sm:h-44 rounded-xl bg-gradient-to-r from-[#065fd4] to-[#3b82f6]" />

      {/* Channel info */}
      <div className="flex items-center gap-4 mt-4">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-bold shrink-0"
          style={{ backgroundColor: "#FF0000" }}
        >
          {initials}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-[#0f0f0f]">
            {user?.username ?? "Your Channel"}
          </h1>
          <p className="text-sm text-[#606060]">
            {user?.email ?? "Sign in to see your channel"}
          </p>
          <p className="text-sm text-[#606060]">0 subscribers · 0 videos</p>
        </div>
      </div>

      {/* Empty state */}
      <div className="flex flex-col items-center justify-center py-20 text-center mt-8 border-t border-[#e5e5e5]">
        <p className="text-lg font-medium text-[#0f0f0f]">Upload a video to get started</p>
        <p className="text-sm text-[#606060] mt-1">
          Start sharing your story and connecting with viewers
        </p>
      </div>
    </div>
  );
}
