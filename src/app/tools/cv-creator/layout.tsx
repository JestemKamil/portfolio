import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./cv-builder.css";

export const metadata: Metadata = {
  title: "Kreator CV",
  description: "Kreator CV pod pracę w produkcji, handlu, magazynie i usługach — z podglądem i PDF.",
  alternates: {
    canonical: "/tools/cv-creator",
  },
  openGraph: {
    title: "Kreator CV — Kamil Wąsik",
    description: "Darmowy kreator CV pod pracę poza IT: podgląd na żywo, kilka szablonów i eksport do PDF.",
    url: "/tools/cv-creator",
  },
  twitter: {
    card: "summary",
    title: "Kreator CV — Kamil Wąsik",
    description: "Darmowy kreator CV z podglądem i eksportem PDF.",
  },
};

export default function CvCreatorLayout({ children }: { children: ReactNode }) {
  return children;
}
