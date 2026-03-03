"use client";

import { useState } from "react";
import CategoryPills from "@/components/youtube/CategoryPills";
import VideoCard from "@/components/youtube/VideoCard";
import { mockVideos } from "@/data/videos";

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredVideos =
    activeCategory === "All"
      ? mockVideos
      : mockVideos.filter((v) => v.category === activeCategory);

  return (
    <div className="flex flex-col h-full">
      {/* Category pills — sticky below header */}
      <div className="sticky top-0 z-10 bg-white border-b border-[#e5e5e5] px-4 py-2">
        <CategoryPills active={activeCategory} onSelect={setActiveCategory} />
      </div>

      {/* Video grid */}
      <div className="px-4 py-4">
        {filteredVideos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p className="text-lg font-medium text-[#0f0f0f]">No videos in this category</p>
            <button
              onClick={() => setActiveCategory("All")}
              className="mt-3 text-sm text-[#065fd4] hover:underline"
            >
              Show all videos
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
            {filteredVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
