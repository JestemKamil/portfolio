export type CvSectionKey =
  | "personal"
  | "summary"
  | "experience"
  | "education"
  | "skills"
  | "projects"
  | "languages"
  | "certificates";

export type CvSection = {
  key: CvSectionKey;
  label: string;
};

export type PersonalData = {
  name: string;
  title: string;
  email: string;
  phone: string;
  city: string;
  website: string;
  linkedin: string;
  consentEnabled: boolean;
  consentText: string;
};

export type ExperienceItem = {
  role: string;
  company: string;
  from: string;
  to: string;
  desc: string;
};

export type EducationItem = {
  school: string;
  degree: string;
  from: string;
  to: string;
  desc: string;
};

export type ProjectItem = {
  name: string;
  role: string;
  desc: string;
  link: string;
};

export type LanguageItem = {
  name: string;
  level: string;
};

export type CertificateItem = {
  name: string;
  issuer: string;
  date: string;
};

export type CvData = {
  personal: PersonalData;
  summary: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: string[];
  projects: ProjectItem[];
  languages: LanguageItem[];
  certificates: CertificateItem[];
};

export type CvTemplateKey = "editorial" | "mono" | "compact" | "clean";
