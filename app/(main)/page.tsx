import type { Metadata } from "next";
import CategoryPills from "@/components/youtube/CategoryPills";
import VideoCard from "@/components/youtube/VideoCard";
import { mockVideos } from "@/data/videos";

export const metadata: Metadata = {
  title: "YouTube",
  description: "Enjoy the videos and music you love, upload original content, and share it all with friends, family, and the world on YouTube.",
};

export default function HomePage() {
  return (
    <div className="flex flex-col h-full">
      {/* Category pills — sticky below header */}
      <div className="sticky top-0 z-10 bg-white border-b border-[#e5e5e5] px-4 py-2">
        <CategoryPills />
      </div>

      {/* Video grid */}
      <div className="px-4 py-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
          {mockVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>
    </div>
  );
}
