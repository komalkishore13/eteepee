"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { shortsData } from "@/data/shorts";
import {
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Share2,
  ChevronUp,
  ChevronDown,
  Volume2,
  VolumeX,
  Repeat2,
} from "lucide-react";
import Image from "next/image";
import { useSidebar } from "@/components/youtube/SidebarContext";

const shorts = shortsData;

function formatNum(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toString();
}

function ActionBtn({
  icon, label, active = false, onClick,
}: {
  icon: React.ReactNode; label: string; active?: boolean; onClick?: () => void;
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <button
        onClick={onClick}
        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
          active ? "bg-white text-black" : "bg-[#272727] text-white hover:bg-[#3d3d3d]"
        }`}
      >
        {icon}
      </button>
      <span className="text-white text-xs font-medium">{label}</span>
    </div>
  );
}

export default function ShortsPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [liked,    setLiked]    = useState<Set<string>>(new Set());
  const [disliked, setDisliked] = useState<Set<string>>(new Set());
  const [muted,    setMuted]    = useState(true);
  const { setCollapsed } = useSidebar();
  const prevCollapsed = useRef(false);

  // Auto-collapse sidebar while on Shorts
  useEffect(() => {
    setCollapsed(true);
    return () => setCollapsed(prevCollapsed.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setCollapsed]);

  const goToNext = useCallback(() => setCurrentIndex(p => Math.min(p + 1, shorts.length - 1)), []);
  const goPrev   = useCallback(() => setCurrentIndex(p => Math.max(p - 1, 0)), []);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") goToNext();
      if (e.key === "ArrowUp")   goPrev();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [goToNext, goPrev]);

  const current    = shorts[currentIndex];
  const isLiked    = liked.has(current.id);
  const isDisliked = disliked.has(current.id);

  const toggleLike = () => {
    const id = current.id;
    setLiked(prev => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); }
      else { next.add(id); setDisliked(pd => { const nd = new Set(pd); nd.delete(id); return nd; }); }
      return next;
    });
  };

  const toggleDislike = () => {
    const id = current.id;
    setDisliked(prev => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); }
      else { next.add(id); setLiked(pl => { const nl = new Set(pl); nl.delete(id); return nl; }); }
      return next;
    });
  };

  const handle = `@${current.channelName.toLowerCase().replace(/\s+/g, "")}`;

  return (
    <div className="h-full w-full bg-[#0f0f0f] flex items-center justify-center overflow-hidden">
      <div className="flex items-end gap-4 h-full py-4 px-2">

        {/* ── VIDEO PLAYER ── */}
        <div
          className="relative h-full rounded-xl overflow-hidden bg-black flex-shrink-0"
          style={{ aspectRatio: "9/16", maxHeight: "calc(100vh - 88px)" }}
        >
          {/* blurred ambient background */}
          <Image
            src={current.thumbnail} alt="" fill sizes="500px"
            className="object-cover scale-125 blur-2xl opacity-30 pointer-events-none"
            unoptimized
          />

          {/* YouTube embed */}
          <div className="absolute inset-0 flex items-center justify-center">
            <iframe
              key={`${current.youtubeId}-${currentIndex}`}
              src={`https://www.youtube-nocookie.com/embed/${current.youtubeId}?autoplay=1&mute=${muted ? 1 : 0}&loop=1&playlist=${current.youtubeId}&controls=0&rel=0&showinfo=0&modestbranding=1`}
              className="w-full aspect-video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30 pointer-events-none" />

          {/* mute button */}
          <button
            onClick={() => setMuted(m => !m)}
            className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>

          {/* bottom overlay */}
          <div className="absolute bottom-0 left-0 right-0 z-10 p-4 space-y-1.5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-white/30 shrink-0">
                <Image src={current.channelAvatar} alt={current.channelName} width={32} height={32} unoptimized />
              </div>
              <span className="text-white text-sm font-semibold">{handle}</span>
              <button className="px-3 py-0.5 border border-white/80 text-white text-xs font-semibold rounded-full hover:bg-white/20 transition-colors ml-1">
                Subscribe
              </button>
            </div>
            <p className="text-white text-sm font-medium line-clamp-2 leading-snug">{current.title}</p>
            {/* progress bar */}
            <div className="mt-2 h-[3px] rounded-full bg-white/20 overflow-hidden">
              <div className="h-full w-2/5 bg-white rounded-full" />
            </div>
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div className="flex flex-col items-center justify-end gap-4 pb-6 flex-shrink-0">
          <ActionBtn
            icon={<ThumbsUp size={22} fill={isLiked ? "currentColor" : "none"} />}
            label={formatNum(current.likes + (isLiked ? 1 : 0))}
            active={isLiked}
            onClick={toggleLike}
          />
          <ActionBtn
            icon={<ThumbsDown size={22} fill={isDisliked ? "currentColor" : "none"} />}
            label="Dislike"
            active={isDisliked}
            onClick={toggleDislike}
          />
          <ActionBtn icon={<MessageCircle size={22} />} label={formatNum(current.comments)} />
          <ActionBtn icon={<Share2 size={22} />}        label="Share" />
          <ActionBtn icon={<Repeat2 size={22} />}       label="Remix" />

          {/* spinning music disc */}
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/20 animate-spin mt-1" style={{ animationDuration: "4s" }}>
            <Image src={current.channelAvatar} alt="" width={40} height={40} unoptimized />
          </div>

          {/* up / down navigation */}
          <div className="flex flex-col gap-2 mt-3">
            <button
              onClick={goPrev}
              disabled={currentIndex === 0}
              className="w-10 h-10 rounded-full bg-[#272727] text-white flex items-center justify-center disabled:opacity-20 hover:bg-[#3d3d3d] disabled:hover:bg-[#272727] transition-colors"
              aria-label="Previous short"
            >
              <ChevronUp size={20} />
            </button>
            <button
              onClick={goToNext}
              disabled={currentIndex === shorts.length - 1}
              className="w-10 h-10 rounded-full bg-[#272727] text-white flex items-center justify-center disabled:opacity-20 hover:bg-[#3d3d3d] disabled:hover:bg-[#272727] transition-colors"
              aria-label="Next short"
            >
              <ChevronDown size={20} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
