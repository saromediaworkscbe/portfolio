import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { projects } from "@/data/projects";

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

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

        {/* ---- Collage gallery for this project ---- */}
        <div
          className="grid grid-cols-2 gap-2 md:gap-3 p-2 md:p-3 auto-rows-[240px] sm:auto-rows-[320px] md:auto-rows-[380px] mb-24"
        >
          {project.images.map((src, i) => (
            <div
              key={src}
              className={`group relative overflow-hidden ${
                project.images.length === 1
                  ? "col-span-2 row-span-2"
                  : project.images.length === 2
                  ? "row-span-2"
                  : i === 0
                  ? "row-span-2"
                  : "row-span-1"
              }`}
            >
              <img
                src={src}
                alt={`${project.title} — frame ${i + 1}`}
                loading={i === 0 ? "eager" : "lazy"}
                className="h-full w-full object-cover grayscale brightness-[0.75] transition-all duration-500 ease-out group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105"
              />
            </div>
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
    </article>
  );
}
