import { useState } from "react";
import type { ReactNode } from "react";
import { DEFAULT_RODO_CLAUSE } from "@/components/cv-builder/data";
import { CvIcon } from "@/components/cv-builder/icons";
import type {
  CertificateItem,
  EducationItem,
  ExperienceItem,
  LanguageItem,
  PersonalData,
  ProjectItem,
} from "@/components/cv-builder/types";

type TextFieldProps = {
  label?: string;
  value: string;
  onChange: (next: string) => void;
  placeholder?: string;
  hint?: string;
  type?: "text" | "email";
};

function TextField({ label, value, onChange, placeholder, hint, type = "text" }: TextFieldProps) {
  return (
    <div className="cvb-field">
      {label ? <label>{label}</label> : null}
      <input type={type} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} />
      {hint ? <div className="cvb-hint">{hint}</div> : null}
    </div>
  );
}

type TextAreaProps = {
  label?: string;
  value: string;
  onChange: (next: string) => void;
  placeholder?: string;
  hint?: string;
  rows?: number;
};

function TextArea({ label, value, onChange, placeholder, hint, rows = 4 }: TextAreaProps) {
  return (
    <div className="cvb-field">
      {label ? <label>{label}</label> : null}
      <textarea rows={rows} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} />
      {hint ? <div className="cvb-hint">{hint}</div> : null}
    </div>
  );
}

type PillEditorProps = {
  value: string[];
  onChange: (next: string[]) => void;
  placeholder: string;
};

function PillEditor({ value, onChange, placeholder }: PillEditorProps) {
  const [input, setInput] = useState("");

  const add = () => {
    const next = input.trim();
    if (!next) {
      return;
    }
    if (value.includes(next)) {
      setInput("");
      return;
    }
    onChange([...value, next]);
    setInput("");
  };

  const remove = (index: number) => {
    onChange(value.filter((_, itemIndex) => itemIndex !== index));
  };

  return (
    <div
      className="cvb-pill-list"
      onClick={(event) => {
        if ((event.target as HTMLElement).tagName !== "INPUT") {
          event.currentTarget.querySelector("input")?.focus();
        }
      }}
    >
      {value.map((item, index) => (
        <span key={`${item}-${index}`} className="cvb-pill">
          {item}
          <button type="button" onClick={() => remove(index)} aria-label="Usuń">
            ×
          </button>
        </span>
      ))}
      <input
        value={input}
        onChange={(event) => setInput(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === ",") {
            event.preventDefault();
            add();
          }
          if (event.key === "Backspace" && !input && value.length) {
            remove(value.length - 1);
          }
        }}
        onBlur={add}
        placeholder={value.length ? "" : placeholder}
      />
    </div>
  );
}

type EntryProps = {
  title: string;
  onDelete: () => void;
  children: ReactNode;
};

function Entry({ title, onDelete, children }: EntryProps) {
  return (
    <div className="cvb-entry">
      <div className="cvb-entry-head">
        <span className={`cvb-entry-title ${title ? "" : "placeholder"}`}>{title || "Nowy wpis"}</span>
        <button type="button" className="cvb-entry-del" onClick={onDelete} aria-label="Usuń">
          <CvIcon name="trash" />
        </button>
      </div>
      {children}
    </div>
  );
}

type AddButtonProps = {
  label: string;
  onClick: () => void;
};

function AddButton({ label, onClick }: AddButtonProps) {
  return (
    <button type="button" className="cvb-add-btn" onClick={onClick}>
      <CvIcon name="plus" />
      {label}
    </button>
  );
}

type EditorProps<T> = {
  data: T;
  update: (next: T) => void;
};

export function PersonalEditor({ data, update }: EditorProps<PersonalData>) {
  return (
    <div>
      <div className="cvb-section-intro">
        <h3>Dane osobowe</h3>
        <p>Podstawowe informacje, które pojawią się w nagłówku CV.</p>
      </div>
      <TextField
        label="Imię i nazwisko"
        value={data.name}
        onChange={(value) => update({ ...data, name: value })}
        placeholder="np. Jan Kowalski"
      />
      <TextField
        label="Stanowisko / tytuł"
        value={data.title}
        onChange={(value) => update({ ...data, title: value })}
        placeholder="np. Pracownik produkcji / asystent sprzedaży"
      />
      <div className="cvb-field-row">
        <TextField
          label="E-mail"
          type="email"
          value={data.email}
          onChange={(value) => update({ ...data, email: value })}
          placeholder="ty@example.com"
        />
        <TextField
          label="Telefon"
          value={data.phone}
          onChange={(value) => update({ ...data, phone: value })}
          placeholder="+48..."
        />
      </div>
      <div className="cvb-field-row">
        <TextField
          label="Miasto"
          value={data.city}
          onChange={(value) => update({ ...data, city: value })}
          placeholder="np. Warszawa"
        />
        <TextField
          label="Strona / profil (opcjonalnie)"
          value={data.website}
          onChange={(value) => update({ ...data, website: value })}
          placeholder="np. twoj-profil.pl"
        />
      </div>
      <TextField
        label="LinkedIn / profil zawodowy (opcjonalnie)"
        value={data.linkedin}
        onChange={(value) => update({ ...data, linkedin: value })}
        placeholder="np. linkedin.com/in/jankowalski"
      />
      <div className="cvb-check">
        <label className="cvb-check-label">
          <input
            type="checkbox"
            checked={data.consentEnabled}
            onChange={(event) => update({ ...data, consentEnabled: event.target.checked })}
          />
          <span>Dodaj klauzulę RODO na dole CV</span>
        </label>
        <div className="cvb-hint">W większości rekrutacji w Polsce taka zgoda jest wymagana.</div>
      </div>
      {data.consentEnabled ? (
        <TextArea
          label="Treść klauzuli RODO"
          value={data.consentText}
          onChange={(value) => update({ ...data, consentText: value })}
          rows={3}
          placeholder={DEFAULT_RODO_CLAUSE}
        />
      ) : null}
    </div>
  );
}

