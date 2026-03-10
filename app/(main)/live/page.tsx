import { mockVideos } from "@/data/videos";
import VideoCard from "@/components/youtube/VideoCard";

export default function LivePage() {
  return (
    <div className="px-4 py-6">
      <h1 className="text-2xl font-bold text-[#0f0f0f] mb-1">Live</h1>
      <p className="text-sm text-[#606060] mb-6">
        Live streams happening now
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
        {mockVideos.slice(0, 8).map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
}
