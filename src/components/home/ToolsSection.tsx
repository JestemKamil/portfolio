import { tools } from "@/components/home/content";
import { SectionHeading, ToolCard } from "@/components/home/primitives";

export function ToolsSection() {
  return (
    <section id="tools">
      <div className="container">
        <SectionHeading
          label="Narzędzia"
          title={
            <>
              Darmowe narzędzia
              <br />
              dla każdego.
            </>
          }
          subtitle="Zbudowałem i udostępniam kilka narzędzi online — przydatnych przy szukaniu pracy i składaniu dokumentów aplikacyjnych. Bez rejestracji, bez opłat."
        />
        <div className="tools-grid">
          {tools.map((tool) => (
            <ToolCard key={tool.name} tool={tool} />
          ))}
        </div>
      </div>
    </section>
  );
}
