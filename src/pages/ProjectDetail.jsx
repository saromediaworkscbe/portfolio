import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { projects } from "@/data/projects";

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);
  const [active, setActive] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setActive(null);
  }, [id]);

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

  if (!project) {
    return (
      <section className="px-5 md:px-10 py-32 text-center">
        <p className="tc text-signal mb-4">404</p>
        <h1 className="display-wide text-4xl md:text-6xl mb-8">Scene not found</h1>
        <Link to="/" className="tc border border-line px-5 py-3 hover:border-signal hover:text-signal transition-colors">
          ← Back to reel
        </Link>
      </section>
    );
  }

  const otherProjects = projects.filter((p) => p.id !== project.id);

  return (
    <article className="px-5 md:px-10 py-24 md:py-32">
      <div className="max-w-6xl mx-auto">
        <Link
          to="/"
          className="tc inline-flex items-center gap-2 text-mute hover:text-signal transition-colors mb-12"
        >
          <span aria-hidden>←</span> All projects
        </Link>

        <div className="flex items-center gap-3 mb-4">
          <span className="tc text-signal">{project.index}</span>
          <div className="sprocket flex-1" />
          <span className="font-mono text-xs text-mute tabular-nums">{project.year}</span>
        </div>

        <h1 className="display-wide text-5xl md:text-7xl mb-6">{project.title}</h1>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-8">
          <p className="tc">{project.role}</p>
          <ul className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="font-mono text-[10px] uppercase tracking-widest text-mute border border-line px-2 py-1"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-lg text-mute leading-relaxed max-w-2xl mb-16">
          {project.description}
        </p>

        {/* ---- Every image for this project, fully visible ---- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-24">
          {project.images.map((src, i) => (
            <button
              key={src}
              onClick={() => setActive(i)}
              aria-label={`Open frame ${i + 1} of ${project.images.length}`}
              className="group relative aspect-[4/3] overflow-hidden border border-line focus:outline-none focus-visible:ring-2 focus-visible:ring-signal"
            >
              <img
                src={src}
                alt={`${project.title} — frame ${i + 1}`}
                loading={i === 0 ? "eager" : "lazy"}
                className="h-full w-full object-cover grayscale brightness-[0.85] transition-all duration-500 ease-out group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105 group-focus:grayscale-0 group-focus:brightness-100"
              />
            </button>
          ))}
        </div>

        {/* ---- Next up ---- */}
        <div className="border-t border-line pt-10">
          <p className="tc mb-6">More scenes</p>
          <div className="flex flex-wrap gap-4">
            {otherProjects.map((p) => (
              <Link
                key={p.id}
                to={`/projects/${p.id}`}
                className="tc border border-line px-5 py-3 hover:border-signal hover:text-signal transition-colors"
              >
                {p.title}
              </Link>
            ))}
          </div>
        </div>
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

          {project.images.length > 1 && (
            <>
              <button
                aria-label="Previous frame"
                onClick={(e) => {
                  e.stopPropagation();
                  setActive((active - 1 + project.images.length) % project.images.length);
                }}
                className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 text-bone/70 hover:text-signal transition-colors p-3"
              >
                <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M15 19 8 12l7-7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                aria-label="Next frame"
                onClick={(e) => {
                  e.stopPropagation();
                  setActive((active + 1) % project.images.length);
                }}
                className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 text-bone/70 hover:text-signal transition-colors p-3"
              >
                <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="m9 5 7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </>
          )}

          <img
            src={project.images[active]}
            alt={`${project.title} — frame ${active + 1}`}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] max-w-full object-contain border border-line"
          />

          <p className="tc absolute bottom-6 left-1/2 -translate-x-1/2">
            <span className="text-signal">{String(active + 1).padStart(2, "0")}</span> /{" "}
            {String(project.images.length).padStart(2, "0")}
          </p>
        </div>
      )}
    </article>
  );
}
