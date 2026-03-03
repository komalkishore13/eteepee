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

  const initials = user?.username?.slice(0, 2).toUpperCase() ?? "YT";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 h-14 bg-white border-b border-transparent">
      {/* Left: Logo */}
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full hover:bg-[#f2f2f2] transition">
          <Menu size={20} className="text-[#0f0f0f]" />
        </button>

        <Link href="/" className="flex items-center gap-1 shrink-0">
          {/* YouTube logo SVG */}
          <svg viewBox="0 0 90 20" className="h-5" aria-label="YouTube">
            <g>
              <path
                d="M27.9727 3.12324C27.6435 1.89323 26.6768 0.926623 25.4468 0.597366C23.2197 0 14.285 0 14.285 0C14.285 0 5.35042 0 3.12323 0.597366C1.89323 0.926623 0.926623 1.89323 0.597366 3.12324C0 5.35042 0 10 0 10C0 10 0 14.6496 0.597366 16.8768C0.926623 18.1068 1.89323 19.0734 3.12323 19.4026C5.35042 20 14.285 20 14.285 20C14.285 20 23.2197 20 25.4468 19.4026C26.6768 19.0734 27.6435 18.1068 27.9727 16.8768C28.5701 14.6496 28.5701 10 28.5701 10C28.5701 10 28.5677 5.35042 27.9727 3.12324Z"
                fill="#FF0000"
              />
              <path
                d="M11.4253 14.2854L18.8477 10.0004L11.4253 5.71533V14.2854Z"
                fill="white"
              />
            </g>
            <g>
              <path d="M34.6024 13.0036L31.3945 1.41846H34.1932L35.3889 6.4809C35.7182 7.79808 35.9628 8.93685 36.1243 9.89508H36.2166C36.3297 9.24997 36.5744 8.11119 36.9530 6.4809L38.2084 1.41846H41.0071L37.7362 13.0036V18.561H34.6001V13.0036H34.6024Z" fill="#0f0f0f"/>
              <path d="M41.4697 18.1937C40.9053 17.8127 40.5031 17.22 40.2632 16.4157C40.0257 15.6114 39.9058 14.5437 39.9058 13.2078V11.3898C39.9058 10.0422 40.0422 8.96995 40.3174 8.1680C40.5926 7.36606 41.0257 6.7734 41.6134 6.38051C42.2011 5.98991 42.9781 5.79459 43.9443 5.79459C44.8952 5.79459 45.6556 5.99228 46.2286 6.38996C46.8016 6.78763 47.2187 7.38291 47.4792 8.1680C47.7396 8.95537 47.8721 10.0422 47.8721 11.3898V13.2078C47.8721 14.5437 47.7444 15.6161 47.4909 16.4251C47.2374 17.2365 46.8297 17.8292 46.2696 18.2011C45.7094 18.5731 44.9227 18.7591 43.9025 18.7591C42.8448 18.7591 42.0342 18.5707 41.4697 18.1937ZM44.6552 16.2906C44.7946 15.9072 44.8645 15.2967 44.8645 14.4665V10.1326C44.8645 9.32826 44.7946 8.72998 44.6552 8.34887C44.5157 7.96775 44.2698 7.77713 43.9166 7.77713C43.5757 7.77713 43.3345 7.96775 43.1974 8.34887C43.0604 8.72998 42.9917 9.32826 42.9917 10.1326V14.4665C42.9917 15.2967 43.0581 15.9072 43.1904 16.2906C43.3228 16.674 43.5617 16.8646 43.9025 16.8646C44.2433 16.8646 44.4846 16.674 44.6552 16.2906Z" fill="#0f0f0f"/>
              <path d="M64.4755 3.68758H61.5397V18.5629H58.6732V3.68758H55.7374V1.41846H64.4755V3.68758Z" fill="#0f0f0f"/>
            </g>
          </svg>
        </Link>
      </div>

      {/* Center: Search bar */}
      <div className="hidden sm:flex items-center flex-1 max-w-[600px] mx-4">
        <div className="flex flex-1 items-center border border-[#ccc] rounded-l-full overflow-hidden focus-within:border-[#1c62b9] focus-within:shadow-[0_0_0_1px_rgba(28,98,185,0.5)]">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search"
            className="flex-1 px-4 py-2 text-sm outline-none bg-white text-[#0f0f0f] placeholder:text-[#909090]"
          />
        </div>
        <button className="flex items-center justify-center w-16 h-10 bg-[#f8f8f8] border border-l-0 border-[#ccc] rounded-r-full hover:bg-[#e5e5e5] transition">
          <Search size={18} className="text-[#0f0f0f]" />
        </button>
        <button className="ml-2 w-10 h-10 flex items-center justify-center rounded-full bg-[#f2f2f2] hover:bg-[#e5e5e5] transition">
          <Mic size={18} className="text-[#0f0f0f]" />
        </button>
      </div>

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
