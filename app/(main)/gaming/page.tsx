import { mockVideos } from "@/data/videos";
import VideoCard from "@/components/youtube/VideoCard";

export default function GamingPage() {
  return (
    <div className="px-4 py-6">
      <h1 className="text-2xl font-bold text-[#0f0f0f] mb-1">Gaming</h1>
      <p className="text-sm text-[#606060] mb-6">
        Popular gaming videos and live streams
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
        {mockVideos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
}
