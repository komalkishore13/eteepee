"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { mockVideos } from "@/data/videos";
import {
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Share2,
  MoreVertical,
  ChevronUp,
  ChevronDown,
  Music2,
  Volume2,
  VolumeX,
} from "lucide-react";
import Image from "next/image";
import { useSidebar } from "@/components/youtube/SidebarContext";

const likeCounts = [47200, 128400, 892100, 23400, 445000, 67800, 311200, 88400, 1230000, 56700, 234500, 765400, 2100000, 43200, 189300, 423100, 112400, 945300, 87600, 321000];
const commentCounts = [1240, 5670, 23400, 890, 8900, 2340, 6780, 1890, 34500, 2100, 7890, 12400, 45600, 1560, 4320, 8900, 3210, 21000, 2340, 9870];

const shorts = mockVideos.map((video, i) => ({
  ...video,
  likes: likeCounts[i] ?? 50000,
  comments: commentCounts[i] ?? 2000,
}));

function formatNum(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toString();
}

export default function ShortsPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [liked, setLiked] = useState<Set<string>>(new Set());
  const [disliked, setDisliked] = useState<Set<string>>(new Set());
  const [muted, setMuted] = useState(true);
  const { collapsed, setCollapsed } = useSidebar();
  const prevCollapsed = useRef(collapsed);

  // Auto-collapse sidebar on mount, restore on leave
  useEffect(() => {
    prevCollapsed.current = collapsed;
    setCollapsed(true);
    return () => setCollapsed(prevCollapsed.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setCollapsed]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => Math.min(prev + 1, shorts.length - 1));
  }, []);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") goToNext();
      if (e.key === "ArrowUp") goPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goToNext, goPrev]);

  const current = shorts[currentIndex];
  const isLiked = liked.has(current.id);
  const isDisliked = disliked.has(current.id);

  const toggleLike = () => {
    const id = current.id;
    setLiked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
        setDisliked((pd) => { const nd = new Set(pd); nd.delete(id); return nd; });
      }
      return next;
    });
  };

  const toggleDislike = () => {
    const id = current.id;
    setDisliked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
        setLiked((pl) => { const nl = new Set(pl); nl.delete(id); return nl; });
      }
      return next;
    });
  };

  return (
    <div className="h-full bg-[#0f0f0f] flex items-center justify-center overflow-hidden">
      <div className="flex items-center gap-4">

        {/* Up/Down navigation — left of player */}
        <div className="flex flex-col gap-2">
          <button
            onClick={goPrev}
            disabled={currentIndex === 0}
            className="w-10 h-10 rounded-full bg-[#272727] text-white flex items-center justify-center transition-colors disabled:opacity-20 hover:bg-[#3d3d3d] disabled:hover:bg-[#272727]"
            aria-label="Previous short"
          >
            <ChevronUp size={20} />
          </button>
          <button
            onClick={goToNext}
            disabled={currentIndex === shorts.length - 1}
            className="w-10 h-10 rounded-full bg-[#272727] text-white flex items-center justify-center transition-colors disabled:opacity-20 hover:bg-[#3d3d3d] disabled:hover:bg-[#272727]"
            aria-label="Next short"
          >
            <ChevronDown size={20} />
          </button>
        </div>

        {/* Video player */}
        <div className="relative w-[360px] aspect-[9/16] bg-black rounded-2xl overflow-hidden shadow-2xl">
          {/* Blurred thumbnail as ambient background */}
          <Image
            src={current.thumbnail}
            alt=""
            fill
            sizes="360px"
            className="object-cover scale-125 blur-2xl opacity-40"
            unoptimized
          />

          {/* Video iframe centered */}
          <div className="absolute inset-0 flex items-center">
            <iframe
              key={`${current.youtubeId}-${currentIndex}`}
              src={`https://www.youtube-nocookie.com/embed/${current.youtubeId}?autoplay=1&mute=${muted ? 1 : 0}&loop=1&playlist=${current.youtubeId}&controls=0&rel=0&showinfo=0&modestbranding=1`}
              className="w-full aspect-video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Bottom gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
          {/* Top gradient */}
          <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />

          {/* Mute toggle */}
          <button
            onClick={() => setMuted((m) => !m)}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/70 transition-colors z-10"
            aria-label={muted ? "Unmute" : "Mute"}
          >
            {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>

          {/* Bottom info overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
            {/* Channel row */}
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-white/30 shrink-0">
                <Image
                  src={current.channelAvatar}
                  alt={current.channelName}
                  width={32}
                  height={32}
                  unoptimized
                />
              </div>
              <span className="text-white font-semibold text-sm">{current.channelName}</span>
              {current.channelVerified && (
                <svg className="w-3.5 h-3.5 text-white/70 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              )}
              <button className="ml-1 px-3 py-0.5 border border-white/80 text-white text-xs rounded-full font-semibold hover:bg-white/20 transition-colors">
                Subscribe
              </button>
            </div>

            {/* Title */}
            <p className="text-white text-sm font-medium line-clamp-2 leading-5">
              {current.title}
            </p>

            {/* Music row */}
            <div className="flex items-center gap-1 mt-1.5 text-white/60 text-xs">
              <Music2 size={11} />
              <span className="truncate">Original audio · {current.channelName}</span>
            </div>
          </div>
        </div>

        {/* Right action buttons */}
        <div className="flex flex-col items-center gap-5">
          {/* Like */}
          <div className="flex flex-col items-center gap-1">
            <button
              onClick={toggleLike}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                isLiked
                  ? "bg-white text-black"
                  : "bg-[#272727] text-white hover:bg-[#3d3d3d]"
              }`}
              aria-label="Like"
            >
              <ThumbsUp size={22} fill={isLiked ? "currentColor" : "none"} />
            </button>
            <span className="text-white text-xs font-medium">
              {formatNum(current.likes + (isLiked ? 1 : 0))}
            </span>
          </div>

          {/* Dislike */}
          <div className="flex flex-col items-center gap-1">
            <button
              onClick={toggleDislike}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                isDisliked
                  ? "bg-white text-black"
                  : "bg-[#272727] text-white hover:bg-[#3d3d3d]"
              }`}
              aria-label="Dislike"
            >
              <ThumbsDown size={22} fill={isDisliked ? "currentColor" : "none"} />
            </button>
            <span className="text-white text-xs font-medium">Dislike</span>
          </div>

          {/* Comments */}
          <div className="flex flex-col items-center gap-1">
            <button
              className="w-12 h-12 rounded-full bg-[#272727] text-white hover:bg-[#3d3d3d] flex items-center justify-center transition-colors"
              aria-label="Comments"
            >
              <MessageCircle size={22} />
            </button>
            <span className="text-white text-xs font-medium">{formatNum(current.comments)}</span>
          </div>

          {/* Share */}
          <div className="flex flex-col items-center gap-1">
            <button
              className="w-12 h-12 rounded-full bg-[#272727] text-white hover:bg-[#3d3d3d] flex items-center justify-center transition-colors"
              aria-label="Share"
            >
              <Share2 size={22} />
            </button>
            <span className="text-white text-xs font-medium">Share</span>
          </div>

          {/* More */}
          <button
            className="w-12 h-12 rounded-full bg-[#272727] text-white hover:bg-[#3d3d3d] flex items-center justify-center transition-colors"
            aria-label="More options"
          >
            <MoreVertical size={22} />
          </button>

          {/* Spinning channel avatar (music disc) */}
          <div
            className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/20 animate-spin"
            style={{ animationDuration: "4s" }}
          >
            <Image
              src={current.channelAvatar}
              alt={current.channelName}
              width={40}
              height={40}
              unoptimized
            />
          </div>
        </div>
      </div>
    </div>
  );
}
