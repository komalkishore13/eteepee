"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Flame,
  PlaySquare,
  Clock,
  ThumbsUp,
  History,
  ListVideo,
  Music2,
  Gamepad2,
  Newspaper,
  Radio,
  Trophy,
  GraduationCap,
  Podcast,
  Settings,
  Flag,
  HelpCircle,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Repeat2,
  Youtube,
  Download,
  ShoppingBag,
  Film,
  User,
  X,
  Check,
} from "lucide-react";
import { useSidebar } from "@/components/youtube/SidebarContext";
import Image from "next/image";

// ── Default subscribed channels ──────────────────────────────────────────────
const SUBSCRIPTIONS = [
  { name: "MrBeast",         seed: "MRB", color: "#e74c3c", hasNew: true,  url: "https://www.youtube.com/@MrBeast"        },
  { name: "Fireship",        seed: "FRP", color: "#e67e22", hasNew: false, url: "https://www.youtube.com/@Fireship"       },
  { name: "Mark Rober",      seed: "MRO", color: "#3498db", hasNew: true,  url: "https://www.youtube.com/@MarkRober"      },
  { name: "Kurzgesagt",      seed: "KZG", color: "#9b59b6", hasNew: false, url: "https://www.youtube.com/@kurzgesagt"     },
  { name: "Veritasium",      seed: "VRT", color: "#2ecc71", hasNew: true,  url: "https://www.youtube.com/@veritasium"     },
  { name: "Linus Tech Tips", seed: "LTT", color: "#1abc9c", hasNew: false, url: "https://www.youtube.com/@LinusTechTips"  },
  { name: "MKBHD",           seed: "MKB", color: "#e91e63", hasNew: true,  url: "https://www.youtube.com/@mkbhd"          },
];

// ── Small helpers ─────────────────────────────────────────────────────────────
interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  href?: string;
  active?: boolean;
  collapsed?: boolean;
}

function NavItem({ icon, label, href, active, collapsed }: NavItemProps) {
  const base = collapsed
    ? `flex flex-col items-center justify-center w-full px-1 py-3 rounded-xl text-[10px] font-normal transition-colors ${
        active ? "bg-[#f2f2f2] font-semibold" : "hover:bg-[#f2f2f2] text-[#0f0f0f]"
      }`
    : `flex items-center gap-6 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
        active ? "bg-[#f2f2f2] font-semibold" : "hover:bg-[#f2f2f2] text-[#0f0f0f]"
      }`;

  const content = collapsed ? (
    <>
      <span className="w-6 flex items-center justify-center shrink-0">{icon}</span>
      <span className="mt-1 truncate text-center leading-tight">{label}</span>
    </>
  ) : (
    <>
      <span className="w-6 flex items-center justify-center shrink-0">{icon}</span>
      <span className="truncate">{label}</span>
    </>
  );

  if (href) return <Link href={href} className={base}>{content}</Link>;
  return <button className={base}>{content}</button>;
}

function SectionDivider() {
  return <div className="my-2 border-t border-[#e5e5e5]" />;
}

