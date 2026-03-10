"use client";

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
  Repeat2,
  Youtube,
} from "lucide-react";
import { useSidebar } from "@/components/youtube/SidebarContext";

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

  if (href) {
    return <Link href={href} className={base}>{content}</Link>;
  }

  return <button className={base}>{content}</button>;
}

function SectionDivider() {
  return <div className="my-2 border-t border-[#e5e5e5]" />;
}

function SectionLabel({ label }: { label: string }) {
  return (
    <p className="px-3 pt-2 pb-1 text-sm font-semibold text-[#0f0f0f]">
      {label}
    </p>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { collapsed } = useSidebar();

  return (
    <aside
      className={`sidebar hidden md:flex flex-col shrink-0 overflow-y-auto pb-4 px-1 pt-2 h-full border-r border-transparent transition-[width] duration-200 ease-in-out ${
        collapsed ? "w-[72px]" : "w-60"
      }`}
    >
      {/* Main nav */}
      <nav>
        <NavItem icon={<Home size={20} />} label="Home" href="/" active={isHome} collapsed={collapsed} />
        <NavItem icon={<Repeat2 size={20} />} label="Shorts" href="/shorts" collapsed={collapsed} />
        <NavItem icon={<PlaySquare size={20} />} label="Subscriptions" href="/subscriptions" collapsed={collapsed} />
      </nav>

      {/* Everything below is hidden when collapsed */}
      {!collapsed && (
        <>
          <SectionDivider />

          <SectionLabel label="You" />
          <nav>
            <NavItem icon={<Youtube size={20} />} label="Your channel" href="/your-channel" />
            <NavItem icon={<History size={20} />} label="History" href="/history" />
            <NavItem icon={<ListVideo size={20} />} label="Playlists" href="/playlists" />
            <NavItem icon={<PlaySquare size={20} />} label="Your videos" href="/your-videos" />
            <NavItem icon={<Clock size={20} />} label="Watch later" href="/watch-later" />
            <NavItem icon={<ThumbsUp size={20} />} label="Liked videos" href="/liked-videos" />
            <button className="flex items-center gap-6 w-full px-3 py-2.5 rounded-xl text-sm font-medium hover:bg-[#f2f2f2] transition-colors text-[#0f0f0f]">
              <ChevronDown size={20} className="shrink-0" />
              Show more
            </button>
          </nav>

          <SectionDivider />

          <SectionLabel label="Explore" />
          <nav>
            <NavItem icon={<Flame size={20} />} label="Trending" href="/trending" />
            <NavItem icon={<Music2 size={20} />} label="Music" href="/music" />
            <NavItem icon={<Gamepad2 size={20} />} label="Gaming" href="/gaming" />
            <NavItem icon={<Newspaper size={20} />} label="News" href="/news" />
            <NavItem icon={<Radio size={20} />} label="Live" href="/live" />
            <NavItem icon={<Trophy size={20} />} label="Sports" href="/sports" />
            <NavItem icon={<GraduationCap size={20} />} label="Learning" href="/learning" />
            <NavItem icon={<Podcast size={20} />} label="Podcasts" href="/podcasts" />
          </nav>

          <SectionDivider />

          <SectionLabel label="More from YouTube" />
          <nav>
            <NavItem
              icon={
                <span className="text-[#FF0000]">
                  <Youtube size={20} />
                </span>
              }
              label="YouTube Premium"
            />
          </nav>

          <SectionDivider />

          <nav>
            <NavItem icon={<Settings size={20} />} label="Settings" />
            <NavItem icon={<Flag size={20} />} label="Report history" />
            <NavItem icon={<HelpCircle size={20} />} label="Help" />
            <NavItem icon={<MessageSquare size={20} />} label="Send feedback" />
          </nav>

          <div className="mt-4 px-3">
            <p className="text-xs text-[#606060] leading-relaxed">
              About Press Copyright Contact us Creators Advertise Developers Terms
              Privacy Policy & Safety How YouTube works Test new features
            </p>
            <p className="text-xs text-[#606060] mt-2">© 2025 Google LLC</p>
          </div>
        </>
      )}
    </aside>
  );
}
