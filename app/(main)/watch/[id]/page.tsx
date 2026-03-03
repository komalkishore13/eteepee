import { notFound } from "next/navigation";
import Image from "next/image";
import { CheckCircle2, ThumbsUp, ThumbsDown, Share2, Download, MoreHorizontal } from "lucide-react";
import VideoPlayer from "@/components/youtube/VideoPlayer";
import VideoCard from "@/components/youtube/VideoCard";
import { mockVideos } from "@/data/videos";

interface WatchPageProps {
  params: Promise<{ id: string }>;
}

export default async function WatchPage({ params }: WatchPageProps) {
  const { id } = await params;
  const video = mockVideos.find((v) => v.id === id);

  if (!video) notFound();

  const related = mockVideos.filter((v) => v.id !== id);

  return (
    <div className="flex flex-col xl:flex-row gap-6 px-4 py-4 max-w-[1600px] mx-auto">
      {/* Left: Player + info */}
      <div className="flex-1 min-w-0">
        {/* Video player */}
        <VideoPlayer youtubeId={video.youtubeId} title={video.title} />

        {/* Title */}
        <h1 className="mt-4 text-lg font-semibold text-[#0f0f0f] leading-snug">
          {video.title}
        </h1>

        {/* Channel row + actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-3">
          {/* Channel info */}
          <div className="flex items-center gap-3">
            <Image
              src={video.channelAvatar}
              alt={video.channelName}
              width={40}
              height={40}
              className="w-10 h-10 rounded-full"
              unoptimized
            />
            <div>
              <div className="flex items-center gap-1">
                <span className="text-sm font-semibold text-[#0f0f0f]">
                  {video.channelName}
                </span>
                {video.channelVerified && (
                  <CheckCircle2 size={14} className="text-[#606060]" strokeWidth={2.5} />
                )}
              </div>
              <span className="text-xs text-[#606060]">128K subscribers</span>
            </div>
            <button className="ml-2 px-4 py-2 bg-[#0f0f0f] text-white text-sm font-semibold rounded-full hover:bg-[#272727] transition">
              Subscribe
            </button>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center rounded-full bg-[#f2f2f2] overflow-hidden">
              <button className="flex items-center gap-1.5 px-4 py-2 hover:bg-[#e5e5e5] transition text-sm font-medium border-r border-[#d9d9d9]">
                <ThumbsUp size={18} />
                <span>{video.views.split(" ")[0]}</span>
              </button>
              <button className="flex items-center px-3 py-2 hover:bg-[#e5e5e5] transition">
                <ThumbsDown size={18} />
              </button>
            </div>
            <button className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#f2f2f2] hover:bg-[#e5e5e5] transition text-sm font-medium">
              <Share2 size={18} />
              Share
            </button>
            <button className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#f2f2f2] hover:bg-[#e5e5e5] transition text-sm font-medium">
              <Download size={18} />
              Download
            </button>
            <button className="flex items-center justify-center w-9 h-9 rounded-full bg-[#f2f2f2] hover:bg-[#e5e5e5] transition">
              <MoreHorizontal size={18} />
            </button>
          </div>
        </div>

        {/* Description box */}
        <div className="mt-4 bg-[#f2f2f2] rounded-xl p-3">
          <p className="text-sm font-semibold text-[#0f0f0f]">
            {video.views} &nbsp;·&nbsp; {video.uploadedAt}
          </p>
          <p className="mt-1 text-sm text-[#0f0f0f] leading-relaxed">
            {video.description ?? "No description provided."}
          </p>
        </div>

        {/* Comments header */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-[#0f0f0f] mb-4">
            248 Comments
          </h2>
          {/* Mock comment input */}
          <div className="flex gap-3 mb-6">
            <div className="w-9 h-9 rounded-full bg-[#FF0000] flex items-center justify-center text-white text-sm font-medium shrink-0">
              YT
            </div>
            <input
              type="text"
              placeholder="Add a comment..."
              className="flex-1 border-b border-[#ccc] py-1 text-sm outline-none focus:border-[#0f0f0f] bg-transparent"
            />
          </div>
          {/* Mock comments */}
          {[
            { name: "Alex Dev", ago: "3 days ago", text: "This is exactly what I needed. The explanation around the 15-minute mark finally made it click for me!", likes: "1.2K" },
            { name: "Sarah J.", ago: "1 week ago", text: "Best explanation I've seen on this topic. Subscribed instantly.", likes: "847" },
            { name: "TechEnthusiast99", ago: "2 days ago", text: "I've watched 5 videos on this and yours is by far the clearest. Keep it up!", likes: "312" },
          ].map((c) => (
            <div key={c.name} className="flex gap-3 mb-5">
              <div className="w-9 h-9 rounded-full bg-[#e5e5e5] flex items-center justify-center text-xs font-bold text-[#606060] shrink-0">
                {c.name.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-[#0f0f0f]">{c.name}</span>
                  <span className="text-xs text-[#606060]">{c.ago}</span>
                </div>
                <p className="text-sm text-[#0f0f0f] mt-0.5">{c.text}</p>
                <div className="flex items-center gap-3 mt-1.5">
                  <button className="flex items-center gap-1 text-xs text-[#606060] hover:text-[#0f0f0f]">
                    <ThumbsUp size={14} /> {c.likes}
                  </button>
                  <button className="flex items-center gap-1 text-xs text-[#606060] hover:text-[#0f0f0f]">
                    <ThumbsDown size={14} />
                  </button>
                  <button className="text-xs text-[#606060] font-medium hover:text-[#0f0f0f]">Reply</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Related videos */}
      <div className="xl:w-[400px] shrink-0">
        <h2 className="text-sm font-semibold text-[#0f0f0f] mb-3">Up next</h2>
        <div className="flex flex-col gap-3">
          {related.map((v) => (
            <VideoCard key={v.id} video={v} compact />
          ))}
        </div>
      </div>
    </div>
  );
}
