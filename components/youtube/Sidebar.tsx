"use client";

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

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

function NavItem({ icon, label, active, onClick }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-6 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
        active
          ? "bg-[#f2f2f2] font-semibold"
          : "hover:bg-[#f2f2f2] text-[#0f0f0f]"
      }`}
    >
      <span className="w-6 flex items-center justify-center shrink-0">{icon}</span>
      <span className="truncate">{label}</span>
    </button>
  );
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
  return (
    <aside className="hidden md:flex flex-col w-60 shrink-0 overflow-y-auto pb-4 px-1 pt-2 h-full border-r border-transparent">
      {/* Main nav */}
      <nav>
        <NavItem icon={<Home size={20} />} label="Home" active />
        <NavItem icon={<Repeat2 size={20} />} label="Shorts" />
        <NavItem icon={<PlaySquare size={20} />} label="Subscriptions" />
      </nav>

      <SectionDivider />

      {/* You section */}
      <SectionLabel label="You" />
      <nav>
        <NavItem icon={<Youtube size={20} />} label="Your channel" />
        <NavItem icon={<History size={20} />} label="History" />
        <NavItem icon={<ListVideo size={20} />} label="Playlists" />
        <NavItem icon={<PlaySquare size={20} />} label="Your videos" />
        <NavItem icon={<Clock size={20} />} label="Watch later" />
        <NavItem icon={<ThumbsUp size={20} />} label="Liked videos" />
        <button className="flex items-center gap-6 w-full px-3 py-2.5 rounded-xl text-sm font-medium hover:bg-[#f2f2f2] transition-colors text-[#0f0f0f]">
          <ChevronDown size={20} className="shrink-0" />
          Show more
        </button>
      </nav>

      <SectionDivider />

      {/* Explore */}
      <SectionLabel label="Explore" />
      <nav>
        <NavItem icon={<Flame size={20} />} label="Trending" />
        <NavItem icon={<Music2 size={20} />} label="Music" />
        <NavItem icon={<Gamepad2 size={20} />} label="Gaming" />
        <NavItem icon={<Newspaper size={20} />} label="News" />
        <NavItem icon={<Radio size={20} />} label="Live" />
        <NavItem icon={<Trophy size={20} />} label="Sports" />
        <NavItem icon={<GraduationCap size={20} />} label="Learning" />
        <NavItem icon={<Podcast size={20} />} label="Podcasts" />
      </nav>

      <SectionDivider />

      {/* More from YouTube */}
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

      {/* Settings / help */}
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
    </aside>
  );
}
