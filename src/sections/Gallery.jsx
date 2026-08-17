import { useEffect, useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import { useGsapReveal } from "@/hooks/useGsapReveal";
import { gallery } from "@/data/gallery";

export default function Gallery() {
  const container = useGsapReveal(".gallery-item");
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (active === null) return;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  return (
    <section id="gallery" ref={container} className="px-5 md:px-10 pt-24 pb-12 md:py-32 border-t border-line pb-0">
      <SectionHeading slate="B-ROLL" title="Gallery" />

      <div
        className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3  p-2 md:p-3
          grid-flow-dense auto-rows-[150px] sm:auto-rows-[170px]
          [&>a:nth-of-type(2)]:row-span-2
          [&>a:nth-of-type(3)]:col-span-2"
      >
        {gallery.map((shot, i) => (
          <a
            key={shot.src}
            href={shot.src}
            onClick={(e) => {
              e.preventDefault();
              setActive(i);
            }}
            tabIndex={active === null ? 0 : -1}
            className="gallery-item group relative block overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-signal"
          >
            <img
              src={shot.src}
              alt={shot.alt}
              loading="lazy"
              className="h-full w-full object-cover grayscale brightness-[0.65] transition-all duration-500 ease-out group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-110 group-focus:grayscale-0 group-focus:brightness-100"
            />
          </a>
        ))}
      </div>

      {active !== null && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center px-6 md:px-16 bg-ink/85 backdrop-blur-sm"
          onClick={() => setActive(null)}
        >
          <button
            aria-label="Close overlay"
            onClick={() => setActive(null)}
            className="absolute top-5 right-5 md:top-8 md:right-8 text-bone/70 hover:text-signal transition-colors"
          >
            <svg viewBox="-50 -50 100 100" width="32" height="32">
              <g fill="none" stroke="currentColor" strokeWidth="20" strokeLinecap="round">
                <path transform="rotate(45)" d="M -40 0 h 80 m -40 -40 v 80" />
              </g>
            </svg>
          </button>

          <img
            src={gallery[active].src}
            alt={gallery[active].alt}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] max-w-full object-contain border border-line"
          />

          <p className="tc absolute bottom-6 left-1/2 -translate-x-1/2">
            <span className="text-signal">{String(active + 1).padStart(2, "0")}</span> /{" "}
            {String(gallery.length).padStart(2, "0")}
          </p>
        </div>
      )}
    </section>
  );
}