export function SummaryEditor({ data, update }: EditorProps<string>) {
  return (
    <div>
      <div className="cvb-section-intro">
        <h3>Podsumowanie zawodowe</h3>
        <p>2-4 krótkie zdania: kim jesteś, jakie masz doświadczenie i jakiej pracy szukasz.</p>
      </div>
      <TextArea
        value={data}
        onChange={update}
        rows={7}
        placeholder="Mam 4 lata doświadczenia w pracy na magazynie i szukam pracy zmianowej..."
        hint={`${data.length} / 500 znaków`}
      />
    </div>
  );
}

export function ExperienceEditor({ data, update }: EditorProps<ExperienceItem[]>) {
  const add = () => update([...data, { role: "", company: "", from: "", to: "", desc: "" }]);
  const set = (index: number, patch: Partial<ExperienceItem>) =>
    update(data.map((entry, entryIndex) => (entryIndex === index ? { ...entry, ...patch } : entry)));
  const remove = (index: number) => update(data.filter((_, entryIndex) => entryIndex !== index));

  return (
    <div>
      <div className="cvb-section-intro">
        <h3>Doświadczenie zawodowe</h3>
        <p>Najnowsze wpisy na górze. Krótko opisz obowiązki i efekty, bez trudnych sformułowań.</p>
      </div>
      {data.map((entry, index) => (
        <Entry key={`${entry.role}-${entry.company}-${index}`} title={entry.role || entry.company} onDelete={() => remove(index)}>
          <div className="cvb-field-row">
            <TextField
              label="Stanowisko"
              value={entry.role}
              onChange={(value) => set(index, { role: value })}
              placeholder="np. Operator linii produkcyjnej"
            />
            <TextField
              label="Firma"
              value={entry.company}
              onChange={(value) => set(index, { company: value })}
              placeholder="np. ArcelorMittal Poland"
            />
          </div>
          <div className="cvb-field-row">
            <TextField label="Od" value={entry.from} onChange={(value) => set(index, { from: value })} placeholder="2022" />
            <TextField label="Do" value={entry.to} onChange={(value) => set(index, { to: value })} placeholder="obecnie" />
          </div>
          <TextArea
            label="Opis / osiągnięcia"
            value={entry.desc}
            onChange={(value) => set(index, { desc: value })}
            placeholder="Np. obsługa maszyn, kompletacja zamówień, obsługa klienta..."
          />
        </Entry>
      ))}
      <AddButton label="Dodaj doświadczenie" onClick={add} />
    </div>
  );
}

export function EducationEditor({ data, update }: EditorProps<EducationItem[]>) {
  const add = () => update([...data, { school: "", degree: "", from: "", to: "", desc: "" }]);
  const set = (index: number, patch: Partial<EducationItem>) =>
    update(data.map((entry, entryIndex) => (entryIndex === index ? { ...entry, ...patch } : entry)));
  const remove = (index: number) => update(data.filter((_, entryIndex) => entryIndex !== index));

  return (
    <div>
      <div className="cvb-section-intro">
        <h3>Wykształcenie</h3>
        <p>Wpisz szkołę i kierunek. Możesz też dodać kursy lub praktyki.</p>
      </div>
      {data.map((entry, index) => (
        <Entry key={`${entry.school}-${entry.degree}-${index}`} title={entry.school || entry.degree} onDelete={() => remove(index)}>
          <TextField
            label="Uczelnia / szkoła"
            value={entry.school}
            onChange={(value) => set(index, { school: value })}
            placeholder="np. Technikum nr 2"
          />
          <TextField
            label="Kierunek / stopień"
            value={entry.degree}
            onChange={(value) => set(index, { degree: value })}
            placeholder="np. Technik mechanik"
          />
          <div className="cvb-field-row">
            <TextField label="Od" value={entry.from} onChange={(value) => set(index, { from: value })} placeholder="2018" />
            <TextField label="Do" value={entry.to} onChange={(value) => set(index, { to: value })} placeholder="2022" />
          </div>
          <TextArea
            label="Dodatkowe informacje"
            value={entry.desc}
            onChange={(value) => set(index, { desc: value })}
            rows={2}
            placeholder="opcjonalnie"
          />
        </Entry>
      ))}
      <AddButton label="Dodaj wykształcenie" onClick={add} />
    </div>
  );
}

