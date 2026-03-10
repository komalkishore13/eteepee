import { mockVideos } from "@/data/videos";
import VideoCard from "@/components/youtube/VideoCard";
import { ThumbsUp } from "lucide-react";

export default function LikedVideosPage() {
  const likedVideos = mockVideos.slice(0, 6);

  return (
    <div className="px-4 py-6 max-w-[1200px]">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-[#065fd4] flex items-center justify-center">
          <ThumbsUp size={20} className="text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-[#0f0f0f]">Liked videos</h1>
          <p className="text-sm text-[#606060]">{likedVideos.length} videos</p>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {likedVideos.map((video) => (
          <VideoCard key={video.id} video={video} compact />
        ))}
      </div>
    </div>
  );
}
