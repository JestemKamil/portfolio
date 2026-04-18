"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { MainHeader } from "@/components/home/MainHeader";
import {
  CV_BLANK,
  CV_SAMPLE,
  CV_SECTIONS,
  CV_STORAGE_KEY,
  CV_TEMPLATE_KEY,
  CV_VIEW_KEY,
  cvIsEmpty,
  sectionHasContent,
} from "@/components/cv-builder/data";
import {
  CertificatesEditor,
  EducationEditor,
  ExperienceEditor,
  LanguagesEditor,
  PersonalEditor,
  ProjectsEditor,
  SkillsEditor,
  SummaryEditor,
} from "@/components/cv-builder/editors";
import { CvIcon } from "@/components/cv-builder/icons";
import { CV_TEMPLATES } from "@/components/cv-builder/templates";
import type { CvData, CvSectionKey, CvTemplateKey } from "@/components/cv-builder/types";

type ViewMode = "edit" | "preview";

type DialogState = {
  title: string;
  body: string;
  confirmLabel: string;
  destructive?: boolean;
  onConfirm: () => void;
} | null;

function Dialog({
  open,
  title,
  body,
  confirmLabel,
  destructive,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title?: string;
  body?: string;
  confirmLabel?: string;
  destructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  if (!open) {
    return null;
  }

  return (
    <div className="cvb-dialog-backdrop" onClick={onCancel}>
      <div className="cvb-dialog" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}>
        <h3>{title}</h3>
        <p>{body}</p>
        <div className="cvb-dialog-actions">
          <button type="button" className="cvb-btn cvb-btn-ghost" onClick={onCancel}>
            Anuluj
          </button>
          <button
            type="button"
            className="cvb-btn cvb-btn-primary"
            style={destructive ? { background: "#c43838", borderColor: "#c43838" } : undefined}
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

function loadDataFromStorage(): CvData {
  if (typeof window === "undefined") {
    return { ...CV_BLANK };
  }

  const raw = window.localStorage.getItem(CV_STORAGE_KEY);
  if (!raw) {
    return { ...CV_BLANK };
  }

  try {
    const parsed = JSON.parse(raw) as CvData;
    return {
      ...CV_BLANK,
      ...parsed,
      personal: { ...CV_BLANK.personal, ...parsed.personal },
    };
  } catch (error) {
    console.error("Cannot parse CV data from storage", error);
    return { ...CV_BLANK };
  }
}

function loadTemplateFromStorage(): CvTemplateKey {
  if (typeof window === "undefined") {
    return "editorial";
  }

  const value = window.localStorage.getItem(CV_TEMPLATE_KEY);
  return value && value in CV_TEMPLATES ? (value as CvTemplateKey) : "editorial";
}

function loadViewFromStorage(): ViewMode {
  if (typeof window === "undefined") {
    return "edit";
  }

  const value = window.localStorage.getItem(CV_VIEW_KEY);
  return value === "preview" ? "preview" : "edit";
}

export function CvBuilderApp() {
  const [data, setData] = useState<CvData>({ ...CV_BLANK });
  const [template, setTemplate] = useState<CvTemplateKey>("editorial");
  const [view, setView] = useState<ViewMode>("edit");
  const [tweaksOpen, setTweaksOpen] = useState(false);
  const [dialog, setDialog] = useState<DialogState>(null);
  const [toast, setToast] = useState("");
  const [storageReady, setStorageReady] = useState(false);
  const [activeSection, setActiveSection] = useState<CvSectionKey>("personal");

  const editorScrollRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setData(loadDataFromStorage());
      setTemplate(loadTemplateFromStorage());
      setView(loadViewFromStorage());
      setStorageReady(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!storageReady) {
      return;
    }
    try {
      window.localStorage.setItem(CV_STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error("Cannot save CV data", error);
    }
  }, [data, storageReady]);

  useEffect(() => {
    if (!storageReady) {
      return;
    }
    window.localStorage.setItem(CV_TEMPLATE_KEY, template);
  }, [template, storageReady]);

  useEffect(() => {
    if (!storageReady) {
      return;
    }
    window.localStorage.setItem(CV_VIEW_KEY, view);
  }, [view, storageReady]);

  useEffect(() => {
    const idToSection = new Map<string, CvSectionKey>(
      CV_SECTIONS.map((section) => [`cvb-sec-${section.key}`, section.key]),
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            continue;
          }
          const key = idToSection.get(entry.target.id);
          if (key) {
            setActiveSection(key);
          }
        }
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: [0.2, 0.5] },
    );

    for (const section of CV_SECTIONS) {
      const element = document.getElementById(`cvb-sec-${section.key}`);
      if (element) {
        observer.observe(element);
      }
    }

    return () => observer.disconnect();
  }, []);

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2400);
  };

  const filledCount = CV_SECTIONS.filter((section) => sectionHasContent(section.key, data)).length;
  const progress = Math.round((filledCount / CV_SECTIONS.length) * 100);
  const empty = cvIsEmpty(data);
  const renderTemplate = CV_TEMPLATES[template].render;

  const update = <T extends CvSectionKey>(key: T, value: CvData[T]) => {
    setData((previous) => ({ ...previous, [key]: value }));
  };

  const jumpTo = (key: CvSectionKey) => {
    setActiveSection(key);
    const element = document.getElementById(`cvb-sec-${key}`);
    const scroller = editorScrollRef.current;
    if (!element || !scroller) {
      return;
    }

    const scrollerTop = scroller.getBoundingClientRect().top;
    const elementTop = element.getBoundingClientRect().top;
    const offset = elementTop - scrollerTop - 16;

    if (scroller.scrollHeight > scroller.clientHeight + 10) {
      scroller.scrollBy({ top: offset, behavior: "smooth" });
    } else {
      window.scrollBy({ top: elementTop - 88, behavior: "smooth" });
    }
  };

  const askLoadSample = () =>
    setDialog({
      title: "Wczytać przykładowe dane?",
      body: "Zobaczysz przykładowe CV pod pracę w produkcji, handlu lub usługach. Obecne dane zostaną zastąpione.",
      confirmLabel: "Wczytaj przykład",
      onConfirm: () => {
        setData({ ...CV_SAMPLE });
        setDialog(null);
        showToast("Wczytano przykładowe dane");
      },
    });

  const askClear = () =>
    setDialog({
      title: "Wyczyścić całe CV?",
      body: "Wszystkie pola zostaną zresetowane. Tej operacji nie można cofnąć.",
      confirmLabel: "Tak, wyczyść",
      destructive: true,
      onConfirm: () => {
        setData({ ...CV_BLANK });
        setDialog(null);
        showToast("CV wyczyszczone");
      },
    });

  const handlePrint = () => {
    if (empty) {
      showToast("Wypełnij najpierw choć jedną sekcję");
      return;
    }
    window.setTimeout(() => window.print(), 50);
  };

  const renderEditor = (key: CvSectionKey) => {
    switch (key) {
      case "personal":
        return <PersonalEditor data={data.personal} update={(value) => update("personal", value)} />;
      case "summary":
        return <SummaryEditor data={data.summary} update={(value) => update("summary", value)} />;
      case "experience":
        return <ExperienceEditor data={data.experience} update={(value) => update("experience", value)} />;
      case "education":
        return <EducationEditor data={data.education} update={(value) => update("education", value)} />;
      case "skills":
        return <SkillsEditor data={data.skills} update={(value) => update("skills", value)} />;
      case "projects":
        return <ProjectsEditor data={data.projects} update={(value) => update("projects", value)} />;
      case "languages":
        return <LanguagesEditor data={data.languages} update={(value) => update("languages", value)} />;
      case "certificates":
        return <CertificatesEditor data={data.certificates} update={(value) => update("certificates", value)} />;
      default:
        return null;
    }
  };

  return (
    <div className="cv-builder-page">
      <MainHeader basePath="/" />

      <header className="cvb-page-head">
        <Link href="/" className="cvb-crumb">
          <CvIcon name="arrow-left" />
          Powrót do portfolio
        </Link>
        <span className="cvb-eyebrow">Kreator CV</span>
        <h1>
          Zbuduj <em>CV</em>, które
          <strong>wyróżni Cię na rynku pracy.</strong>
        </h1>
        <p className="cvb-lede">
          Prosty kreator dla osób, które chcą szybko przygotować profesjonalne CV.
          Cztery szablony, eksport do PDF, dane zostają w Twojej przeglądarce.
        </p>
      </header>

      <div className="cvb-appbar">
        <div className="cvb-appbar-inner">
          <div className="cvb-appbar-left">
            <div className="cvb-appbar-doc">
              <span className="cvb-appbar-doc-title">Moje CV</span>
              <span className="cvb-appbar-doc-meta">
                <span className="cvb-progress-dot" style={{ background: progress === 100 ? "var(--status-ok)" : "var(--ink-4)" }} />
                {filledCount} z {CV_SECTIONS.length} sekcji
              </span>
            </div>
            <div className="cvb-view-toggle" role="tablist" aria-label="Widok">
              <button type="button" role="tab" aria-selected={view === "edit"} className={view === "edit" ? "active" : ""} onClick={() => setView("edit")}>
                Edycja
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={view === "preview"}
                className={view === "preview" ? "active" : ""}
                onClick={() => setView("preview")}
              >
                Podgląd
              </button>
            </div>
          </div>
          <div className="cvb-appbar-actions">
            <button type="button" className="cvb-btn cvb-btn-ghost cvb-btn-sm" onClick={askLoadSample}>
              <CvIcon name="sparkles" />
              <span className="cvb-btn-label">Przykład</span>
            </button>
            <button type="button" className="cvb-btn cvb-btn-ghost cvb-btn-sm" onClick={askClear}>
              <CvIcon name="trash" />
              <span className="cvb-btn-label">Wyczyść</span>
            </button>
            <button type="button" className="cvb-btn cvb-btn-primary cvb-btn-sm" onClick={handlePrint}>
              <CvIcon name="download" />
              Pobierz PDF
            </button>
          </div>
        </div>
      </div>

      <main className={`cvb-workspace cvb-view-${view}`}>
        <aside className="cvb-side-nav" aria-label="Sekcje CV">
          <div className="cvb-side-nav-sticky">
            <span className="cvb-eyebrow">Sekcje</span>
            <div className="cvb-side-nav-progress">
              <div className="cvb-progress-bar">
                <span style={{ width: `${progress}%` }} />
              </div>
              <div className="cvb-side-nav-progress-meta">
                <span>{progress}% ukończone</span>
              </div>
            </div>
            <ul className="cvb-side-nav-list">
              {CV_SECTIONS.map((section, index) => {
                const filled = sectionHasContent(section.key, data);
                return (
                  <li key={section.key}>
                    <button
                      type="button"
                      className={`cvb-side-nav-item ${filled ? "filled" : ""} ${activeSection === section.key ? "active" : ""}`}
                      onClick={() => jumpTo(section.key)}
                    >
                      <span className="cvb-side-nav-marker">
                        {filled ? (
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3">
                            <path d="M5 12l5 5 9-11" />
                          </svg>
                        ) : (
                          <span>{index + 1}</span>
                        )}
                      </span>
                      <span>{section.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>

        <section className="cvb-editor-pane" ref={editorScrollRef}>
          <div className="cvb-editor-scroll">
            {CV_SECTIONS.map((section, index) => (
              <article key={section.key} id={`cvb-sec-${section.key}`} className="cvb-form-section">
                <header className="cvb-form-section-head">
                  <span className="cvb-form-section-num">{String(index + 1).padStart(2, "0")}</span>
                  <h2 className="cvb-form-section-title">{section.label}</h2>
                  {sectionHasContent(section.key, data) ? (
                    <span className="cvb-form-section-chip">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        width="10"
                        height="10"
                      >
                        <path d="M5 12l5 5 9-11" />
                      </svg>
                      Wypełnione
                    </span>
                  ) : null}
                </header>
                <div className="cvb-form-section-body">{renderEditor(section.key)}</div>
              </article>
            ))}
            <div className="cvb-editor-end">
              <p>To wszystko. Podgląd po prawej aktualizuje się na żywo.</p>
              <button type="button" className="cvb-btn cvb-btn-primary" onClick={handlePrint}>
                <CvIcon name="download" />
                Pobierz PDF
              </button>
            </div>
          </div>
        </section>

        <section className="cvb-preview-pane">
          <div className="cvb-preview-pane-sticky">
            <div className="cvb-preview-toolbar">
              <div className="cvb-template-switch">
                {Object.entries(CV_TEMPLATES).map(([key, value]) => (
                  <button
                    key={key}
                    type="button"
                    className={template === key ? "active" : ""}
                    onClick={() => setTemplate(key as CvTemplateKey)}
                  >
                    {value.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="cvb-cv-wrap">
              <div className="cv-page cv-page-preview" data-template={template}>
                {empty ? (
                  <div className="cvb-cv-empty">
                    <p className="cvb-cv-empty-title">Twoje CV pojawi się tutaj</p>
                    <p>
                      Zacznij od sekcji <strong>Dane</strong> i wpisz stanowisko, albo kliknij <em>Przykład</em>.
                    </p>
                  </div>
                ) : (
                  renderTemplate(data)
                )}
              </div>
            </div>
            <p className="cvb-preview-meta-bottom">Podgląd · A4 · aktualizuje się na żywo</p>
          </div>
        </section>
      </main>

      {!empty ? (
        <div className="cvb-print-container">
          <div className="cv-page" data-template={template}>
            {renderTemplate(data)}
          </div>
        </div>
      ) : null}

      <footer className="cvb-footer">
        <div>© 2026 Kamil Wąsik · Zaprojektowane i zbudowane w Warszawie</div>
        <div className="cvb-footer-links">
          <Link href="/privacy">Prywatność</Link>
          <Link href="/#contact">Kontakt</Link>
          <Link href="/">Portfolio</Link>
        </div>
      </footer>

      <button type="button" className="cvb-tweaks-toggle" onClick={() => setTweaksOpen((previous) => !previous)}>
        <CvIcon name="sliders" />
        {tweaksOpen ? "Zamknij" : "Personalizuj"}
      </button>

      <div className={`cvb-tweaks ${tweaksOpen ? "open" : ""}`}>
        <span className="cvb-eyebrow">Personalizacja</span>
        <h4>Szablon CV</h4>
        <div className="cvb-tweaks-grid">
          {Object.entries(CV_TEMPLATES).map(([key, value]) => (
            <button key={key} type="button" className={template === key ? "active" : ""} onClick={() => setTemplate(key as CvTemplateKey)}>
              {value.label}
            </button>
          ))}
        </div>
      </div>

      <Dialog
        open={Boolean(dialog)}
        title={dialog?.title}
        body={dialog?.body}
        confirmLabel={dialog?.confirmLabel}
        destructive={dialog?.destructive}
        onConfirm={dialog?.onConfirm ?? (() => {})}
        onCancel={() => setDialog(null)}
      />

      <div className={`cvb-toast ${toast ? "show" : ""}`}>{toast}</div>
    </div>
  );
}
