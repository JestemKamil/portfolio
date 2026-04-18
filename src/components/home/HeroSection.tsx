import { heroStats } from "@/components/home/content";
import { HeroStatCard } from "@/components/home/primitives";

export function HeroSection() {
  return (
    <section id="hero">
      <div className="hero-inner">
        <div>
          <div className="hero-eyebrow reveal">Web Developer · Wordpress/React</div>
          <h1 className="hero-title reveal d1">
            Strony, które
            <br />
            <em>działają</em> na
            <br />
            <strong>Twój biznes.</strong>
          </h1>
          <p className="hero-desc reveal d2">
            Projektuję i wdrażam strony internetowe dla firm, które cenią sobie jakość wykonania,
            terminowość i bezpośredni kontakt z wykonawcą. Specjalizuję się w WordPress i Elementor.
          </p>
          <div className="hero-actions reveal d3">
            <a href="#projects" className="btn-primary">
              Zobacz realizacje
            </a>
            <a href="#contact" className="btn-ghost">
              Porozmawiajmy →
            </a>
          </div>
        </div>
        <div className="hero-stats reveal d4">
          {heroStats.map((stat) => (
            <HeroStatCard key={stat.value} value={stat.value} label={stat.label} />
          ))}
        </div>
      </div>
    </section>
  );
}
