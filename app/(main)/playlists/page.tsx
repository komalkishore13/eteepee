import { mockVideos } from "@/data/videos";
import Image from "next/image";
import Link from "next/link";

export default function PlaylistsPage() {
  // Simulate playlists from video categories
  const categories = [...new Set(mockVideos.map((v) => v.category))];
  const playlists = categories.map((cat) => ({
    name: cat,
    videos: mockVideos.filter((v) => v.category === cat),
  }));

  return (
    <div className="px-4 py-6">
      <h1 className="text-2xl font-bold text-[#0f0f0f] mb-6">Playlists</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {playlists.map((playlist) => (
          <div key={playlist.name} className="group">
            <Link href={`/search?q=${encodeURIComponent(playlist.name)}`}>
              <div className="relative aspect-video rounded-xl overflow-hidden bg-[#f2f2f2]">
                <Image
                  src={playlist.videos[0].thumbnail}
                  alt={playlist.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-200"
                  unoptimized
                />
                <div className="absolute inset-y-0 right-0 w-1/3 bg-black/60 flex flex-col items-center justify-center">
                  <span className="text-white text-lg font-bold">{playlist.videos.length}</span>
                  <span className="text-white/80 text-xs">videos</span>
                </div>
              </div>
              <h3 className="mt-2 text-sm font-medium text-[#0f0f0f]">{playlist.name}</h3>
              <p className="text-xs text-[#606060]">{playlist.videos.length} videos</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
