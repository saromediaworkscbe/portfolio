import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SITE } from "@/lib/constants";

gsap.registerPlugin(useGSAP);

export default function Hero() {
  const hero = useRef(null);

  // GSAP intro — name/tagline slide out of a clipped mask, then meta fades in.
  useGSAP(
    () => {
      gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .from(".hero-line", { yPercent: 110, duration: 1.1, stagger: 0.12, delay: 0.35 })
        .from(".hero-meta", { opacity: 0, y: 16, duration: 0.7, stagger: 0.08 }, "-=0.5")
        .from(".hero-photo", { opacity: 0, scale: 1.06, duration: 1.3 }, "-=1.1");
    },
    { scope: hero }
  );

  const scrollToProjects = () =>
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="home" ref={hero} className="relative w-full overflow-hidden bg-ink">
      <div className="grid lg:grid-cols-2 lg:h-screen">
        {/* ---- Text panel ---- */}
        <div
          className="relative z-10 flex flex-col justify-between gap-16 px-5 md:px-10 lg:px-14 pt-28 pb-16 lg:pt-32 lg:pb-16 [container-type:inline-size]"
        >
          <div className="hero-meta flex items-center justify-between">
            <span className="tc">{SITE.location}</span>
            {/* <span className="tc hidden sm:inline">Reel 001</span> */}
          </div>

          <div>
            <h1 className="m-0">
              <span className="block overflow-hidden">
                <span className="hero-line display-wide block text-[clamp(2.6rem,15cqw,5.5rem)] leading-[0.9]">
                  {SITE.name}
                </span>
              </span>
            </h1>
            <span className="block overflow-hidden mt-2">
              <span className="hero-line display-narrow block text-mute text-[clamp(1.1rem,5.5cqw,1.75rem)]">
                {SITE.tagline}
              </span>
            </span>
            <p className="hero-meta font-display italic text-signal text-sm md:text-base mt-7 max-w-xs">
              Stories shot in real light.
            </p>
          </div>

          <div className="hero-meta flex flex-col sm:flex-row sm:items-center gap-5">
            <button
              onClick={scrollToProjects}
              className="tc inline-flex w-fit items-center gap-3 border border-line px-5 py-3 text-bone hover:border-signal hover:text-signal transition-colors"
            >
              View projects <span aria-hidden>↓</span>
            </button>
            <p className="max-w-xs text-sm text-mute leading-relaxed">
              Documentary, commercial and music-video work — from first
              location scout to final grade.
            </p>
          </div>
        </div>

        {/* ---- Photo panel ---- */}
        <div className="relative h-[60vh] lg:h-full overflow-hidden">
          <img
            className="hero-photo absolute inset-0 h-full w-full object-cover"
            src="/images/person.jpeg"
            alt="A classical dancer caught mid-gesture at golden hour, on location in the hills."
            loading="eager"
          />
          <span className="absolute top-20 right-4 md:top-24 md:right-6 tc bg-ink/70 px-2 py-1">
            On location
          </span>
        </div>
      </div>

      <div className="relative z-10 inset-x-5 md:inset-x-10 sprocket" />
    </section>
  );
}
