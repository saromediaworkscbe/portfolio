import { useEffect, useRef, useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";

const reels = [
  { src: "/videos/saro.mp4", poster: "/images/person.jpeg" },
  { src: "/videos/v-2.mp4", poster: "/images/person-2.jpeg" },
];

function ReelVideo({ src, poster }) {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);

  // Only autoplay once the video actually scrolls into view — these files
  // are 50-80MB each, no reason to start pulling that data on page load.
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="group relative aspect-video w-full border border-line bg-ink overflow-hidden">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted={muted}
        loop
        playsInline
        preload="metadata"
        className="h-full w-full object-cover"
      />

      <button
        onClick={() => setMuted((m) => !m)}
        aria-label={muted ? "Unmute" : "Mute"}
        className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full border border-bone/50 bg-ink/70 text-bone transition-colors hover:border-signal hover:text-signal"
      >
        {muted ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4">
            <path d="M4 9v6h4l5 4V5L8 9H4Z" />
            <path d="m16 9 5 6M21 9l-5 6" strokeLinecap="round" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4">
            <path d="M4 9v6h4l5 4V5L8 9H4Z" />
            <path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12" strokeLinecap="round" />
          </svg>
        )}
      </button>
    </div>
  );
}

export default function Showreel() {
  return (
    <section id="showreel" className="px-5 md:px-10 py-24 md:py-32 border-t border-line">
      <SectionHeading slate="SHOWREEL" title="Watch the Reel" />

      <div className="grid gap-6 md:grid-cols-2 max-w-6xl mx-auto">
        {reels.map((reel) => (
          <ReelVideo key={reel.src} src={reel.src} poster={reel.poster} />
        ))}
      </div>
    </section>
  );
}
