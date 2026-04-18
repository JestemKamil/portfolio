import {
  ClockIcon,
  DocumentIcon,
  LinkIcon,
  MailIcon,
  MessageIcon,
  UsersIcon,
} from "@/components/home/icons";
import type {
  ContactChannel,
  HeroStat,
  NavLink,
  Project,
  TechGroup,
  Tool,
} from "@/components/home/types";

export const navLinks: NavLink[] = [
  { href: "#about", label: "O mnie" },
  { href: "#projects", label: "Projekty" },
  { href: "#tools", label: "Narzędzia" },
  { href: "#contact", label: "Kontakt", cta: true },
];

export const heroStats: HeroStat[] = [
  { value: "7", label: "Zrealizowanych\nprojektów" },
  { value: "3 lata", label: "Doświadczenia\nkomercyjnego" },
  { value: "100%", label: "Projektów\nw terminie" },
];

export const techGroups: TechGroup[] = [
  {
    label: "CMS & E-commerce",
    tags: ["WordPress", "Elementor Pro", "WooCommerce", "ACF", "PayloadCMS"],
  },
  {
    label: "Języki & Frameworki",
    tags: ["PHP", "Symfony", "JavaScript", "React", "Next.js", "NestJS"],
  },
  {
    label: "UI & Stylowanie",
    tags: ["HTML / CSS", "TailwindCSS", "shadcn/ui", "MUI"],
  },
  {
    label: "AI & Integracje API",
    tags: ["OpenAI API", "Anthropic API", "Google Cloud APIs", "LLM's API", "Stripe"],
  },
  {
    label: "Narzędzia & Infrastruktura",
    tags: ["Git", "REST API", "Cloudflare"],
  },
];

export const projects: Project[] = [
  {
    index: "01",
    category: "Strona firmowa",
    title: "FDS Polska — strona internetowa",
    description:
      "Strona dla firmy FDS Polska stworzona w technologii RemixJS z zastosowaniem TailwindCSS — responsywna, nowoczesna, zoptymalizowana pod każde urządzenie.",
    tags: ["RemixJS", "TailwindCSS"],
    href: "https://www.fdspolska.com.pl/",
  },
  {
    index: "02",
    category: "Landing page",
    title: "yourtax.pl — E-Book KSeF",
    description:
      "Landing page umożliwiający zapisanie się do darmowego e-booka na temat Krajowego Systemu e-Faktur. Prosta, skuteczna strona generująca leady.",
    tags: ["WordPress", "Landing page"],
    href: "https://yourtax.pl/darmowy-e-book/",
  },
  {
    index: "03",
    category: "Strona firmowa",
    title: "Czysta Spółka — strona internetowa",
    description:
      "Strona firmowa dla firmy Czysta Spółka — profesjonalna prezentacja oferty z naciskiem na zaufanie i przejrzystość komunikacji z klientem.",
    tags: ["WordPress", "Elementor"],
    href: "https://czystaspolka.pl/",
  },
  {
    index: "04",
    category: "Platforma edukacyjna",
    title: "Centrum Edukacji Zawodowej — strona rekrutacji",
    description:
      "Strona rekrutacyjna dla Centrum Edukacji Zawodowej w Stalowej Woli. Projekt oparty na frameworku Next.js z komponentami Material UI — szybka, dostępna, łatwa w zarządzaniu.",
    tags: ["Next.js", "MUI"],
    href: "https://rekrutacja.cezstalowawola.pl/",
  },
  {
    index: "05",
    category: "Strona firmowa",
    title: "Audyt Księgowy — strona internetowa",
    description:
      "Strona firmowa dla biura audytu księgowego. Przejrzysty design podkreślający profesjonalizm i budujący zaufanie wśród potencjalnych klientów biznesowych.",
    tags: ["WordPress", "Elementor"],
    href: "https://audytksiegowy.pl/",
  },
  {
    index: "06",
    category: "Aplikacja webowa",
    title: "NASA Space Apps — aplikacja zorzy polarnej",
    description:
      "Aplikacja webowa prezentująca aktualne lokalizacje zorzy polarnej na interaktywnym globusie. Umożliwia śledzenie jej występowania w czasie rzeczywistym. Zrealizowana na hackathonie NASA Space Apps.",
    tags: ["Hackathon", "Interactive Globe", "NASA API"],
  },
  {
    index: "07",
    category: "Aplikacja webowa",
    title: "Chatbot AI — aplikacja w Symfony / PHP",
    description:
      "Prototyp chatbota opartego na AI, napisany w Symfony. Projekt stworzony jako samodzielne ćwiczenie techniczne eksplorujące integrację modeli językowych z aplikacjami PHP.",
    tags: ["PHP", "Symfony", "AI"],
  },
];

export const tools: Tool[] = [
  {
    name: "CV Creator",
    description:
      "Stwórz profesjonalne CV w kilka minut. Wybierz szablon, wypełnij dane, pobierz gotowy PDF. Bez watermarków, bez zakładania konta.",
    status: "live",
    icon: <DocumentIcon />,
    href: "/tools/cv-creator",
  },
  {
    name: "Kreator Listu Motywacyjnego",
    description:
      "Uzupełnij kilka pól — narzędzie wygeneruje spójny, dobrze napisany list motywacyjny dopasowany do konkretnej oferty pracy i branży.",
    status: "live",
    icon: <MessageIcon />,
    href: "#",
  },
  {
    name: "Kalkulator Wynagrodzeń",
    description:
      "Porównaj formy zatrudnienia — UoP, B2B, umowa zlecenie. Przelicz brutto/netto i sprawdź realny koszt po stronie pracodawcy.",
    status: "soon",
    icon: <ClockIcon />,
  },
  {
    name: "LinkedIn Bio Generator",
    description:
      'Wygeneruj sekcję "O mnie" na LinkedIn — zwięzłą, profesjonalną i zoptymalizowaną pod algorytmy wyszukiwania rekruterów.',
    status: "soon",
    icon: <UsersIcon />,
  },
];

export const contactChannels: ContactChannel[] = [
  {
    label: "kontakt@kamil-wasik.pl",
    href: "mailto:kontakt@kamil-wasik.pl",
    icon: <MailIcon />,
  },
  {
    label: "Profil na Useme.com",
    href: "https://useme.com/pl/roles/contractor/kamil-wasik,281578/",
    icon: <LinkIcon />,
    external: true,
  },
];
