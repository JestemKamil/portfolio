import type { CvData, CvSection, CvSectionKey } from "@/components/cv-builder/types";

export const CV_STORAGE_KEY = "cv-builder-v1";
export const CV_TEMPLATE_KEY = "cv-template";
export const CV_VIEW_KEY = "cv-view";
export const DEFAULT_RODO_CLAUSE =
  "Wyrażam zgodę na przetwarzanie moich danych osobowych zawartych w CV dla potrzeb niezbędnych do realizacji procesu rekrutacji (zgodnie z art. 6 ust. 1 lit. a RODO).";

export const CV_SECTIONS: CvSection[] = [
  { key: "personal", label: "Dane" },
  { key: "summary", label: "O mnie" },
  { key: "experience", label: "Doświadczenie" },
  { key: "education", label: "Edukacja" },
  { key: "skills", label: "Umiejętności" },
  { key: "projects", label: "Dodatkowe atuty" },
  { key: "languages", label: "Języki" },
  { key: "certificates", label: "Certyfikaty" },
];

export const CV_BLANK: CvData = {
  personal: {
    name: "",
    title: "",
    email: "",
    phone: "",
    city: "",
    website: "",
    linkedin: "",
    consentEnabled: true,
    consentText: DEFAULT_RODO_CLAUSE,
  },
  summary: "",
  experience: [],
  education: [],
  skills: [],
  projects: [],
  languages: [],
  certificates: [],
};

export const CV_SAMPLE: CvData = {
  personal: {
    name: "Piotr Nowak",
    title: "Pracownik produkcji / asystent sprzedaży",
    email: "piotr.nowak@example.com",
    phone: "+48 602 123 456",
    city: "Dąbrowa Górnicza",
    website: "",
    linkedin: "",
    consentEnabled: true,
    consentText: DEFAULT_RODO_CLAUSE,
  },
  summary:
    "Mam 6 lat doświadczenia w pracy zmianowej w produkcji i handlu. Jestem punktualny, dobrze odnajduję się w zespole i szybko wdrażam się w nowe obowiązki. Szukam stabilnej pracy, w której liczy się solidność i odpowiedzialność.",
  experience: [
    {
      role: "Operator linii produkcyjnej",
      company: "ArcelorMittal Poland",
      from: "2022",
      to: "obecnie",
      desc: "Obsługa i kontrola linii produkcyjnej, raportowanie awarii, utrzymanie porządku na stanowisku. Praca w systemie 3-zmianowym.",
    },
    {
      role: "Asystent sprzedaży",
      company: "Leroy Merlin",
      from: "2019",
      to: "2022",
      desc: "Obsługa klienta na sali sprzedaży, doradztwo produktowe, przyjęcia dostaw i wykładanie towaru.",
    },
    {
      role: "Magazynier",
      company: "Raben Logistics",
      from: "2017",
      to: "2019",
      desc: "Kompletacja zamówień, skanowanie towaru, przygotowanie wysyłek i współpraca z działem transportu.",
    },
  ],
  education: [
    {
      school: "Technikum nr 2",
      degree: "Technik mechanik",
      from: "2013",
      to: "2017",
      desc: "Praktyki zawodowe w zakładzie produkcyjnym.",
    },
  ],
  skills: [
    "Praca zmianowa",
    "Obsługa skanera magazynowego",
    "Dokładność i dobra organizacja",
    "Obsługa klienta",
    "Przestrzeganie zasad BHP",
    "Współpraca w zespole",
  ],
  projects: [
    {
      name: "Skrócenie czasu kompletacji",
      role: "Członek zespołu usprawnień",
      desc: "Wspólnie z brygadzistą uporządkowałem strefy odkładcze, co usprawniło przygotowanie wysyłek.",
      link: "",
    },
    {
      name: "Wsparcie wdrożenia nowych osób",
      role: "Opiekun stanowiskowy",
      desc: "Pomagałem przy wdrożeniu nowych pracowników na zmianie i przekazywałem standardy pracy.",
      link: "",
    },
  ],
  languages: [
    { name: "Polski", level: "Ojczysty" },
    { name: "Angielski", level: "Podstawowy (A2)" },
  ],
  certificates: [
    { name: "Uprawnienia UDT na wózki widłowe", issuer: "UDT", date: "2024" },
    { name: "Książeczka sanepidowska", issuer: "Sanepid", date: "2023" },
  ],
};

export function sectionHasContent(key: CvSectionKey, data: CvData): boolean {
  if (key === "personal") {
    return Boolean(data.personal.name || data.personal.email);
  }

  if (key === "summary") {
    return data.summary.trim().length > 10;
  }

  const value = data[key];
  return Array.isArray(value) && value.length > 0;
}

export function cvIsEmpty(data: CvData): boolean {
  const {
    personal,
    summary,
    experience,
    education,
    skills,
    projects,
    languages,
    certificates,
  } = data;

  return !(
    personal.name ||
    personal.title ||
    summary ||
    experience.length ||
    education.length ||
    skills.length ||
    projects.length ||
    languages.length ||
    certificates.length
  );
}
