"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { MainHeader } from "@/components/home/MainHeader";
import {
  DEFAULT_RODO_CLAUSE,
  LM_BLANK,
  LM_SAMPLE,
  LM_STEPS,
  LM_STORAGE_KEY,
  letterIsEmpty,
  stepHasContent,
} from "@/components/motivation-letter/data";
import type { LetterData, LetterStepKey } from "@/components/motivation-letter/types";

type DialogState = {
  title: string;
  body: string;
  confirmLabel: string;
  destructive?: boolean;
  onConfirm: () => void;
} | null;

type ViewMode = "edit" | "preview";

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
  if (!open) return null;
  return (
    <div className="cvb-dialog-backdrop" onClick={onCancel}>
      <div className="cvb-dialog" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
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

function TextField({
  label,
  value,
  onChange,
  placeholder,
  hint,
  type = "text",
}: {
  label?: string;
  value: string;
  onChange: (next: string) => void;
  placeholder?: string;
  hint?: string;
  type?: "text" | "email";
}) {
  return (
    <div className="cvb-field">
      {label ? <label>{label}</label> : null}
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
      {hint ? <div className="cvb-hint">{hint}</div> : null}
    </div>
  );
}

function TextArea({
  label,
  value,
  onChange,
  placeholder,
  hint,
  rows = 5,
}: {
  label?: string;
  value: string;
  onChange: (next: string) => void;
  placeholder?: string;
  hint?: string;
  rows?: number;
}) {
  return (
    <div className="cvb-field">
      {label ? <label>{label}</label> : null}
      <textarea rows={rows} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
      {hint ? <div className="cvb-hint">{hint}</div> : null}
    </div>
  );
}

function loadFromStorage(): LetterData {
  if (typeof window === "undefined") return { ...LM_BLANK };
  try {
    const raw = window.localStorage.getItem(LM_STORAGE_KEY);
    if (!raw) return { ...LM_BLANK };
    const parsed = JSON.parse(raw) as LetterData;
    return { ...LM_BLANK, ...parsed };
  } catch {
    return { ...LM_BLANK };
  }
}

function LetterPreview({ data }: { data: LetterData }) {
  const empty = letterIsEmpty(data);
  const hasRecruiter = Boolean(data.recruiterName);
  const greeting = hasRecruiter ? `Szanowna Pani/Panie ${data.recruiterName},` : "Szanowni Państwo,";

  if (empty) {
    return (
      <div className="lm-preview-empty">
        <p className="lm-preview-empty-title">Twój list pojawi się tutaj</p>
        <p>Zacznij od sekcji <strong>Twoje dane</strong> lub kliknij <em>Przykład</em>.</p>
      </div>
    );
  }

  return (
    <div className="lm-letter">
      <div className="lm-letter-header">
        {data.senderName ? <div className="lm-letter-sender-name">{data.senderName}</div> : null}
        <div className="lm-letter-sender-contact">
          {[data.senderEmail, data.senderPhone].filter(Boolean).join(" · ")}
        </div>
        <div className="lm-letter-meta">
          {[data.senderCity, data.date].filter(Boolean).join(", ")}
        </div>
      </div>

      {(data.companyName || data.position) ? (
        <div className="lm-letter-addressee">
          {data.companyName ? <div>{data.companyName}</div> : null}
          {data.recruiterName ? <div>{data.recruiterName}</div> : null}
          {data.position ? (
            <div className="lm-letter-subject">
              Dotyczy: aplikacja na stanowisko <strong>{data.position}</strong>
            </div>
          ) : null}
        </div>
      ) : null}

      <div className="lm-letter-body">
        {(data.companyName || data.recruiterName || data.opening) ? (
          <p className="lm-letter-greeting">{greeting}</p>
        ) : null}
        {data.opening ? <p>{data.opening}</p> : null}
        {data.experience ? <p>{data.experience}</p> : null}
        {data.motivation ? <p>{data.motivation}</p> : null}
        {data.closing ? <p>{data.closing}</p> : null}
      </div>

      <div className="lm-letter-footer">
        <p>Z poważaniem,</p>
        {data.senderName ? <p className="lm-letter-signature">{data.senderName}</p> : null}
      </div>

      {data.consentEnabled && data.consentText ? (
        <div className="lm-letter-consent">{data.consentText}</div>
      ) : null}
    </div>
  );
}

function SenderStep({ data, update }: { data: LetterData; update: (patch: Partial<LetterData>) => void }) {
  return (
    <div>
      <div className="cvb-section-intro">
        <h3>Twoje dane</h3>
        <p>Informacje kontaktowe, które pojawią się w nagłówku listu.</p>
      </div>
      <TextField
        label="Imię i nazwisko"
        value={data.senderName}
        onChange={(v) => update({ senderName: v })}
        placeholder="np. Anna Kowalska"
      />
      <div className="cvb-field-row">
        <TextField
          label="E-mail"
          type="email"
          value={data.senderEmail}
          onChange={(v) => update({ senderEmail: v })}
          placeholder="ty@example.com"
        />
        <TextField
          label="Telefon"
          value={data.senderPhone}
          onChange={(v) => update({ senderPhone: v })}
          placeholder="+48 600 123 456"
        />
      </div>
      <div className="cvb-field-row">
        <TextField
          label="Miasto"
          value={data.senderCity}
          onChange={(v) => update({ senderCity: v })}
          placeholder="np. Warszawa"
        />
        <TextField
          label="Data (opcjonalnie)"
          value={data.date}
          onChange={(v) => update({ date: v })}
          placeholder="np. 21 kwietnia 2026"
        />
      </div>
    </div>
  );
}

function JobStep({ data, update }: { data: LetterData; update: (patch: Partial<LetterData>) => void }) {
  return (
    <div>
      <div className="cvb-section-intro">
        <h3>Oferta pracy</h3>
        <p>Informacje o firmie i stanowisku, na które aplikujesz.</p>
      </div>
      <TextField
        label="Nazwa firmy"
        value={data.companyName}
        onChange={(v) => update({ companyName: v })}
        placeholder="np. Fabryka XYZ Sp. z o.o."
      />
      <TextField
        label="Stanowisko"
        value={data.position}
        onChange={(v) => update({ position: v })}
        placeholder="np. Operator maszyn produkcyjnych"
      />
      <TextField
        label="Imię i nazwisko rekrutera (opcjonalnie)"
        value={data.recruiterName}
        onChange={(v) => update({ recruiterName: v })}
        placeholder="np. Jan Nowak — zostawi personalne powitanie"
        hint="Jeśli znasz osobę odpowiedzialną za rekrutację, wpisz jej imię i nazwisko."
      />
    </div>
  );
}

function OpeningStep({ data, update }: { data: LetterData; update: (patch: Partial<LetterData>) => void }) {
  return (
    <div>
      <div className="cvb-section-intro">
        <h3>Wstęp</h3>
        <p>Napisz, dlaczego aplikujesz i skąd dowiedziałeś/-aś się o ofercie. 2–3 zdania.</p>
      </div>
      <TextArea
        value={data.opening}
        onChange={(v) => update({ opening: v })}
        rows={6}
        placeholder="Z zainteresowaniem zapoznałam się z ofertą pracy na stanowisko ... w firmie ... Ogłoszenie znalazłam na portalu Pracuj.pl i jestem przekonana, że moje doświadczenie doskonale wpisuje się w Państwa oczekiwania."
        hint={`${data.opening.length} znaków`}
      />
    </div>
  );
}

function ExperienceStep({ data, update }: { data: LetterData; update: (patch: Partial<LetterData>) => void }) {
  return (
    <div>
      <div className="cvb-section-intro">
        <h3>Doświadczenie</h3>
        <p>Opisz swoje doświadczenie i umiejętności istotne dla tej oferty. 3–5 zdań.</p>
      </div>
      <TextArea
        value={data.experience}
        onChange={(v) => update({ experience: v })}
        rows={7}
        placeholder="Przez ostatnie X lat pracowałam jako ... gdzie zdobyłam doświadczenie w ... Potrafię ..."
        hint={`${data.experience.length} znaków`}
      />
    </div>
  );
}

function MotivationStep({ data, update }: { data: LetterData; update: (patch: Partial<LetterData>) => void }) {
  return (
    <div>
      <div className="cvb-section-intro">
        <h3>Motywacja</h3>
        <p>Dlaczego ta firma? Co Cię przyciągnęło do tej oferty? 2–3 zdania.</p>
      </div>
      <TextArea
        value={data.motivation}
        onChange={(v) => update({ motivation: v })}
        rows={6}
        placeholder="Szczególnie cenię sobie Państwa firmę za ... Chciałbym/Chciałabym dołączyć do zespołu, który ..."
        hint={`${data.motivation.length} znaków`}
      />
    </div>
  );
}

function ClosingStep({ data, update }: { data: LetterData; update: (patch: Partial<LetterData>) => void }) {
  return (
    <div>
      <div className="cvb-section-intro">
        <h3>Zakończenie</h3>
        <p>Zaproś do kontaktu i podaj swoją dostępność. 2–3 zdania.</p>
      </div>
      <TextArea
        value={data.closing}
        onChange={(v) => update({ closing: v })}
        rows={6}
        placeholder="Chętnie spotkam się na rozmowie kwalifikacyjnej. Jestem dostępna od zaraz. Proszę o kontakt pod numerem ..."
        hint={`${data.closing.length} znaków`}
      />
      <div className="cvb-check">
        <label className="cvb-check-label">
          <input
            type="checkbox"
            checked={data.consentEnabled}
            onChange={(e) => update({ consentEnabled: e.target.checked })}
          />
          <span>Dodaj klauzulę RODO na końcu listu</span>
        </label>
        <div className="cvb-hint">W większości rekrutacji w Polsce taka zgoda jest wymagana.</div>
      </div>
      {data.consentEnabled ? (
        <TextArea
          label="Treść klauzuli RODO"
          value={data.consentText}
          onChange={(v) => update({ consentText: v })}
          rows={3}
          placeholder={DEFAULT_RODO_CLAUSE}
        />
      ) : null}
    </div>
  );
}

export function MotivationLetterApp() {
  const [data, setData] = useState<LetterData>({ ...LM_BLANK });
  const [view, setView] = useState<ViewMode>("edit");
  const [dialog, setDialog] = useState<DialogState>(null);
  const [toast, setToast] = useState("");
  const [storageReady, setStorageReady] = useState(false);
  const [activeStep, setActiveStep] = useState<LetterStepKey>("sender");

  const editorScrollRef = useRef<HTMLElement>(null);
  const previewWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setData(loadFromStorage());
      setStorageReady(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!storageReady) return;
    try {
      window.localStorage.setItem(LM_STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error("Cannot save letter data", error);
    }
  }, [data, storageReady]);

  useEffect(() => {
    const idToStep = new Map<string, LetterStepKey>(
      LM_STEPS.map((s) => [`lm-sec-${s.key}`, s.key]),
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const key = idToStep.get(entry.target.id);
          if (key) setActiveStep(key);
        }
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: [0.2, 0.5] },
    );
    for (const step of LM_STEPS) {
      const el = document.getElementById(`lm-sec-${step.key}`);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const wrap = previewWrapRef.current;
    if (!wrap || typeof ResizeObserver === "undefined") return;
    const page = wrap.querySelector<HTMLElement>(".lm-page-preview");
    if (!page) return;

    let frame = 0;
    const updateScale = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        page.style.setProperty("zoom", "1");
        const availableWidth = Math.max(wrap.clientWidth - 16, 1);
        const availableHeight = Math.max(wrap.clientHeight - 16, 1);
        const contentWidth = Math.max(page.scrollWidth, 1);
        const contentHeight = Math.max(Math.min(page.scrollHeight, 1120), 1);
        const scale = Math.max(0.72, Math.min(1, availableWidth / contentWidth, availableHeight / contentHeight));
        page.style.setProperty("zoom", scale.toFixed(3));
      });
    };

    const observer = new ResizeObserver(updateScale);
    observer.observe(wrap);
    observer.observe(page);
    updateScale();
    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
      page.style.removeProperty("zoom");
    };
  }, [data, view]);

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2400);
  };

  const update = (patch: Partial<LetterData>) => {
    setData((prev) => ({ ...prev, ...patch }));
  };

  const jumpTo = (key: LetterStepKey) => {
    setActiveStep(key);
    const el = document.getElementById(`lm-sec-${key}`);
    const scroller = editorScrollRef.current;
    if (!el || !scroller) return;
    const scrollerTop = scroller.getBoundingClientRect().top;
    const elementTop = el.getBoundingClientRect().top;
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
      body: "Zobaczysz przykładowy list motywacyjny. Obecne dane zostaną zastąpione.",
      confirmLabel: "Wczytaj przykład",
      onConfirm: () => {
        setData({ ...LM_SAMPLE });
        setDialog(null);
        showToast("Wczytano przykładowe dane");
      },
    });

  const askClear = () =>
    setDialog({
      title: "Wyczyścić cały list?",
      body: "Wszystkie pola zostaną zresetowane. Tej operacji nie można cofnąć.",
      confirmLabel: "Tak, wyczyść",
      destructive: true,
      onConfirm: () => {
        setData({ ...LM_BLANK });
        setDialog(null);
        showToast("List wyczyszczony");
      },
    });

  const handlePrint = () => {
    if (letterIsEmpty(data)) {
      showToast("Wypełnij najpierw choć jedną sekcję");
      return;
    }
    window.setTimeout(() => window.print(), 50);
  };

  const filledCount = LM_STEPS.filter((s) => stepHasContent(s.key, data)).length;
  const progress = Math.round((filledCount / LM_STEPS.length) * 100);
  const empty = letterIsEmpty(data);

  const renderStep = (key: LetterStepKey) => {
    switch (key) {
      case "sender":    return <SenderStep data={data} update={update} />;
      case "job":       return <JobStep data={data} update={update} />;
      case "opening":   return <OpeningStep data={data} update={update} />;
      case "experience": return <ExperienceStep data={data} update={update} />;
      case "motivation": return <MotivationStep data={data} update={update} />;
      case "closing":   return <ClosingStep data={data} update={update} />;
      default:          return null;
    }
  };

  return (
    <div className="cv-builder-page lm-page">
      <MainHeader basePath="/" />

      <header className="cvb-page-head">
        <Link href="/" className="cvb-crumb">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Powrót do portfolio
        </Link>
        <span className="cvb-eyebrow">Kreator Listu Motywacyjnego</span>
        <h1>
          Napisz <em>list</em>, który
          <strong>otworzy Ci drzwi do pracy.</strong>
        </h1>
        <p className="cvb-lede">
          Wypełnij kilka pól, a kreator złoży gotowy, profesjonalny list motywacyjny.
          Podgląd na żywo, eksport do PDF, dane zostają w Twojej przeglądarce.
        </p>
      </header>

      <div className="cvb-appbar">
        <div className="cvb-appbar-inner">
          <div className="cvb-appbar-left">
            <div className="cvb-appbar-doc">
              <span className="cvb-appbar-doc-title">Mój list motywacyjny</span>
              <span className="cvb-appbar-doc-meta">
                <span className="cvb-progress-dot" style={{ background: progress === 100 ? "var(--accent)" : "var(--ink-4)" }} />
                {filledCount} z {LM_STEPS.length} sekcji
              </span>
            </div>
            <div className="cvb-view-toggle" role="tablist" aria-label="Widok">
              <button type="button" role="tab" aria-selected={view === "edit"} className={view === "edit" ? "active" : ""} onClick={() => setView("edit")}>
                Edycja
              </button>
              <button type="button" role="tab" aria-selected={view === "preview"} className={view === "preview" ? "active" : ""} onClick={() => setView("preview")}>
                Podgląd
              </button>
            </div>
          </div>
          <div className="cvb-appbar-actions">
            <button type="button" className="cvb-btn cvb-btn-ghost cvb-btn-sm" onClick={askLoadSample}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3l1.9 5.9H20l-5 3.6 1.9 5.9-5-3.6-5 3.6 1.9-5.9-5-3.6h6.1z" />
              </svg>
              <span className="cvb-btn-label">Przykład</span>
            </button>
            <button type="button" className="cvb-btn cvb-btn-ghost cvb-btn-sm" onClick={askClear}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                <path d="M10 11v6M14 11v6" />
                <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
              </svg>
              <span className="cvb-btn-label">Wyczyść</span>
            </button>
            <button type="button" className="cvb-btn cvb-btn-primary cvb-btn-sm" onClick={handlePrint}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Pobierz PDF
            </button>
          </div>
        </div>
      </div>

      <main className={`cvb-workspace cvb-view-${view}`}>
        <aside className="cvb-side-nav" aria-label="Sekcje listu">
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
              {LM_STEPS.map((step, index) => {
                const filled = stepHasContent(step.key, data);
                return (
                  <li key={step.key}>
                    <button
                      type="button"
                      className={`cvb-side-nav-item ${filled ? "filled" : ""} ${activeStep === step.key ? "active" : ""}`}
                      onClick={() => jumpTo(step.key)}
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
                      <span>{step.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>

        <section className="cvb-editor-pane" ref={editorScrollRef}>
          <div className="cvb-editor-scroll">
            {LM_STEPS.map((step, index) => (
              <article key={step.key} id={`lm-sec-${step.key}`} className="cvb-form-section">
                <header className="cvb-form-section-head">
                  <span className="cvb-form-section-num">{String(index + 1).padStart(2, "0")}</span>
                  <h2 className="cvb-form-section-title">{step.label}</h2>
                  {stepHasContent(step.key, data) ? (
                    <span className="cvb-form-section-chip">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" width="10" height="10">
                        <path d="M5 12l5 5 9-11" />
                      </svg>
                      Wypełnione
                    </span>
                  ) : null}
                </header>
                <div className="cvb-form-section-body">{renderStep(step.key)}</div>
              </article>
            ))}
            <div className="cvb-editor-end">
              <p>To wszystko. Podgląd po prawej aktualizuje się na żywo.</p>
              <button type="button" className="cvb-btn cvb-btn-primary" onClick={handlePrint}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Pobierz PDF
              </button>
            </div>
          </div>
        </section>

        <section className="cvb-preview-pane">
          <div className="cvb-preview-pane-sticky">
            <div className="cvb-preview-toolbar lm-preview-toolbar">
              <span className="lm-preview-label">Podgląd listu · A4</span>
            </div>
            <div className="cvb-cv-wrap" ref={previewWrapRef}>
              <div className="lm-page-preview">
                <LetterPreview data={data} />
              </div>
            </div>
            <p className="cvb-preview-meta-bottom">Podgląd · A4 · aktualizuje się na żywo</p>
          </div>
        </section>
      </main>

      {!empty ? (
        <div className="lm-print-container">
          <div className="lm-page-print">
            <LetterPreview data={data} />
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
