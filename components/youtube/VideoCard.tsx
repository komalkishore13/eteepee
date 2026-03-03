"use client";

import Image from "next/image";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import type { Video } from "@/types";

interface VideoCardProps {
  video: Video;
  compact?: boolean;
}

export default function VideoCard({ video, compact = false }: VideoCardProps) {
  if (compact) {
    return (
      <Link href={`/watch/${video.id}`} className="flex gap-2 group">
        <div className="relative w-40 shrink-0 aspect-video rounded-lg overflow-hidden bg-[#f2f2f2]">
          <Image
            src={video.thumbnail}
            alt={video.title}
            fill
            sizes="160px"
            className="object-cover"
            unoptimized
          />
          <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] font-medium px-1 py-0.5 rounded">
            {video.duration}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-[#0f0f0f] line-clamp-2 leading-5 group-hover:text-[#065fd4]">
            {video.title}
          </h4>
          <p className="text-xs text-[#606060] mt-1">{video.channelName}</p>
          <p className="text-xs text-[#606060]">
            {video.views} · {video.uploadedAt}
          </p>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/watch/${video.id}`} className="group cursor-pointer block">
      {/* Thumbnail */}
      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-[#f2f2f2]">
        <Image
          src={video.thumbnail}
          alt={video.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-200 group-hover:scale-105"
          unoptimized
        />
        {/* Duration badge */}
        <span className="absolute bottom-1.5 right-1.5 bg-black/80 text-white text-xs font-medium px-1.5 py-0.5 rounded">
          {video.duration}
        </span>
      </div>

      {/* Info row */}
      <div className="flex gap-3 mt-3">
        {/* Channel avatar */}
        <div className="shrink-0 mt-0.5">
          <Image
            src={video.channelAvatar}
            alt={video.channelName}
            width={36}
            height={36}
            className="w-9 h-9 rounded-full object-cover"
            unoptimized
          />
        </div>

        {/* Text info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-[#0f0f0f] line-clamp-2 leading-5">
            {video.title}
          </h3>
          <div className="mt-1 flex items-center gap-1">
            <span className="text-xs text-[#606060] hover:text-[#0f0f0f] cursor-pointer">
              {video.channelName}
            </span>
            {video.channelVerified && (
              <CheckCircle2
                size={12}
                className="text-[#606060] shrink-0"
                strokeWidth={2.5}
              />
            )}
          </div>
          <p className="text-xs text-[#606060] mt-0.5">
            {video.views} · {video.uploadedAt}
          </p>
        </div>
      </div>
    </Link>
  );
}
