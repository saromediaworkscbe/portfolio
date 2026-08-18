import { useRef, useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Showreel() {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const play = () => {
    setPlaying(true);
    videoRef.current?.play();
  };

  return (
    <section id="showreel" className="px-5 md:px-10 py-24 md:py-32 border-t border-line">
      <SectionHeading slate="SHOWREEL" title="Watch the Reel" />

      <div className="relative aspect-video max-w-6xl mx-auto border border-line bg-ink overflow-hidden group">
        <video
          ref={videoRef}
          src="/videos/saro.mp4"
          poster="/images/person-2.jpeg"
          controls={playing}
          playsInline
          preload="none"
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
          className="h-full w-full object-cover"
        />

        {!playing && (
          <button
            onClick={play}
            aria-label="Play showreel"
            className="absolute inset-0 flex flex-col items-center justify-center gap-5 bg-ink/40 transition-colors hover:bg-ink/25"
          >
            <span className="flex h-20 w-20 items-center justify-center rounded-full border border-bone/70 bg-ink/60 transition-colors group-hover:border-signal group-hover:text-signal">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7 translate-x-0.5">
                <path d="M8 5v14l11-7Z" />
              </svg>
            </span>
            <span className="tc bg-ink/70 px-2 py-1">Play Showreel</span>
          </button>
        )}
      </div>
    </section>
  );
}
