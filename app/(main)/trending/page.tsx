import { mockVideos } from "@/data/videos";
import VideoCard from "@/components/youtube/VideoCard";

export default function TrendingPage() {
  // Sort by views (parse the view count string)
  const sorted = [...mockVideos].sort((a, b) => {
    const parse = (v: string) => {
      const num = parseFloat(v);
      if (v.includes("M")) return num * 1_000_000;
      if (v.includes("K")) return num * 1_000;
      return num;
    };
    return parse(b.views) - parse(a.views);
  });

  return (
    <div className="px-4 py-6">
      <h1 className="text-2xl font-bold text-[#0f0f0f] mb-1">Trending</h1>
      <p className="text-sm text-[#606060] mb-6">
        See what the world is watching
      </p>
      <div className="flex flex-col gap-4 max-w-[1200px]">
        {sorted.map((video) => (
          <VideoCard key={video.id} video={video} compact />
        ))}
      </div>
    </div>
  );
}
