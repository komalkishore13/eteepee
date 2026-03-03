"use client";

import { useRef } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

const CATEGORIES = [
  "All",
  "Music",
  "Gaming",
  "Mixes",
  "React",
  "JavaScript",
  "Next.js",
  "TypeScript",
  "Databases",
  "Live",
  "News",
  "Computer programming",
  "Podcasts",
  "Comedy",
  "Sports",
  "Fashion",
  "Cooking",
  "Recently uploaded",
  "Watched",
  "New to you",
];

interface CategoryPillsProps {
  active: string;
  onSelect: (category: string) => void;
}

export default function CategoryPills({ active, onSelect }: CategoryPillsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  function scroll(direction: "left" | "right") {
    if (!scrollRef.current) return;
    const amount = 240;
    scrollRef.current.scrollBy({
      left: direction === "right" ? amount : -amount,
      behavior: "smooth",
    });
  }

  return (
    <div className="relative flex items-center gap-2">
      {/* Left arrow */}
      <button
        onClick={() => scroll("left")}
        className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#f2f2f2] transition"
        aria-label="Scroll left"
      >
        <ChevronLeft size={18} />
      </button>

      {/* Pills scroll area */}
      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto flex-1"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            className={`shrink-0 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              active === cat
                ? "bg-[#0f0f0f] text-white"
                : "bg-[#f2f2f2] text-[#0f0f0f] hover:bg-[#e5e5e5]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Right arrow */}
      <button
        onClick={() => scroll("right")}
        className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#f2f2f2] transition"
        aria-label="Scroll right"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
