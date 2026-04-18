import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./cv-builder.css";

export const metadata: Metadata = {
  title: "CV Creator — Kamil Wąsik",
  description: "Kreator CV z podglądem na żywo i eksportem do PDF.",
};

export default function CvCreatorLayout({ children }: { children: ReactNode }) {
  return children;
}
