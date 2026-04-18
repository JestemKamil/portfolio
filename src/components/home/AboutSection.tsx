import { techGroups } from "@/components/home/content";
import { SectionHeading } from "@/components/home/primitives";

export function AboutSection() {
  return (
    <section id="about">
      <div className="container">
        <SectionHeading
          label="O mnie"
          title={
            <>
              Developer, który rozumie
              <br />
              perspektywę biznesu.
            </>
          }
        />
        <div className="about-grid">
          <div className="about-text">
            <p>
              Nazywam się <strong>Kamil Wąsik</strong> i od kilku lat pomagam firmom zaistnieć w
              internecie. Działam jako niezależny developer — co oznacza{" "}
              <strong>bezpośredni kontakt, szybką komunikację i pełną odpowiedzialność</strong> za
              efekt końcowy.
            </p>
            <p>
              Moje podejście jest proste: najpierw słucham i rozumiem, czego potrzebuje Twoja firma,
              a dopiero potem zabieram się do pracy. Dostarczam strony, które są nie tylko estetyczne,
              ale przede wszystkim <strong>skuteczne i łatwe w zarządzaniu</strong> dla klienta.
            </p>
            <p>
              Specjalizuję się w ekosystemie <strong>WordPress + Elementor</strong>, ale nie
              ograniczam się do gotowych rozwiązań — tam gdzie trzeba, piszę własne komponenty w PHP
              czy JavaScript. Interesuję się też automatyzacją procesów i narzędziami AI, co pozwala
              mi pracować szybciej i efektywniej.
            </p>
          </div>

          <div className="tech-stack-box">
            {techGroups.map((group) => (
              <div key={group.label} className="tech-group">
                <div className="tech-group-label">{group.label}</div>
                <div className="tech-tags">
                  {group.tags.map((tag) => (
                    <span key={tag} className="tech-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
