"use client";

import { useState } from "react";
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
} from "lucide-react";
import { useSidebar } from "@/components/youtube/SidebarContext";
import Image from "next/image";

// ── Default subscribed channels ──────────────────────────────────────────────
const SUBSCRIPTIONS = [
  { name: "MrBeast",         seed: "MRB", color: "#e74c3c", hasNew: true  },
  { name: "Fireship",        seed: "FRP", color: "#e67e22", hasNew: false },
  { name: "Mark Rober",      seed: "MRO", color: "#3498db", hasNew: true  },
  { name: "Kurzgesagt",      seed: "KZG", color: "#9b59b6", hasNew: false },
  { name: "Veritasium",      seed: "VRT", color: "#2ecc71", hasNew: true  },
  { name: "Linus Tech Tips", seed: "LTT", color: "#1abc9c", hasNew: false },
  { name: "MKBHD",           seed: "MKB", color: "#e91e63", hasNew: true  },
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
  const { collapsed } = useSidebar();

  const [youExpanded,       setYouExpanded]       = useState(true);
  const [exploreExpanded,   setExploreExpanded]   = useState(false);
  const [subsExpanded,      setSubsExpanded]      = useState(true);

  return (
    <aside
      className={`sidebar hidden md:flex flex-col shrink-0 overflow-y-auto pb-4 px-1 pt-2 h-full border-r border-transparent transition-[width] duration-200 ease-in-out ${
        collapsed ? "w-[72px]" : "w-60"
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
                <Link
                  key={ch.name}
                  href="#"
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
                </Link>
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
            />
            <NavItem
              icon={<span className="text-[#FF0000]"><Youtube size={20} /></span>}
              label="YouTube Studio"
            />
            <NavItem
              icon={<span className="text-[#FF0000]"><Music2 size={20} /></span>}
              label="YouTube Music"
            />
            <NavItem
              icon={<span className="text-[#FF0000]"><Youtube size={20} /></span>}
              label="YouTube Kids"
            />
          </nav>

          {/* ── Settings & help ──────────────────────────────────────────── */}
          <SectionDivider />

          <nav>
            <NavItem icon={<Settings size={20} />}     label="Settings"       />
            <NavItem icon={<Flag size={20} />}         label="Report history" />
            <NavItem icon={<HelpCircle size={20} />}   label="Help"           />
            <NavItem icon={<MessageSquare size={20} />} label="Send feedback" />
          </nav>

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
  );
}
