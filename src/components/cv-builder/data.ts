import type { CvData, CvSection, CvSectionKey } from "@/components/cv-builder/types";

export const CV_STORAGE_KEY = "cv-builder-v1";
export const CV_TEMPLATE_KEY = "cv-template";
export const CV_VIEW_KEY = "cv-view";

export const CV_SECTIONS: CvSection[] = [
  { key: "personal", label: "Dane" },
  { key: "summary", label: "O mnie" },
  { key: "experience", label: "Doświadczenie" },
  { key: "education", label: "Edukacja" },
  { key: "skills", label: "Umiejętności" },
  { key: "projects", label: "Projekty" },
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
    name: "Anna Kowalska",
    title: "Senior Product Designer",
    email: "anna.kowalska@example.com",
    phone: "+48 600 123 456",
    city: "Warszawa, PL",
    website: "anna.design",
    linkedin: "linkedin.com/in/akowalska",
  },
  summary:
    "Product designer z 7-letnim doświadczeniem w budowaniu produktów cyfrowych — od wczesnych prototypów po systemy dla milionów użytkowników. Łączę research, UI i strategię. Najchętniej pracuję tam, gdzie design spotyka realne ograniczenia biznesu.",
  experience: [
    {
      role: "Senior Product Designer",
      company: "Allegro",
      from: "2022",
      to: "obecnie",
      desc: "Prowadzę design systemu dla obszaru płatności. Zredukowałam czas onboardingu sprzedawców o 34%.",
    },
    {
      role: "Product Designer",
      company: "Brainly",
      from: "2019",
      to: "2022",
      desc: "Rebuild aplikacji mobilnej (iOS + Android). Współpraca z zespołem badawczym nad wzrostem retencji.",
    },
    {
      role: "UI Designer",
      company: "Netguru",
      from: "2017",
      to: "2019",
      desc: "Projekty dla startupów z UK i DACH — fintech, e-commerce, health.",
    },
  ],
  education: [
    {
      school: "ASP Warszawa",
      degree: "Projektowanie graficzne, mgr",
      from: "2014",
      to: "2019",
      desc: "",
    },
  ],
  skills: [
    "Figma",
    "Design Systems",
    "Prototyping",
    "User Research",
    "Framer",
    "HTML/CSS",
    "Accessibility",
  ],
  projects: [
    {
      name: "Kassa — system POS",
      role: "Lead Designer",
      desc: "Design system i aplikacja kasowa dla sieci 120 kawiarni.",
      link: "",
    },
    {
      name: "Mint Health",
      role: "Product Designer",
      desc: "Telemedycyna dla zdrowia psychicznego, aplikacja iOS.",
      link: "",
    },
  ],
  languages: [
    { name: "Polski", level: "Ojczysty" },
    { name: "Angielski", level: "C1" },
    { name: "Niemiecki", level: "B1" },
  ],
  certificates: [{ name: "NN/g UX Certification", issuer: "Nielsen Norman Group", date: "2023" }],
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
