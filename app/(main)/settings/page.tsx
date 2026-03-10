"use client";

import { useState } from "react";
import {
  Bell, Lock, Eye, Subtitles, SlidersHorizontal,
  Smartphone, Flag, HelpCircle, ChevronRight,
} from "lucide-react";

const SECTIONS = [
  {
    id: "notifications",
    icon: <Bell size={20} />,
    label: "Notifications",
    desc: "Manage your notification preferences",
  },
  {
    id: "privacy",
    icon: <Lock size={20} />,
    label: "Privacy",
    desc: "Control your search and watch history",
  },
  {
    id: "appearance",
    icon: <Eye size={20} />,
    label: "Appearance",
    desc: "Customise how YouTube looks to you",
  },
  {
    id: "language",
    icon: <Subtitles size={20} />,
    label: "Language & region",
    desc: "Set your language, region, and content location",
  },
  {
    id: "playback",
    icon: <SlidersHorizontal size={20} />,
    label: "Playback & performance",
    desc: "Manage video quality and performance settings",
  },
  {
    id: "connected",
    icon: <Smartphone size={20} />,
    label: "Connected apps",
    desc: "Manage apps and devices connected to your account",
  },
  {
    id: "billing",
    icon: <Flag size={20} />,
    label: "Billing & payments",
    desc: "Manage your purchases and subscriptions",
  },
  {
    id: "advanced",
    icon: <HelpCircle size={20} />,
    label: "Advanced settings",
    desc: "Data and personalisation, accessibility, and more",
  },
];

// Per-section settings panels
const PANELS: Record<string, React.ReactNode> = {
  notifications: (
    <div className="space-y-4">
      {[
        ["Subscriptions",         "Notify me of new uploads from channels I subscribe to"],
        ["Recommended videos",    "Notify me about videos YouTube recommends for me"],
        ["Activity on my channel","Likes, comments, and new subscribers"],
        ["Activity on my comments","Replies and likes on my comments"],
      ].map(([label, sub]) => (
        <Toggle key={label as string} label={label as string} sub={sub as string} />
      ))}
    </div>
  ),
  privacy: (
    <div className="space-y-4">
      {[
        ["Keep all my saved playlists private",  "Others can't see playlists you save"],
        ["Keep all my subscriptions private",     "Others can't see who you subscribe to"],
        ["Pause watch history",                   "Videos won't be saved to your watch history"],
        ["Pause search history",                  "Searches won't be saved to your search history"],
      ].map(([label, sub]) => (
        <Toggle key={label as string} label={label as string} sub={sub as string} />
      ))}
    </div>
  ),
  appearance: (
    <div className="space-y-4">
      {[
        ["Dark theme",          "Use dark background across YouTube"],
        ["Ambient mode",        "Extend the video's colours into the page"],
        ["Hide shorts on home", "Don't show Shorts on the Home feed"],
      ].map(([label, sub]) => (
        <Toggle key={label as string} label={label as string} sub={sub as string} />
      ))}
    </div>
  ),
  playback: (
    <div className="space-y-4">
      {[
        ["Always play HD on fullscreen", "Use highest quality when watching fullscreen"],
        ["Autoplay next video",          "Automatically play the next recommended video"],
        ["Annotations",                  "Show interactive cards and end screens"],
      ].map(([label, sub]) => (
        <Toggle key={label as string} label={label as string} sub={sub as string} defaultOn />
      ))}
    </div>
  ),
};

function Toggle({ label, sub, defaultOn = false }: { label: string; sub: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex items-start justify-between gap-4 py-2">
      <div>
        <p className="text-sm font-medium text-[#0f0f0f]">{label}</p>
        <p className="text-xs text-[#606060] mt-0.5">{sub}</p>
      </div>
      <button
        onClick={() => setOn(v => !v)}
        className={`relative shrink-0 w-11 h-6 rounded-full transition-colors ${on ? "bg-[#065fd4]" : "bg-[#ccc]"}`}
        aria-checked={on}
        role="switch"
      >
        <span
          className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${on ? "translate-x-5" : "translate-x-0.5"}`}
        />
      </button>
    </div>
  );
}

export default function SettingsPage() {
  const [active, setActive] = useState<string | null>(null);
  const activeSection = SECTIONS.find(s => s.id === active);

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-semibold text-[#0f0f0f] mb-6">Settings</h1>

      <div className="flex gap-6">
        {/* left list */}
        <div className="w-64 shrink-0 space-y-0.5">
          {SECTIONS.map(s => (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              className={`flex items-center gap-3 w-full px-3 py-3 rounded-xl text-sm font-medium transition-colors text-left ${
                active === s.id
                  ? "bg-[#065fd4]/10 text-[#065fd4]"
                  : "hover:bg-[#f2f2f2] text-[#0f0f0f]"
              }`}
            >
              <span className={active === s.id ? "text-[#065fd4]" : "text-[#606060]"}>{s.icon}</span>
              <span className="flex-1 truncate">{s.label}</span>
              <ChevronRight size={16} className="text-[#ccc] shrink-0" />
            </button>
          ))}
        </div>

        {/* right panel */}
        <div className="flex-1 border border-[#e5e5e5] rounded-2xl p-5 min-h-[300px]">
          {active && activeSection ? (
            <>
              <h2 className="text-base font-semibold text-[#0f0f0f] mb-1">{activeSection.label}</h2>
              <p className="text-sm text-[#606060] mb-5">{activeSection.desc}</p>
              {PANELS[active] ?? (
                <p className="text-sm text-[#606060]">No settings available for this section yet.</p>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full gap-2 text-center pt-12">
              <SlidersHorizontal size={36} className="text-[#ccc]" />
              <p className="text-sm font-medium text-[#606060]">Select a setting from the left</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
