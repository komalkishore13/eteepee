"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Search,
  Mic,
  Bell,
  Video,
  Menu,
  ChevronRight,
  LogOut,
  User,
} from "lucide-react";
import type { JWTPayload } from "@/lib/jwt";

interface HeaderProps {
  user: JWTPayload | null;
}

export default function Header({ user }: HeaderProps) {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowUserMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = searchValue.trim();
    if (q) router.push(`/search?q=${encodeURIComponent(q)}`);
  }

  const initials = user?.username?.slice(0, 2).toUpperCase() ?? "YT";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 h-14 bg-white border-b border-transparent">
      {/* Left: Logo */}
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full hover:bg-[#f2f2f2] transition">
          <Menu size={20} className="text-[#0f0f0f]" />
        </button>

        <Link href="/" className="flex items-center gap-1.5 shrink-0">
          <svg viewBox="0 0 28 20" className="h-5" aria-hidden="true">
            <path
              d="M27.9727 3.12324C27.6435 1.89323 26.6768 0.926623 25.4468 0.597366C23.2197 0 14.285 0 14.285 0C14.285 0 5.35042 0 3.12323 0.597366C1.89323 0.926623 0.926623 1.89323 0.597366 3.12324C0 5.35042 0 10 0 10C0 10 0 14.6496 0.597366 16.8768C0.926623 18.1068 1.89323 19.0734 3.12323 19.4026C5.35042 20 14.285 20 14.285 20C14.285 20 23.2197 20 25.4468 19.4026C26.6768 19.0734 27.6435 18.1068 27.9727 16.8768C28.5701 14.6496 28.5701 10 28.5701 10C28.5701 10 28.5677 5.35042 27.9727 3.12324Z"
              fill="#FF0000"
            />
            <path
              d="M11.4253 14.2854L18.8477 10.0004L11.4253 5.71533V14.2854Z"
              fill="white"
            />
          </svg>
          <span className="text-[#0f0f0f] font-semibold text-[1.1rem] tracking-tight">
            YouTube
          </span>
        </Link>
      </div>

      {/* Center: Search bar */}
      <form onSubmit={handleSearch} className="hidden sm:flex items-center flex-1 max-w-[600px] mx-4">
        <div className="flex flex-1 items-center border border-[#ccc] rounded-l-full overflow-hidden focus-within:border-[#1c62b9] focus-within:shadow-[0_0_0_1px_rgba(28,98,185,0.5)]">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search"
            className="flex-1 px-4 py-2 text-sm outline-none bg-white text-[#0f0f0f] placeholder:text-[#909090]"
          />
        </div>
        <button type="submit" className="flex items-center justify-center w-16 h-10 bg-[#f8f8f8] border border-l-0 border-[#ccc] rounded-r-full hover:bg-[#e5e5e5] transition">
          <Search size={18} className="text-[#0f0f0f]" />
        </button>
        <button type="button" className="ml-2 w-10 h-10 flex items-center justify-center rounded-full bg-[#f2f2f2] hover:bg-[#e5e5e5] transition">
          <Mic size={18} className="text-[#0f0f0f]" />
        </button>
      </form>

      {/* Right: Action icons */}
      <div className="flex items-center gap-1">
        {/* Mobile search */}
        <button className="sm:hidden p-2 rounded-full hover:bg-[#f2f2f2]">
          <Search size={20} />
        </button>

        {/* Create */}
        <button className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full hover:bg-[#f2f2f2] text-sm font-medium text-[#0f0f0f]">
          <Video size={18} />
          <span className="hidden lg:inline">Create</span>
        </button>

        {/* Notifications */}
        <button className="relative p-2 rounded-full hover:bg-[#f2f2f2] transition">
          <Bell size={20} className="text-[#0f0f0f]" />
          <span className="absolute top-1 right-1 w-4 h-4 bg-[#FF0000] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
            9
          </span>
        </button>

        {/* Avatar / User menu */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ml-1 transition hover:opacity-90"
            style={{ backgroundColor: "#FF0000" }}
            aria-label="User menu"
          >
            {initials}
          </button>

          {showUserMenu && (
            <div className="absolute right-0 top-11 w-64 bg-white rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.15)] border border-[#e5e5e5] py-2 z-50">
              {/* User info */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-[#e5e5e5]">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium shrink-0"
                  style={{ backgroundColor: "#FF0000" }}
                >
                  {initials}
                </div>
                <div className="overflow-hidden">
                  <p className="text-sm font-medium text-[#0f0f0f] truncate">
                    {user?.username}
                  </p>
                  <p className="text-xs text-[#606060] truncate">{user?.email}</p>
                  <a
                    href="#"
                    className="text-xs text-[#065fd4] hover:text-[#065fd4]/80"
                  >
                    Manage your account
                  </a>
                </div>
              </div>

              {/* Menu items */}
              <div className="py-1">
                <button className="flex items-center gap-3 w-full px-4 py-2.5 hover:bg-[#f2f2f2] text-sm text-[#0f0f0f]">
                  <User size={18} className="text-[#0f0f0f]" />
                  Your channel
                  <ChevronRight size={16} className="ml-auto text-[#606060]" />
                </button>
                <div className="my-1 border-t border-[#e5e5e5]" />
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full px-4 py-2.5 hover:bg-[#f2f2f2] text-sm text-[#0f0f0f]"
                >
                  <LogOut size={18} className="text-[#0f0f0f]" />
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
