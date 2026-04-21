import type { LetterData, LetterStep } from "@/components/motivation-letter/types";

export const LM_STORAGE_KEY = "lm_data_v1";

export const DEFAULT_RODO_CLAUSE =
  "Wyrażam zgodę na przetwarzanie moich danych osobowych dla potrzeb niezbędnych do realizacji procesu rekrutacji zgodnie z Rozporządzeniem Parlamentu Europejskiego i Rady (UE) 2016/679 (RODO).";

export const LM_STEPS: LetterStep[] = [
  { key: "sender", label: "Twoje dane" },
  { key: "job", label: "Oferta pracy" },
  { key: "opening", label: "Wstęp" },
  { key: "experience", label: "Doświadczenie" },
  { key: "motivation", label: "Motywacja" },
  { key: "closing", label: "Zakończenie" },
];

export const LM_BLANK: LetterData = {
  senderName: "",
  senderEmail: "",
  senderPhone: "",
  senderCity: "",
  date: "",
  companyName: "",
  position: "",
  recruiterName: "",
  opening: "",
  experience: "",
  motivation: "",
  closing: "",
  consentEnabled: true,
  consentText: DEFAULT_RODO_CLAUSE,
};

export const LM_SAMPLE: LetterData = {
  senderName: "Anna Kowalska",
  senderEmail: "anna.kowalska@example.com",
  senderPhone: "+48 600 123 456",
  senderCity: "Warszawa",
  date: "21 kwietnia 2026",
  companyName: "Fabryka XYZ Sp. z o.o.",
  position: "Operator maszyn produkcyjnych",
  recruiterName: "",
  opening:
    "Z zainteresowaniem zapoznałam się z ofertą pracy na stanowisko Operatora maszyn produkcyjnych w Fabryce XYZ Sp. z o.o. Ogłoszenie znalazłam na portalu Pracuj.pl i jestem przekonana, że moje dotychczasowe doświadczenie oraz zaangażowanie doskonale wpisują się w oczekiwania Państwa firmy.",
  experience:
    "Przez ostatnie cztery lata pracowałam jako operatorka linii produkcyjnej w zakładzie przetwórczym, gdzie zdobyłam praktyczną wiedzę w zakresie obsługi maszyn CNC, przestrzegania norm BHP oraz realizacji planu produkcyjnego. Regularnie wykonywałam kontrole jakości wyrobów gotowych i raportowałam wyniki przełożonym. Potrafię pracować samodzielnie, jak i w zespole, a szybkie tempo pracy w systemie zmianowym nie stanowi dla mnie żadnego problemu.",
  motivation:
    "Szczególnie cenię sobie Państwa firmę za stabilność zatrudnienia, nowoczesny park maszynowy oraz opinie obecnych pracowników, którzy podkreślają dobrą atmosferę w zakładzie. Chciałabym dołączyć do zespołu, który dba o jakość i ciągły rozwój pracowników.",
  closing:
    "Chętnie spotkam się na rozmowie kwalifikacyjnej i opowiem więcej o swoim doświadczeniu. Jestem dostępna od zaraz i nie mam okresu wypowiedzenia. Proszę o kontakt pod numerem +48 600 123 456 lub drogą e-mailową.",
  consentEnabled: true,
  consentText: DEFAULT_RODO_CLAUSE,
};

export function letterIsEmpty(data: LetterData): boolean {
  return (
    !data.senderName &&
    !data.companyName &&
    !data.position &&
    !data.opening &&
    !data.experience &&
    !data.motivation &&
    !data.closing
  );
}

export function stepHasContent(key: string, data: LetterData): boolean {
  switch (key) {
    case "sender":
      return Boolean(data.senderName || data.senderEmail);
    case "job":
      return Boolean(data.companyName || data.position);
    case "opening":
      return Boolean(data.opening);
    case "experience":
      return Boolean(data.experience);
    case "motivation":
      return Boolean(data.motivation);
    case "closing":
      return Boolean(data.closing);
    default:
      return false;
  }
}
