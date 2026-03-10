import { Video } from "lucide-react";

export default function YourVideosPage() {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
      <div className="w-24 h-24 rounded-full bg-[#f2f2f2] flex items-center justify-center mb-4">
        <Video size={40} className="text-[#909090]" />
      </div>
      <h1 className="text-xl font-medium text-[#0f0f0f]">No content available</h1>
      <p className="text-sm text-[#606060] mt-2 max-w-md">
        Videos you upload will show up here. Start creating and sharing your content with the world.
      </p>
    </div>
  );
}
