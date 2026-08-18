import SectionHeading from "@/components/ui/SectionHeading";
import { useGsapReveal } from "@/hooks/useGsapReveal";
import { projects } from "@/data/projects";

const beats = [
  { tc: "THE BEGINNING", label: "2019", text: "Started my professional journey in visual media, developing experience across graphic design, photography, videography and creative production." },
  { tc: "PROCESS", label: "2019 – 2021", text: "Worked across various companies and events in photography, branding, and visual content creation." },
  { tc: "JOINED KPRIET", label: "2021 - present", text: "Joined KPR Institute of Engineering and Technology as a Visual media Specialist and expanded my role into photography, videography, video editing, branding and institutional media production." },
  // { tc: "09:03", label: "2026", text: "Now directing and shooting for brands, artists and NGOs across South India." },
];

const stats = [
  { value: `${new Date().getFullYear() - 2018}+`, label: "Years Experience" },
  // { value: String(projects.length).padStart(2, "0"), label: "Years at KPRIET" },
   { value: "5+", label: "Years at KPRIET" },
  // { value: String(beats.length).padStart(2, "0"), label: "Chapters" },
  { value: "5", label: "Core Disciplines" },
];

export default function About() {
  const container = useGsapReveal("[data-reveal]");

  return (
    <section id="about" ref={container} className="px-5 md:px-10 py-24 md:py-32 border-t border-line">
      <div className="mx-auto max-w-6xl">
        <SectionHeading slate="DIRECTOR'S STATEMENT" title="About" />
      </div>

      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 max-w-6xl min-w-0 mx-auto">
        {/* ---- Portrait + pull quote ---- */}
        <div
          data-reveal
          className="group relative aspect-[4/5] lg:aspect-auto lg:h-full min-h-[420px] overflow-hidden border border-line"
        >
          <img
            src="/images/p-8.jpeg"
            alt="A bride's reflection caught in a mirror, black and white."
            loading="lazy"
            className="h-full w-full object-cover grayscale brightness-[0.75] transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" />

          <span className="absolute top-4 left-4 tc bg-ink/70 px-2 py-1">On set</span>

          <p className="absolute bottom-6 left-6 right-6 display-wide text-2xl md:text-3xl leading-[0.95]">
            "I make films that <span className="text-signal">trust their locations</span>."
          </p>
        </div>

        {/* ---- Bio, stats, career reel ---- */}
        <div className="flex flex-col min-w-0">
          <p data-reveal className="text-mute leading-relaxed mb-10">
            I create visual stories that connect people, brands and experiences through photography, videography, video editing and graphic design. From capturing important moments to building complete visual campaigns, I turn ideas into engaging and purposeful content.
          </p>

          <div data-reveal className="grid grid-cols-3 gap-x-3 border-t border-line pt-6 mb-14">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="display-narrow text-3xl md:text-4xl text-signal">{s.value}</p>
                <p className="tc mt-2 leading-relaxed">{s.label}</p>
              </div>
            ))}
          </div>

          {/* ---- Career reel — horizontal filmstrip ---- */}
          <div data-reveal>
            <p className="tc mb-3">Career reel</p>
            <div className="sprocket mb-3" />

            <div className="no-scrollbar flex gap-4 overflow-x-auto snap-x snap-mandatory pb-1 lg:grid lg:grid-cols-3 lg:overflow-visible lg:pb-0">
              {beats.map((beat, i) => (
                <div
                  key={beat.tc}
                  className="group snap-start shrink-0 w-64 lg:w-full border border-line bg-smoke p-5 hover:border-signal/60 transition-colors"
                >
                  <p className="font-mono text-[10px] text-mute tabular-nums mb-3">
                    {String(i + 1).padStart(2, "0")}/{String(beats.length).padStart(2, "0")} —{" "}
                    <span className="text-signal">{beat.tc}</span>
                  </p>
                  <p className="display-narrow text-xl mb-1 group-hover:text-signal transition-colors">
                    {beat.label}
                  </p>
                  <p className="text-[12px] text-mute leading-relaxed">{beat.text}</p>
                </div>
              ))}
            </div>

            <div className="sprocket mt-3" />
          </div>
        </div>
      </div>
    </section>
  );
}
