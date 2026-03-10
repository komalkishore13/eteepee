import { mockVideos } from "@/data/videos";
import VideoCard from "@/components/youtube/VideoCard";

export default function HistoryPage() {
  return (
    <div className="px-4 py-6 max-w-[1200px]">
      <h1 className="text-2xl font-bold text-[#0f0f0f] mb-6">Watch history</h1>
      <div className="flex flex-col gap-4">
        {mockVideos.map((video) => (
          <VideoCard key={video.id} video={video} compact />
        ))}
      </div>
    </div>
  );
}
