import { projects } from "@/components/home/content";
import { ProjectRow, SectionHeading } from "@/components/home/primitives";

export function ProjectsSection() {
  return (
    <section id="projects" className="alt">
      <div className="container">
        <SectionHeading
          label="Realizacje"
          title="Wybrane projekty."
          subtitle="Każdy projekt to inne wyzwanie. Poniżej kilka realizacji, które dobrze pokazują zakres moich możliwości."
        />
        <div className="projects-list">
          {projects.map((project) => (
            <ProjectRow key={project.index} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
