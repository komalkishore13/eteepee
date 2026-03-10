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
  X,
  Copy,
  Check,
} from "lucide-react";
import Image from "next/image";
import { useSidebar } from "@/components/youtube/SidebarContext";

// ── mock comments ─────────────────────────────────────────────────────────────
const MOCK_COMMENTS = [
  { id: 1,  user: "@alex_the_dev",     avatar: "AX", color: "#e74c3c", text: "This is absolutely insane 🔥🔥",                    likes: 4821, time: "2 days ago"  },
  { id: 2,  user: "@sarah_m",          avatar: "SM", color: "#3498db", text: "I've watched this 10 times already 😂",             likes: 2340, time: "3 days ago"  },
  { id: 3,  user: "@curious_george99", avatar: "CG", color: "#2ecc71", text: "How did they even film this?? The editing is 🤌",   likes: 1890, time: "1 week ago"  },
  { id: 4,  user: "@notabot_i_swear",  avatar: "NB", color: "#9b59b6", text: "Bro said 'hold my baguette' 💀",                    likes: 987,  time: "5 days ago"  },
  { id: 5,  user: "@react_queen",      avatar: "RQ", color: "#e67e22", text: "The transition at 0:12 is so smooth omg",           likes: 765,  time: "4 days ago"  },
  { id: 6,  user: "@techbro2025",      avatar: "TB", color: "#1abc9c", text: "OK but can we talk about the production quality?",  likes: 543,  time: "6 days ago"  },
  { id: 7,  user: "@lurker_mode_on",   avatar: "LM", color: "#e91e63", text: "Breaking my no-comment streak for this 👏",         likes: 432,  time: "1 week ago"  },
  { id: 8,  user: "@daily_dose_of_yt", avatar: "DD", color: "#ff9800", text: "Came from Instagram, staying for everything 😭",    likes: 311,  time: "2 weeks ago" },
  { id: 9,  user: "@philosophybro",    avatar: "PB", color: "#607d8b", text: "Deep down we all needed to see this today",         likes: 278,  time: "2 weeks ago" },
  { id: 10, user: "@midnight_clips",   avatar: "MC", color: "#795548", text: "It's 3AM and I have work in 4 hours. Worth it.",    likes: 201,  time: "3 weeks ago" },
];

const SHARE_OPTIONS = [
  { label: "WhatsApp",  bg: "#25d366", icon: "W" },
  { label: "Facebook",  bg: "#1877f2", icon: "f" },
  { label: "X",         bg: "#000000", icon: "𝕏" },
  { label: "Email",     bg: "#9e9e9e", icon: "✉" },
  { label: "Reddit",    bg: "#ff4500", icon: "R" },
  { label: "Pinterest", bg: "#e60023", icon: "P" },
];

function formatNum(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000)     return `${(n / 1_000).toFixed(1)}K`;
  return n.toString();
}

// Action button — compact on mobile, full-size on desktop
function ActionBtn({
  icon, label, active = false, onClick, compact = false,
}: {
  icon: React.ReactNode; label: string; active?: boolean; onClick?: () => void; compact?: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <button
        onClick={onClick}
        className={`${compact ? "w-10 h-10" : "w-12 h-12"} rounded-full flex items-center justify-center transition-all ${
          active ? "bg-white text-black" : "bg-black/30 backdrop-blur-sm text-white hover:bg-white/20"
        }`}
      >
        {icon}
      </button>
      <span className="text-white text-[10px] font-medium drop-shadow">{label}</span>
    </div>
  );
}

