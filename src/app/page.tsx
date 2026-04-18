export default function Home() {
  return (
    <>
      <nav>
        <div className="nav-inner">
          <a href="#hero" className="nav-logo">
            Kamil <em>Wąsik</em>
          </a>
          <ul className="nav-links">
            <li>
              <a href="#about">O mnie</a>
            </li>
            <li>
              <a href="#projects">Projekty</a>
            </li>
            <li>
              <a href="#tools">Narzędzia</a>
            </li>
            <li>
              <a href="#contact" className="nav-cta">
                Kontakt
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <section id="hero">
        <div className="hero-inner">
          <div>
            <div className="hero-eyebrow reveal">Web Developer · WordPress Specialist</div>
            <h1 className="hero-title reveal d1">
              Strony, które
              <br />
              <em>działają</em> na
              <br />
              <strong>Twój biznes.</strong>
            </h1>
            <p className="hero-desc reveal d2">
              Projektuję i wdrażam strony internetowe dla firm, które cenią sobie jakość wykonania,
              terminowość i bezpośredni kontakt z wykonawcą. Specjalizuję się w WordPress i
              Elementor.
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
            <div className="stat-item">
              <div className="stat-num">7</div>
              <div className="stat-label">
                Zrealizowanych
                <br />
                projektów
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-num">3 lata</div>
              <div className="stat-label">
                Doświadczenia
                <br />
                komercyjnego
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-num">100%</div>
              <div className="stat-label">
                Projektów
                <br />w terminie
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      <section id="about">
        <div className="container">
          <div className="section-label">O mnie</div>
          <h2>
            Developer, który rozumie
            <br />
            perspektywę biznesu.
          </h2>
          <div className="about-grid">
            <div className="about-text">
              <p>
                Nazywam się <strong>Kamil Wąsik</strong> i od kilku lat pomagam firmom zaistnieć w
                internecie. Działam jako niezależny developer — co oznacza{" "}
                <strong>
                  bezpośredni kontakt, szybką komunikację i pełną odpowiedzialność
                </strong>{" "}
                za efekt końcowy.
              </p>
              <p>
                Moje podejście jest proste: najpierw słucham i rozumiem, czego potrzebuje Twoja
                firma, a dopiero potem zabieram się do pracy. Dostarczam strony, które są nie tylko
                estetyczne, ale przede wszystkim{" "}
                <strong>skuteczne i łatwe w zarządzaniu</strong> dla klienta.
              </p>
              <p>
                Specjalizuję się w ekosystemie <strong>WordPress + Elementor</strong>, ale nie
                ograniczam się do gotowych rozwiązań — tam gdzie trzeba, piszę własne komponenty w
                PHP czy JavaScript. Interesuję się też automatyzacją procesów i narzędziami AI, co
                pozwala mi pracować szybciej i efektywniej.
              </p>
            </div>
            <div className="tech-stack-box">
              <div className="tech-group">
                <div className="tech-group-label">CMS &amp; E-commerce</div>
                <div className="tech-tags">
                  <span className="tech-tag">WordPress</span>
                  <span className="tech-tag">Elementor Pro</span>
                  <span className="tech-tag">WooCommerce</span>
                  <span className="tech-tag">ACF</span>
                  <span className="tech-tag">PayloadCMS</span>
                </div>
              </div>
              <div className="tech-group">
                <div className="tech-group-label">Języki &amp; Frameworki</div>
                <div className="tech-tags">
                  <span className="tech-tag">PHP</span>
                  <span className="tech-tag">Symfony</span>
                  <span className="tech-tag">JavaScript</span>
                  <span className="tech-tag">React</span>
                  <span className="tech-tag">Next.js</span>
                  <span className="tech-tag">NestJS</span>
                </div>
              </div>
              <div className="tech-group">
                <div className="tech-group-label">UI &amp; Stylowanie</div>
                <div className="tech-tags">
                  <span className="tech-tag">HTML / CSS</span>
                  <span className="tech-tag">TailwindCSS</span>
                  <span className="tech-tag">shadcn/ui</span>
                  <span className="tech-tag">MUI</span>
                </div>
              </div>
              <div className="tech-group">
                <div className="tech-group-label">AI &amp; Integracje API</div>
                <div className="tech-tags">
                  <span className="tech-tag">OpenAI API</span>
                  <span className="tech-tag">Anthropic API</span>
                  <span className="tech-tag">Google Cloud APIs</span>
                  <span className="tech-tag">LLM&apos;s API</span>
                  <span className="tech-tag">Stripe</span>
                </div>
              </div>
              <div className="tech-group">
                <div className="tech-group-label">Narzędzia &amp; Infrastruktura</div>
                <div className="tech-tags">
                  <span className="tech-tag">Git</span>
                  <span className="tech-tag">REST API</span>
                  <span className="tech-tag">Cloudflare</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      <section id="projects" className="alt">
        <div className="container">
          <div className="section-label">Realizacje</div>
          <h2>Wybrane projekty.</h2>
          <p className="section-sub">
            Każdy projekt to inne wyzwanie. Poniżej kilka realizacji, które dobrze pokazują zakres
            moich możliwości.
          </p>
          <div className="projects-list">
            <a href="https://www.fdspolska.com.pl/" target="_blank" rel="noreferrer" className="project-row">
              <div className="project-index">
                <span>01</span>
              </div>
              <div className="project-body">
                <div className="project-meta">
                  <span className="project-cat">Strona firmowa</span>
                </div>
                <h3 className="project-title">FDS Polska — strona internetowa</h3>
                <p className="project-desc">
                  Strona dla firmy FDS Polska stworzona w technologii RemixJS z zastosowaniem
                  TailwindCSS — responsywna, nowoczesna, zoptymalizowana pod każde urządzenie.
                </p>
                <div className="project-tags">
                  <span className="tag">RemixJS</span>
                  <span className="tag">TailwindCSS</span>
                </div>
              </div>
              <div className="project-arrow">→</div>
            </a>

            <a href="https://yourtax.pl/darmowy-e-book/" target="_blank" rel="noreferrer" className="project-row">
              <div className="project-index">
                <span>02</span>
              </div>
              <div className="project-body">
                <div className="project-meta">
                  <span className="project-cat">Landing page</span>
                </div>
                <h3 className="project-title">yourtax.pl — E-Book KSeF</h3>
                <p className="project-desc">
                  Landing page umożliwiający zapisanie się do darmowego e-booka na temat Krajowego
                  Systemu e-Faktur. Prosta, skuteczna strona generująca leady.
                </p>
                <div className="project-tags">
                  <span className="tag">WordPress</span>
                  <span className="tag">Landing page</span>
                </div>
              </div>
              <div className="project-arrow">→</div>
            </a>

            <a href="https://czystaspolka.pl/" target="_blank" rel="noreferrer" className="project-row">
              <div className="project-index">
                <span>03</span>
              </div>
              <div className="project-body">
                <div className="project-meta">
                  <span className="project-cat">Strona firmowa</span>
                </div>
                <h3 className="project-title">Czysta Spółka — strona internetowa</h3>
                <p className="project-desc">
                  Strona firmowa dla firmy Czysta Spółka — profesjonalna prezentacja oferty z
                  naciskiem na zaufanie i przejrzystość komunikacji z klientem.
                </p>
                <div className="project-tags">
                  <span className="tag">WordPress</span>
                  <span className="tag">Elementor</span>
                </div>
              </div>
              <div className="project-arrow">→</div>
            </a>

            <a
              href="https://rekrutacja.cezstalowawola.pl/"
              target="_blank"
              rel="noreferrer"
              className="project-row"
            >
              <div className="project-index">
                <span>04</span>
              </div>
              <div className="project-body">
                <div className="project-meta">
                  <span className="project-cat">Platforma edukacyjna</span>
                </div>
                <h3 className="project-title">Centrum Edukacji Zawodowej — strona rekrutacji</h3>
                <p className="project-desc">
                  Strona rekrutacyjna dla Centrum Edukacji Zawodowej w Stalowej Woli. Projekt oparty
                  na frameworku Next.js z komponentami Material UI — szybka, dostępna, łatwa w
                  zarządzaniu.
                </p>
                <div className="project-tags">
                  <span className="tag">Next.js</span>
                  <span className="tag">MUI</span>
                </div>
              </div>
              <div className="project-arrow">→</div>
            </a>

            <a href="https://audytksiegowy.pl/" target="_blank" rel="noreferrer" className="project-row">
              <div className="project-index">
                <span>05</span>
              </div>
              <div className="project-body">
                <div className="project-meta">
                  <span className="project-cat">Strona firmowa</span>
                </div>
                <h3 className="project-title">Audyt Księgowy — strona internetowa</h3>
                <p className="project-desc">
                  Strona firmowa dla biura audytu księgowego. Przejrzysty design podkreślający
                  profesjonalizm i budujący zaufanie wśród potencjalnych klientów biznesowych.
                </p>
                <div className="project-tags">
                  <span className="tag">WordPress</span>
                  <span className="tag">Elementor</span>
                </div>
              </div>
              <div className="project-arrow">→</div>
            </a>

            <div className="project-row">
              <div className="project-index">
                <span>06</span>
              </div>
              <div className="project-body">
                <div className="project-meta">
                  <span className="project-cat">Aplikacja webowa</span>
                </div>
                <h3 className="project-title">NASA Space Apps — aplikacja zorzy polarnej</h3>
                <p className="project-desc">
                  Aplikacja webowa prezentująca aktualne lokalizacje zorzy polarnej na interaktywnym
                  globusie. Umożliwia śledzenie jej występowania w czasie rzeczywistym. Zrealizowana
                  na hackathonie NASA Space Apps.
                </p>
                <div className="project-tags">
                  <span className="tag">Hackathon</span>
                  <span className="tag">Interactive Globe</span>
                  <span className="tag">NASA API</span>
                </div>
              </div>
              <div className="project-arrow">→</div>
            </div>

            <div className="project-row">
              <div className="project-index">
                <span>07</span>
              </div>
              <div className="project-body">
                <div className="project-meta">
                  <span className="project-cat">Aplikacja webowa</span>
                </div>
                <h3 className="project-title">Chatbot AI — aplikacja w Symfony / PHP</h3>
                <p className="project-desc">
                  Prototyp chatbota opartego na AI, napisany w Symfony. Projekt stworzony jako
                  samodzielne ćwiczenie techniczne eksplorujące integrację modeli językowych z
                  aplikacjami PHP.
                </p>
                <div className="project-tags">
                  <span className="tag">PHP</span>
                  <span className="tag">Symfony</span>
                  <span className="tag">AI</span>
                </div>
              </div>
              <div className="project-arrow">→</div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      <section id="tools">
        <div className="container">
          <div className="section-label">Narzędzia</div>
          <h2>
            Darmowe narzędzia
            <br />
            dla każdego.
          </h2>
          <p className="section-sub">
            Zbudowałem i udostępniam kilka narzędzi online — przydatnych przy szukaniu pracy i
            składaniu dokumentów aplikacyjnych. Bez rejestracji, bez opłat.
          </p>
          <div className="tools-grid">
            <div className="tool-card live">
              <span className="tool-badge live-badge">Dostępne</span>
              <div className="tool-icon-wrap">
                <svg viewBox="0 0 24 24">
                  <rect x="4" y="2" width="16" height="20" rx="2" />
                  <path d="M8 7h8M8 11h8M8 15h5" />
                </svg>
              </div>
              <h3 className="tool-name">CV Creator</h3>
              <p className="tool-desc">
                Stwórz profesjonalne CV w kilka minut. Wybierz szablon, wypełnij dane, pobierz
                gotowy PDF. Bez watermarków, bez zakładania konta.
              </p>
              <a href="#" className="tool-link">
                Otwórz narzędzie →
              </a>
            </div>

            <div className="tool-card live">
              <span className="tool-badge live-badge">Dostępne</span>
              <div className="tool-icon-wrap">
                <svg viewBox="0 0 24 24">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <h3 className="tool-name">Kreator Listu Motywacyjnego</h3>
              <p className="tool-desc">
                Uzupełnij kilka pól — narzędzie wygeneruje spójny, dobrze napisany list motywacyjny
                dopasowany do konkretnej oferty pracy i branży.
              </p>
              <a href="#" className="tool-link">
                Otwórz narzędzie →
              </a>
            </div>

            <div className="tool-card soon">
              <span className="tool-badge soon-badge">Wkrótce</span>
              <div className="tool-icon-wrap">
                <svg viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4l3 3" />
                </svg>
              </div>
              <h3 className="tool-name">Kalkulator Wynagrodzeń</h3>
              <p className="tool-desc">
                Porównaj formy zatrudnienia — UoP, B2B, umowa zlecenie. Przelicz brutto/netto i
                sprawdź realny koszt po stronie pracodawcy.
              </p>
            </div>

            <div className="tool-card soon">
              <span className="tool-badge soon-badge">Wkrótce</span>
              <div className="tool-icon-wrap">
                <svg viewBox="0 0 24 24">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3 className="tool-name">LinkedIn Bio Generator</h3>
              <p className="tool-desc">
                Wygeneruj sekcję &quot;O mnie&quot; na LinkedIn — zwięzłą, profesjonalną i
                zoptymalizowaną pod algorytmy wyszukiwania rekruterów.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      <section id="contact">
        <div className="container">
          <div className="contact-row">
            <div>
              <div className="section-label">Kontakt</div>
              <h2>
                Porozmawiajmy
                <br />o Twoim projekcie.
              </h2>
              <p className="section-sub">
                Masz pomysł na stronę lub sklep? Chcesz odświeżyć istniejącą witrynę? Napisz —
                odpiszę w ciągu 24 godzin.
              </p>
              <div className="contact-info">
                <a href="mailto:kontakt@kamil-wasik.pl" className="contact-link">
                  <div className="contact-link-icon">
                    <svg viewBox="0 0 24 24">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  kontakt@kamil-wasik.pl
                </a>
                <a
                  href="https://useme.com/pl/roles/contractor/kamil-wasik,281578/"
                  target="_blank"
                  rel="noreferrer"
                  className="contact-link"
                >
                  <div className="contact-link-icon">
                    <svg viewBox="0 0 24 24">
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                    </svg>
                  </div>
                  Profil na Useme.com
                </a>
              </div>
              <div className="vat-note">
                <svg viewBox="0 0 24 24" className="vat-icon">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Wystawiam faktury VAT
              </div>
            </div>
            <div className="avail-card">
              <div className="avail-status">
                <span className="avail-dot" />
                Dostępny do nowych projektów
              </div>
              <p className="avail-text">
                Aktualnie przyjmuję nowe zlecenia. Współpracuję zarówno z firmami szukającymi
                jednorazowej realizacji, jak i z klientami wymagającymi stałego wsparcia
                technicznego i utrzymania strony.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <span>© 2026 Kamil Wąsik</span>
        <span>Stalowa Wola · Projekty dla całej Polski</span>
      </footer>
    </>
  );
}
