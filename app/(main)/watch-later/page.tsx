import { mockVideos } from "@/data/videos";
import VideoCard from "@/components/youtube/VideoCard";
import { Clock } from "lucide-react";

export default function WatchLaterPage() {
  const watchLater = mockVideos.slice(2, 10);

  return (
    <div className="px-4 py-6 max-w-[1200px]">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-[#0f0f0f] flex items-center justify-center">
          <Clock size={20} className="text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-[#0f0f0f]">Watch later</h1>
          <p className="text-sm text-[#606060]">{watchLater.length} videos</p>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {watchLater.map((video) => (
          <VideoCard key={video.id} video={video} compact />
        ))}
      </div>
    </div>
  );
}