// ── Shared overlaid bottom info ───────────────────────────────────────────────
function VideoOverlay({
  current, handle, muted, setMuted, isLiked, isDisliked,
  toggleLike, toggleDislike, currentIndex, goToNext, goPrev,
  transitioning, showComments, setShowComments, showShare, setShowShare,
  animClass,
}: {
  current: typeof shortsData[0];
  handle: string;
  muted: boolean;
  setMuted: (fn: (m: boolean) => boolean) => void;
  isLiked: boolean;
  isDisliked: boolean;
  toggleLike: () => void;
  toggleDislike: () => void;
  currentIndex: number;
  goToNext: () => void;
  goPrev: () => void;
  transitioning: boolean;
  showComments: boolean;
  setShowComments: (fn: (s: boolean) => boolean) => void;
  showShare: boolean;
  setShowShare: (fn: (s: boolean) => boolean) => void;
  animClass: string;
}) {
  return (
    <>
      {/* blurred ambient background */}
      <Image
        src={current.thumbnail} alt="" fill sizes="100vw"
        className="object-cover scale-125 blur-2xl opacity-30 pointer-events-none"
        unoptimized
      />

      {/* animated iframe slot */}
      <div className={`absolute inset-0 ${animClass}`}>
        <iframe
          key={`${current.youtubeId}-${currentIndex}`}
          src={`https://www.youtube-nocookie.com/embed/${current.youtubeId}?autoplay=1&mute=${muted ? 1 : 0}&loop=1&playlist=${current.youtubeId}&controls=0&rel=0&showinfo=0&modestbranding=1`}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      {/* gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20 pointer-events-none" />

      {/* mute button — top right */}
      <button
        onClick={() => setMuted(m => !m)}
        className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/30 backdrop-blur-sm text-white flex items-center justify-center"
      >
        {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
      </button>

      {/* right action buttons (overlaid) */}
      <div className="absolute right-2 bottom-24 z-10 flex flex-col items-center gap-3">
        <ActionBtn
          icon={<ThumbsUp size={20} fill={isLiked ? "currentColor" : "none"} />}
          label={formatNum(current.likes + (isLiked ? 1 : 0))}
          active={isLiked}
          onClick={toggleLike}
          compact
        />
        <ActionBtn
          icon={<ThumbsDown size={20} fill={isDisliked ? "currentColor" : "none"} />}
          label="Dislike"
          active={isDisliked}
          onClick={toggleDislike}
          compact
        />
        <ActionBtn
          icon={<MessageCircle size={20} />}
          label={formatNum(current.comments)}
          onClick={() => { setShowComments(s => !s); setShowShare(() => false); }}
          compact
        />
        <ActionBtn
          icon={<Share2 size={20} />}
          label="Share"
          onClick={() => { setShowShare(s => !s); setShowComments(() => false); }}
          compact
        />
        <ActionBtn icon={<Repeat2 size={20} />} label="Remix" compact />

        {/* spinning disc */}
        <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-white/30 animate-spin mt-1" style={{ animationDuration: "4s" }}>
          <Image src={current.channelAvatar} alt="" width={36} height={36} unoptimized />
        </div>

        {/* nav arrows */}
        <div className="flex flex-col gap-1 mt-1">
          <button
            onClick={goPrev}
            disabled={currentIndex === 0 || transitioning}
            className="w-9 h-9 rounded-full bg-black/30 backdrop-blur-sm text-white flex items-center justify-center disabled:opacity-20"
          >
            <ChevronUp size={18} />
          </button>
          <button
            onClick={goToNext}
            disabled={currentIndex === shortsData.length - 1 || transitioning}
            className="w-9 h-9 rounded-full bg-black/30 backdrop-blur-sm text-white flex items-center justify-center disabled:opacity-20"
          >
            <ChevronDown size={18} />
          </button>
        </div>
      </div>

      {/* bottom info */}
      <div className="absolute bottom-0 left-0 right-14 z-10 p-4 space-y-1.5">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full overflow-hidden ring-2 ring-white/30 shrink-0">
            <Image src={current.channelAvatar} alt={current.channelName} width={28} height={28} unoptimized />
          </div>
          <span className="text-white text-sm font-semibold">{handle}</span>
          <button className="px-2.5 py-0.5 border border-white/80 text-white text-xs font-semibold rounded-full hover:bg-white/20 transition-colors">
            Subscribe
          </button>
        </div>
        <p className="text-white text-sm font-medium line-clamp-2 leading-snug">{current.title}</p>
        <div className="mt-1.5 h-[3px] rounded-full bg-white/20 overflow-hidden">
          <div className="h-full w-2/5 bg-white rounded-full" />
        </div>
      </div>
    </>
  );
}

// ── main component ────────────────────────────────────────────────────────────
export default function ShortsPage() {
  const [currentIndex,  setCurrentIndex]  = useState(0);
  const [displayIndex,  setDisplayIndex]  = useState(0);
  const [animClass,     setAnimClass]     = useState("");
  const [transitioning, setTransitioning] = useState(false);
  const [liked,         setLiked]         = useState<Set<string>>(new Set());
  const [disliked,      setDisliked]      = useState<Set<string>>(new Set());
  const [muted,         setMuted]         = useState(true);
  const [showComments,  setShowComments]  = useState(false);
  const [showShare,     setShowShare]     = useState(false);
  const [copied,        setCopied]        = useState(false);

  const { setCollapsed } = useSidebar();
  const prevCollapsed    = useRef(false);
  const touchStartY      = useRef(0);

  // Auto-collapse sidebar while on Shorts
  useEffect(() => {
    setCollapsed(true);
    return () => setCollapsed(prevCollapsed.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setCollapsed]);

  // ── animated navigation ───────────────────────────────────────────────────
  const navigate = useCallback((dir: "next" | "prev") => {
    if (transitioning) return;
    const nextIdx = dir === "next"
      ? Math.min(currentIndex + 1, shortsData.length - 1)
      : Math.max(currentIndex - 1, 0);
    if (nextIdx === currentIndex) return;

    setTransitioning(true);
    setAnimClass(dir === "next" ? "shorts-slide-out-top" : "shorts-slide-out-bottom");
    setTimeout(() => {
      setDisplayIndex(nextIdx);
      setCurrentIndex(nextIdx);
      setAnimClass(dir === "next" ? "shorts-slide-in-bottom" : "shorts-slide-in-top");
      setTimeout(() => { setAnimClass(""); setTransitioning(false); }, 400);
    }, 280);
  }, [currentIndex, transitioning]);

  const goToNext = useCallback(() => navigate("next"), [navigate]);
  const goPrev   = useCallback(() => navigate("prev"),  [navigate]);

  // keyboard
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") goToNext();
      if (e.key === "ArrowUp")   goPrev();
      if (e.key === "Escape")    { setShowComments(false); setShowShare(false); }
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [goToNext, goPrev]);

  // scroll wheel (desktop)
  useEffect(() => {
    let last = 0;
    const fn = (e: WheelEvent) => {
      e.preventDefault();
      const now = Date.now();
      if (now - last < 700) return;
      last = now;
      if (e.deltaY > 0) goToNext(); else goPrev();
    };
    window.addEventListener("wheel", fn, { passive: false });
    return () => window.removeEventListener("wheel", fn);
  }, [goToNext, goPrev]);

  // touch swipe (mobile)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartY.current - e.changedTouches[0].clientY;
    if (Math.abs(diff) > 60) {
      if (diff > 0) goToNext(); else goPrev();
    }
  };

  const current    = shortsData[displayIndex];
  const isLiked    = liked.has(current.id);
  const isDisliked = disliked.has(current.id);
  const handle     = `@${current.channelName.toLowerCase().replace(/\s+/g, "")}`;
  const shareUrl   = `https://www.youtube.com/shorts/${current.youtubeId}`;

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
  const copyLink = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const overlayProps = {
    current, handle, muted, setMuted, isLiked, isDisliked,
    toggleLike, toggleDislike, currentIndex, goToNext, goPrev,
    transitioning, showComments, setShowComments, showShare, setShowShare, animClass,
  };

  return (
    <div className="h-full w-full bg-[#0f0f0f] overflow-hidden">

      {/* ══ MOBILE layout (< md) — full-screen video with overlaid buttons ══ */}
      <div
        className="md:hidden relative w-full h-full overflow-hidden bg-black"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <VideoOverlay {...overlayProps} />
      </div>

      {/* ══ DESKTOP layout (md+) — video card + side buttons ══════════════ */}
      <div className="hidden md:flex items-center justify-center h-full">
        <div className="flex items-end gap-4 h-full py-4 px-2">

          {/* video card */}
          <div
            className="relative h-full rounded-xl overflow-hidden bg-black flex-shrink-0"
            style={{ aspectRatio: "9/16", maxHeight: "calc(100vh - 88px)" }}
          >
            <VideoOverlay {...overlayProps} />
          </div>

          {/* desktop side action buttons */}
          <div className="flex flex-col items-center justify-end gap-4 pb-6 flex-shrink-0">
            <div className="flex flex-col items-center gap-1">
              <button
                onClick={toggleLike}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                  isLiked ? "bg-white text-black" : "bg-[#272727] text-white hover:bg-[#3d3d3d]"
                }`}
              >
                <ThumbsUp size={22} fill={isLiked ? "currentColor" : "none"} />
              </button>
              <span className="text-white text-xs font-medium">{formatNum(current.likes + (isLiked ? 1 : 0))}</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <button
                onClick={toggleDislike}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                  isDisliked ? "bg-white text-black" : "bg-[#272727] text-white hover:bg-[#3d3d3d]"
                }`}
              >
                <ThumbsDown size={22} fill={isDisliked ? "currentColor" : "none"} />
              </button>
              <span className="text-white text-xs font-medium">Dislike</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <button
                onClick={() => { setShowComments(s => !s); setShowShare(false); }}
                className="w-12 h-12 rounded-full bg-[#272727] text-white hover:bg-[#3d3d3d] flex items-center justify-center transition-all"
              >
                <MessageCircle size={22} />
              </button>
              <span className="text-white text-xs font-medium">{formatNum(current.comments)}</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <button
                onClick={() => { setShowShare(s => !s); setShowComments(false); }}
                className="w-12 h-12 rounded-full bg-[#272727] text-white hover:bg-[#3d3d3d] flex items-center justify-center transition-all"
              >
                <Share2 size={22} />
              </button>
              <span className="text-white text-xs font-medium">Share</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <button className="w-12 h-12 rounded-full bg-[#272727] text-white hover:bg-[#3d3d3d] flex items-center justify-center transition-all">
                <Repeat2 size={22} />
              </button>
              <span className="text-white text-xs font-medium">Remix</span>
            </div>

            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/20 animate-spin mt-1" style={{ animationDuration: "4s" }}>
              <Image src={current.channelAvatar} alt="" width={40} height={40} unoptimized />
            </div>

            <div className="flex flex-col gap-2 mt-3">
              <button onClick={goPrev} disabled={currentIndex === 0 || transitioning}
                className="w-10 h-10 rounded-full bg-[#272727] text-white flex items-center justify-center disabled:opacity-20 hover:bg-[#3d3d3d] transition-colors">
                <ChevronUp size={20} />
              </button>
              <button onClick={goToNext} disabled={currentIndex === shortsData.length - 1 || transitioning}
                className="w-10 h-10 rounded-full bg-[#272727] text-white flex items-center justify-center disabled:opacity-20 hover:bg-[#3d3d3d] transition-colors">
                <ChevronDown size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── COMMENTS PANEL ───────────────────────────────────────────────── */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-[420px] bg-[#212121] flex flex-col z-50 transition-transform duration-300 ease-in-out ${
          showComments ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ boxShadow: showComments ? "-8px 0 32px rgba(0,0,0,0.6)" : "none" }}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <span className="text-white font-semibold text-lg">
            Comments <span className="text-white/50 font-normal text-base ml-1">{current.comments.toLocaleString()}</span>
          </span>
          <button onClick={() => setShowComments(false)} className="text-white/70 hover:text-white"><X size={22} /></button>
        </div>
        <div className="flex items-center gap-3 px-6 py-3 border-b border-white/10">
          <div className="w-8 h-8 rounded-full bg-[#3d3d3d] flex items-center justify-center text-white text-xs font-bold shrink-0">U</div>
          <input type="text" placeholder="Add a comment..."
            className="flex-1 bg-transparent border-b border-white/20 text-white text-sm placeholder-white/40 focus:outline-none focus:border-white/60 pb-1 transition-colors" />
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
          {MOCK_COMMENTS.map(c => (
            <div key={c.id} className="flex gap-3">
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0" style={{ background: c.color }}>{c.avatar}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 mb-0.5">
                  <span className="text-white text-xs font-semibold">{c.user}</span>
                  <span className="text-white/40 text-xs">{c.time}</span>
                </div>
                <p className="text-white/90 text-sm leading-snug">{c.text}</p>
                <div className="flex items-center gap-3 mt-1.5">
                  <button className="flex items-center gap-1 text-white/50 hover:text-white text-xs transition-colors"><ThumbsUp size={13} /> {c.likes.toLocaleString()}</button>
                  <button className="flex items-center gap-1 text-white/50 hover:text-white text-xs transition-colors"><ThumbsDown size={13} /></button>
                  <button className="text-white/50 hover:text-white text-xs transition-colors">Reply</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── SHARE MODAL ──────────────────────────────────────────────────── */}
      {showShare && (
        <>
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" onClick={() => setShowShare(false)} />
          <div className="fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(360px,90vw)] bg-[#282828] rounded-2xl shadow-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <span className="text-white font-semibold text-base">Share</span>
              <button onClick={() => setShowShare(false)} className="text-white/60 hover:text-white"><X size={20} /></button>
            </div>
            <div className="flex gap-3 justify-center mb-6 flex-wrap">
              {SHARE_OPTIONS.map(opt => (
                <div key={opt.label} className="flex flex-col items-center gap-1.5">
                  <button className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg hover:opacity-80 active:scale-95 transition-all" style={{ background: opt.bg }}>
                    {opt.icon}
                  </button>
                  <span className="text-white/70 text-[11px]">{opt.label}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 bg-[#3d3d3d] rounded-lg px-3 py-2">
              <span className="flex-1 text-white/70 text-sm truncate">{shareUrl}</span>
              <button onClick={copyLink}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${copied ? "bg-green-600 text-white" : "bg-[#065fd4] text-white hover:bg-[#0559c0]"}`}>
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
        </>
      )}

      {showComments && <div className="fixed inset-0 z-40" onClick={() => setShowComments(false)} />}
    </div>
  );
}