// ── Main Sidebar ──────────────────────────────────────────────────────────────
export default function Sidebar() {
  const pathname  = usePathname();
  const isHome    = pathname === "/";
  const { collapsed, setCollapsed } = useSidebar();

  const [youExpanded,       setYouExpanded]       = useState(true);
  const [exploreExpanded,   setExploreExpanded]   = useState(false);
  const [subsExpanded,      setSubsExpanded]      = useState(true);
  const [showFeedback,      setShowFeedback]      = useState(false);
  const [feedbackText,      setFeedbackText]      = useState("");
  const [feedbackSent,      setFeedbackSent]      = useState(false);

  const sendFeedback = () => {
    if (!feedbackText.trim()) return;
    setFeedbackSent(true);
    setTimeout(() => {
      setShowFeedback(false);
      setFeedbackText("");
      setFeedbackSent(false);
    }, 1800);
  };

  return (
    <>
      {/* Mobile backdrop — tap to close */}
      {!collapsed && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setCollapsed(true)}
        />
      )}

    <aside
      className={`sidebar flex flex-col shrink-0 overflow-y-auto pb-4 px-1 pt-2 bg-white
        fixed top-14 left-0 h-[calc(100vh-56px)] z-40
        md:relative md:top-0 md:h-full md:z-auto md:bg-transparent
        border-r border-transparent
        transition-[transform,width] duration-200 ease-in-out
        ${collapsed
          ? "-translate-x-full md:translate-x-0 w-60 md:w-[72px]"
          : "translate-x-0 w-60"
        }`}
    >
      {/* ── Top nav ── */}
      <nav>
        <NavItem icon={<Home size={20} />}    label="Home"   href="/"       active={isHome} collapsed={collapsed} />
        <NavItem icon={<Repeat2 size={20} />} label="Shorts" href="/shorts" collapsed={collapsed} />
      </nav>

      {/* Everything below hidden when collapsed */}
      {!collapsed && (
        <>
          {/* ── You section ─────────────────────────────────────────────── */}
          <SectionDivider />

          <button
            onClick={() => setYouExpanded(e => !e)}
            className="flex items-center justify-between w-full px-3 pt-2 pb-1 hover:bg-[#f2f2f2] rounded-xl transition-colors"
          >
            <span className="text-sm font-semibold text-[#0f0f0f]">You</span>
            <ChevronRight
              size={18}
              className={`text-[#0f0f0f] transition-transform duration-200 ${youExpanded ? "rotate-90" : ""}`}
            />
          </button>

          {youExpanded && (
            <nav>
              <NavItem icon={<User size={20} />}       label="Your channel"  href="/your-channel"  />
              <NavItem icon={<History size={20} />}     label="History"       href="/history"       />
              <NavItem icon={<ListVideo size={20} />}   label="Playlists"     href="/playlists"     />
              <NavItem icon={<PlaySquare size={20} />}  label="Your videos"   href="/your-videos"   />
              <NavItem icon={<Clock size={20} />}       label="Watch later"   href="/watch-later"   />
              <NavItem icon={<ThumbsUp size={20} />}    label="Liked videos"  href="/liked-videos"  />
              <NavItem icon={<Download size={20} />}    label="Downloads"     href="#"              />
            </nav>
          )}

          {/* ── Subscriptions section ────────────────────────────────────── */}
          <SectionDivider />

          <button
            onClick={() => setSubsExpanded(e => !e)}
            className="flex items-center justify-between w-full px-3 pt-2 pb-1 hover:bg-[#f2f2f2] rounded-xl transition-colors"
          >
            <span className="text-sm font-semibold text-[#0f0f0f]">Subscriptions</span>
            {subsExpanded
              ? <ChevronUp size={18} className="text-[#0f0f0f]" />
              : <ChevronDown size={18} className="text-[#0f0f0f]" />
            }
          </button>

          {subsExpanded && (
            <nav className="mt-1">
              {SUBSCRIPTIONS.map(ch => (
                <a
                  key={ch.name}
                  href={ch.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full px-3 py-2 rounded-xl hover:bg-[#f2f2f2] transition-colors"
                >
                  {/* avatar */}
                  <div className="relative shrink-0">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold"
                      style={{ background: ch.color }}
                    >
                      {ch.seed.slice(0, 1)}
                    </div>
                    {ch.hasNew && (
                      <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#065fd4] rounded-full border border-white" />
                    )}
                  </div>
                  <span className="truncate text-sm font-medium text-[#0f0f0f]">{ch.name}</span>
                </a>
              ))}
            </nav>
          )}

          {/* ── Explore section ──────────────────────────────────────────── */}
          <SectionDivider />

          <p className="px-3 pt-2 pb-1 text-sm font-semibold text-[#0f0f0f]">Explore</p>
          <nav>
            <NavItem icon={<Flame size={20} />}       label="Trending" href="/trending" />
            <NavItem icon={<ShoppingBag size={20} />} label="Shopping" href="#"         />
            <NavItem icon={<Music2 size={20} />}      label="Music"    href="/music"    />
            <NavItem icon={<Film size={20} />}        label="Films"    href="#"         />

            {exploreExpanded && (
              <>
                <NavItem icon={<Gamepad2 size={20} />}     label="Gaming"   href="/gaming"   />
                <NavItem icon={<Newspaper size={20} />}    label="News"     href="/news"     />
                <NavItem icon={<Radio size={20} />}        label="Live"     href="/live"     />
                <NavItem icon={<Trophy size={20} />}       label="Sports"   href="/sports"   />
                <NavItem icon={<GraduationCap size={20} />} label="Learning" href="/learning" />
                <NavItem icon={<Podcast size={20} />}      label="Podcasts" href="/podcasts" />
              </>
            )}

            <button
              onClick={() => setExploreExpanded(e => !e)}
              className="flex items-center gap-6 w-full px-3 py-2.5 rounded-xl text-sm font-medium hover:bg-[#f2f2f2] transition-colors text-[#0f0f0f]"
            >
              {exploreExpanded
                ? <ChevronUp size={20} className="shrink-0" />
                : <ChevronDown size={20} className="shrink-0" />
              }
              {exploreExpanded ? "Show less" : "Show more"}
            </button>
          </nav>

          {/* ── More from YouTube ────────────────────────────────────────── */}
          <SectionDivider />

          <p className="px-3 pt-2 pb-1 text-sm font-semibold text-[#0f0f0f]">More from YouTube</p>
          <nav>
            <NavItem
              icon={<span className="text-[#FF0000]"><Youtube size={20} /></span>}
              label="YouTube Premium"
              href="/youtube-premium"
            />
          </nav>

          {/* ── Settings & help ──────────────────────────────────────────── */}
          <SectionDivider />

          <nav>
            <NavItem icon={<Settings size={20} />}   label="Settings"       href="/settings" />
            <a
              href="https://www.youtube.com/reporthistory"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-6 w-full px-3 py-2.5 rounded-xl text-sm font-medium hover:bg-[#f2f2f2] transition-colors text-[#0f0f0f]"
            >
              <span className="w-6 flex items-center justify-center shrink-0"><Flag size={20} /></span>
              <span className="truncate">Report history</span>
            </a>
            <a
              href="https://support.google.com/youtube"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-6 w-full px-3 py-2.5 rounded-xl text-sm font-medium hover:bg-[#f2f2f2] transition-colors text-[#0f0f0f]"
            >
              <span className="w-6 flex items-center justify-center shrink-0"><HelpCircle size={20} /></span>
              <span className="truncate">Help</span>
            </a>
            <button
              onClick={() => setShowFeedback(true)}
              className="flex items-center gap-6 w-full px-3 py-2.5 rounded-xl text-sm font-medium hover:bg-[#f2f2f2] transition-colors text-[#0f0f0f]"
            >
              <span className="w-6 flex items-center justify-center shrink-0"><MessageSquare size={20} /></span>
              <span className="truncate">Send feedback</span>
            </button>
          </nav>

          {/* ── Feedback modal ────────────────────────────────────────────── */}
          {showFeedback && (
            <>
              <div
                className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
                onClick={() => setShowFeedback(false)}
              />
              <div className="fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] bg-white rounded-2xl shadow-2xl overflow-hidden">
                {/* header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-[#e5e5e5]">
                  <span className="font-semibold text-[#0f0f0f] text-base">Send feedback to YouTube</span>
                  <button
                    onClick={() => setShowFeedback(false)}
                    className="text-[#606060] hover:text-[#0f0f0f] transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                {feedbackSent ? (
                  <div className="px-5 py-10 flex flex-col items-center gap-3 text-center">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                      <Check size={24} className="text-green-600" />
                    </div>
                    <p className="font-semibold text-[#0f0f0f]">Thanks for your feedback!</p>
                    <p className="text-sm text-[#606060]">We&apos;ll use it to improve YouTube.</p>
                  </div>
                ) : (
                  <>
                    <div className="px-5 py-4">
                      <p className="text-sm text-[#606060] mb-3">
                        Describe your feedback. We read all feedback carefully, but we are unable to respond to individual submissions.
                      </p>
                      <textarea
                        value={feedbackText}
                        onChange={e => setFeedbackText(e.target.value)}
                        placeholder="Tell us what you think..."
                        rows={5}
                        className="w-full border border-[#ccc] rounded-lg px-3 py-2 text-sm text-[#0f0f0f] resize-none focus:outline-none focus:border-[#065fd4] focus:ring-1 focus:ring-[#065fd4] transition-colors"
                      />
                      <p className="text-xs text-[#606060] mt-1 text-right">{feedbackText.length} / 2000</p>
                    </div>
                    <div className="flex justify-end gap-2 px-5 pb-4">
                      <button
                        onClick={() => setShowFeedback(false)}
                        className="px-4 py-2 rounded-full text-sm font-medium text-[#0f0f0f] hover:bg-[#f2f2f2] transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={sendFeedback}
                        disabled={!feedbackText.trim()}
                        className="px-4 py-2 rounded-full text-sm font-medium bg-[#065fd4] text-white hover:bg-[#0559c0] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                      >
                        Send
                      </button>
                    </div>
                  </>
                )}
              </div>
            </>
          )}

          {/* ── Footer ───────────────────────────────────────────────────── */}
          <div className="mt-4 px-3">
            <p className="text-xs text-[#606060] leading-relaxed">
              About Press Copyright Contact us Creator Advertise Developers
            </p>
            <p className="text-xs text-[#606060] leading-relaxed mt-1">
              Terms Privacy Policy &amp; Safety How YouTube works Test new features
            </p>
            <p className="text-xs text-[#606060] mt-2">© 2026 Google LLC</p>
          </div>
        </>
      )}
    </aside>
    </>
  );
}
