import { mockVideos } from "@/data/videos";
import VideoCard from "@/components/youtube/VideoCard";

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = (q ?? "").trim().toLowerCase();

  const results = query
    ? mockVideos.filter(
        (v) =>
          v.title.toLowerCase().includes(query) ||
          v.channelName.toLowerCase().includes(query) ||
          v.category.toLowerCase().includes(query)
      )
    : mockVideos;

  return (
    <div className="px-4 py-6 max-w-[1200px]">
      {query && (
        <p className="text-sm text-[#606060] mb-4">
          {results.length > 0
            ? `About ${results.length} results for "${q}"`
            : `No results found for "${q}"`}
        </p>
      )}

      {results.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <p className="text-xl font-medium text-[#0f0f0f]">No results found</p>
          <p className="text-sm text-[#606060] mt-2">
            Try different keywords or check your spelling
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {results.map((video) => (
            <div key={video.id} className="flex gap-4 group">
              <VideoCard video={video} compact />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
