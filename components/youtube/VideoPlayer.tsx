"use client";

interface VideoPlayerProps {
  youtubeId: string;
  title: string;
}

export default function VideoPlayer({ youtubeId, title }: VideoPlayerProps) {
  return (
    <div className="w-full aspect-video rounded-xl overflow-hidden bg-black">
      <iframe
        src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="w-full h-full"
      />
    </div>
  );
}
