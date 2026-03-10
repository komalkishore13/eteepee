import Image from "next/image";

const PREVIEW_THUMBNAILS = [
  { src: "https://i.ytimg.com/vi/se50viFJ0AQ/hqdefault.jpg",  position: "top-0 left-0",    size: "w-[220px] h-[140px]", rotate: "-rotate-3"  },
  { src: "https://i.ytimg.com/vi/ldSVhw1Nv50/hqdefault.jpg", position: "bottom-0 left-0", size: "w-[180px] h-[260px]", rotate: "rotate-2"   },
  { src: "https://i.ytimg.com/vi/dFzmJLWGmys/hqdefault.jpg", position: "top-0 right-0",   size: "w-[220px] h-[140px]", rotate: "rotate-3"   },
  { src: "https://i.ytimg.com/vi/JfbnpYLe3Ms/hqdefault.jpg", position: "bottom-0 right-0",size: "w-[180px] h-[260px]", rotate: "-rotate-2"  },
];

const FEATURES = [
  {
    icon: "🚫",
    title: "Ad-free videos",
    desc: "Enjoy millions of videos without a single ad interrupting your viewing experience.",
  },
  {
    icon: "📥",
    title: "Offline downloads",
    desc: "Save videos and playlists to watch on the go, even without an internet connection.",
  },
  {
    icon: "🎵",
    title: "YouTube Music Premium",
    desc: "Listen to ad-free music, download tracks, and play in the background.",
  },
  {
    icon: "📱",
    title: "Background play",
    desc: "Keep videos and music playing even when you switch apps or lock your screen.",
  },
];

export default function YoutubePremiumPage() {
  return (
    <div className="min-h-full bg-[#0f0f0f] text-white overflow-x-hidden">

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[540px] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#1a1a2e] via-[#16213e] to-[#0f0f0f]">

        {/* corner thumbnails */}
        {PREVIEW_THUMBNAILS.map((t, i) => (
          <div
            key={i}
            className={`absolute ${t.position} ${t.size} ${t.rotate} rounded-xl overflow-hidden opacity-70 shadow-2xl hidden lg:block`}
          >
            <Image src={t.src} alt="" fill className="object-cover" unoptimized />
          </div>
        ))}

        {/* center content */}
        <div className="relative z-10 flex flex-col items-center text-center px-6 py-16 max-w-xl mx-auto">
          {/* YouTube Premium logo */}
          <div className="flex items-center gap-2 mb-6">
            <svg viewBox="0 0 90 20" className="h-6" aria-hidden>
              <path d="M27.97 3.12C27.64 1.89 26.68.93 25.45.6 23.22 0 14.29 0 14.29 0S5.35 0 3.12.6C1.89.93.93 1.89.6 3.12 0 5.35 0 10 0 10s0 4.65.6 6.88c.33 1.23 1.29 2.19 2.52 2.52C5.35 20 14.29 20 14.29 20s8.93 0 11.16-.6c1.23-.33 2.19-1.29 2.52-2.52C28.57 14.65 28.57 10 28.57 10s0-4.65-.6-6.88z" fill="#FF0000"/>
              <path d="M11.43 14.29L18.86 10l-7.43-4.29v8.58z" fill="#fff"/>
            </svg>
            <span className="text-white font-semibold text-lg tracking-tight">YouTube Premium</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Enjoy your favourite<br />creators ad-free
          </h1>

          <p className="text-white/70 text-base mb-2">
            YouTube and YouTube Music ad-free, offline, and in the background
          </p>
          <p className="text-white/50 text-sm mb-8">
            Prepaid and monthly plans available. Starts at ₹89.00/month. Benefits vary by plan
          </p>

          <a
            href="https://www.youtube.com/premium"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#3ea6ff] hover:bg-[#65b8ff] text-black font-semibold px-8 py-3 rounded-full text-base transition-colors"
          >
            Get YouTube Premium
          </a>

          <p className="mt-4 text-white/50 text-sm">
            Or save money with a{" "}
            <a
              href="https://www.youtube.com/premium"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#3ea6ff] hover:underline"
            >
              shared or student plan
            </a>
          </p>
          <p className="mt-2 text-white/30 text-xs">Restrictions apply.</p>
        </div>
      </section>

      {/* ── Social proof ───────────────────────────────────────────────────── */}
      <section className="bg-[#0f0f0f] py-12 text-center border-t border-white/10">
        <h2 className="text-3xl md:text-4xl font-bold">
          Join over 125 million Premium members
        </h2>
        <p className="text-white/50 mt-3 text-base">
          Millions of people already enjoy an uninterrupted YouTube experience.
        </p>
      </section>

      {/* ── Features grid ──────────────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {FEATURES.map(f => (
          <div
            key={f.title}
            className="bg-[#1a1a1a] rounded-2xl p-6 flex gap-4 items-start border border-white/5 hover:border-white/10 transition-colors"
          >
            <span className="text-3xl">{f.icon}</span>
            <div>
              <h3 className="text-white font-semibold text-base mb-1">{f.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{f.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* ── CTA footer ─────────────────────────────────────────────────────── */}
      <section className="text-center py-14 bg-gradient-to-t from-[#1a1a2e] to-[#0f0f0f]">
        <h2 className="text-2xl font-bold mb-4">Ready to go Premium?</h2>
        <a
          href="https://www.youtube.com/premium"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-[#3ea6ff] hover:bg-[#65b8ff] text-black font-semibold px-8 py-3 rounded-full text-base transition-colors"
        >
          Try it free
        </a>
      </section>
    </div>
  );
}
