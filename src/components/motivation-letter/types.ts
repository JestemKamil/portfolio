export type LetterStepKey =
  | "sender"
  | "job"
  | "opening"
  | "experience"
  | "motivation"
  | "closing";

export type LetterStep = {
  key: LetterStepKey;
  label: string;
};

export type LetterData = {
  senderName: string;
  senderEmail: string;
  senderPhone: string;
  senderCity: string;
  date: string;
  companyName: string;
  position: string;
  recruiterName: string;
  opening: string;
  experience: string;
  motivation: string;
  closing: string;
  consentEnabled: boolean;
  consentText: string;
};