export function SkillsEditor({ data, update }: EditorProps<string[]>) {
  return (
    <div>
      <div className="cvb-section-intro">
        <h3>Umiejętności</h3>
        <p>Wpisz umiejętność i naciśnij Enter albo przecinek, żeby dodać.</p>
      </div>
      <PillEditor value={data} onChange={update} placeholder="Praca zmianowa, obsługa klienta, UDT, BHP..." />
    </div>
  );
}

export function ProjectsEditor({ data, update }: EditorProps<ProjectItem[]>) {
  const add = () => update([...data, { name: "", role: "", desc: "", link: "" }]);
  const set = (index: number, patch: Partial<ProjectItem>) =>
    update(data.map((entry, entryIndex) => (entryIndex === index ? { ...entry, ...patch } : entry)));
  const remove = (index: number) => update(data.filter((_, entryIndex) => entryIndex !== index));

  return (
    <div>
      <div className="cvb-section-intro">
        <h3>Dodatkowe atuty</h3>
        <p>Dodaj osiągnięcia, dodatkowe obowiązki albo działania, którymi możesz się pochwalić.</p>
      </div>
      {data.map((entry, index) => (
        <Entry key={`${entry.name}-${entry.role}-${index}`} title={entry.name} onDelete={() => remove(index)}>
          <div className="cvb-field-row">
            <TextField
              label="Nazwa osiągnięcia / działania"
              value={entry.name}
              onChange={(value) => set(index, { name: value })}
              placeholder="np. Usprawnienie kompletacji zamówień"
            />
            <TextField
              label="Rola"
              value={entry.role}
              onChange={(value) => set(index, { role: value })}
              placeholder="np. Członek zespołu"
            />
          </div>
          <TextArea
            label="Opis"
            value={entry.desc}
            onChange={(value) => set(index, { desc: value })}
            rows={3}
            placeholder="Krótko opisz, co zrobiłeś/aś i jaki był efekt."
          />
          <TextField
            label="Link (opcjonalnie)"
            value={entry.link}
            onChange={(value) => set(index, { link: value })}
            placeholder="https://..."
          />
        </Entry>
      ))}
      <AddButton label="Dodaj atut" onClick={add} />
    </div>
  );
}

export function LanguagesEditor({ data, update }: EditorProps<LanguageItem[]>) {
  const add = () => update([...data, { name: "", level: "" }]);
  const set = (index: number, patch: Partial<LanguageItem>) =>
    update(data.map((entry, entryIndex) => (entryIndex === index ? { ...entry, ...patch } : entry)));
  const remove = (index: number) => update(data.filter((_, entryIndex) => entryIndex !== index));

  return (
    <div>
      <div className="cvb-section-intro">
        <h3>Języki</h3>
        <p>Język i poziom (A1-C2 lub opis).</p>
      </div>
      {data.map((entry, index) => (
        <Entry key={`${entry.name}-${entry.level}-${index}`} title={entry.name} onDelete={() => remove(index)}>
          <div className="cvb-field-row">
            <TextField
              label="Język"
              value={entry.name}
              onChange={(value) => set(index, { name: value })}
              placeholder="np. Angielski"
            />
            <TextField
              label="Poziom"
              value={entry.level}
              onChange={(value) => set(index, { level: value })}
              placeholder="np. C1"
            />
          </div>
        </Entry>
      ))}
      <AddButton label="Dodaj język" onClick={add} />
    </div>
  );
}

export function CertificatesEditor({ data, update }: EditorProps<CertificateItem[]>) {
  const add = () => update([...data, { name: "", issuer: "", date: "" }]);
  const set = (index: number, patch: Partial<CertificateItem>) =>
    update(data.map((entry, entryIndex) => (entryIndex === index ? { ...entry, ...patch } : entry)));
  const remove = (index: number) => update(data.filter((_, entryIndex) => entryIndex !== index));

  return (
    <div>
      <div className="cvb-section-intro">
        <h3>Certyfikaty</h3>
        <p>Ukończone kursy, szkolenia i uprawnienia (np. UDT, SEP, HACCP).</p>
      </div>
      {data.map((entry, index) => (
        <Entry key={`${entry.name}-${entry.issuer}-${index}`} title={entry.name} onDelete={() => remove(index)}>
          <TextField
            label="Nazwa"
            value={entry.name}
            onChange={(value) => set(index, { name: value })}
            placeholder="np. Uprawnienia UDT na wózki widłowe"
          />
          <div className="cvb-field-row">
            <TextField
              label="Wystawca"
              value={entry.issuer}
              onChange={(value) => set(index, { issuer: value })}
              placeholder="np. UDT"
            />
            <TextField
              label="Rok"
              value={entry.date}
              onChange={(value) => set(index, { date: value })}
              placeholder="2024"
            />
          </div>
        </Entry>
      ))}
      <AddButton label="Dodaj certyfikat" onClick={add} />
    </div>
  );
}
