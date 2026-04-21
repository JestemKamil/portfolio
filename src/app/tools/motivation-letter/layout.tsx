import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@/app/tools/cv-creator/cv-builder.css";
import "./motivation-letter.css";

export const metadata: Metadata = {
  title: "Kreator Listu Motywacyjnego",
  description: "Darmowy kreator listu motywacyjnego — wypełnij kilka pól, pobierz gotowy PDF. Bez rejestracji, bez opłat.",
  alternates: {
    canonical: "/tools/motivation-letter",
  },
  openGraph: {
    title: "Kreator Listu Motywacyjnego — Kamil Wąsik",
    description: "Kreator listu motywacyjnego z podglądem na żywo i eksportem do PDF. Dane zostają w Twojej przeglądarce.",
    url: "/tools/motivation-letter",
  },
  twitter: {
    card: "summary",
    title: "Kreator Listu Motywacyjnego — Kamil Wąsik",
    description: "Darmowy kreator listu motywacyjnego z podglądem i eksportem PDF.",
  },
};

export default function MotivationLetterLayout({ children }: { children: ReactNode }) {
  return children;
}
