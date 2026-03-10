import { mockVideos } from "@/data/videos";
import VideoCard from "@/components/youtube/VideoCard";

export default function NewsPage() {
  return (
    <div className="px-4 py-6">
      <h1 className="text-2xl font-bold text-[#0f0f0f] mb-1">News</h1>
      <p className="text-sm text-[#606060] mb-6">
        Top stories and breaking news
      </p>
      <div className="flex flex-col gap-4 max-w-[1200px]">
        {mockVideos.map((video) => (
          <VideoCard key={video.id} video={video} compact />
        ))}
      </div>
    </div>
  );
}
