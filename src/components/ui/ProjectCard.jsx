export default function ProjectCard({ project }) {
  return (
    <article className="project-card group relative border border-line bg-smoke overflow-hidden">
      <div className="relative aspect-video overflow-hidden">
        <img
          src={project.cover}
          alt={project.title}
          loading="lazy"
          className="h-full w-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
        />
        <span className="absolute top-3 left-3 tc bg-ink/80 px-2 py-1">
          {project.index}
        </span>
        <span className="absolute top-3 right-3 font-mono text-xs text-signal bg-ink/80 px-2 py-1">
          {project.year}
        </span>
      </div>

      <div className="p-5 md:p-6">
        <h3 className="display-narrow text-2xl md:text-3xl mb-1 group-hover:text-signal transition-colors">
          {project.title}
        </h3>
        <p className="tc mb-4">{project.role}</p>
        <p className="text-sm text-mute leading-relaxed mb-5">
          {project.description}
        </p>
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
    </article>
  );
}
