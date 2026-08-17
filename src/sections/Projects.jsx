import SectionHeading from "@/components/ui/SectionHeading";
import ProjectCard from "@/components/ui/ProjectCard";
import { useGsapReveal } from "@/hooks/useGsapReveal";
import { projects } from "@/data/projects";

export default function Projects() {
  const container = useGsapReveal(".project-card");

  return (
    <section id="projects" ref={container} className="px-5 md:px-10 py-10">
      <SectionHeading slate="SCENE LIST" title="Projects" />
      <div className="grid gap-6 md:gap-8 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
