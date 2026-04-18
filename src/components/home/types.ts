import type { ReactNode } from "react";

export type NavLink = {
  href: string;
  label: string;
  cta?: boolean;
};

export type HeroStat = {
  value: string;
  label: string;
};

export type TechGroup = {
  label: string;
  tags: string[];
};

export type Project = {
  index: string;
  category: string;
  title: string;
  description: string;
  tags: string[];
  href?: string;
};

export type ToolStatus = "live" | "soon";

export type Tool = {
  name: string;
  description: string;
  status: ToolStatus;
  icon: ReactNode;
  href?: string;
};

export type ContactChannel = {
  label: string;
  href: string;
  icon: ReactNode;
  external?: boolean;
};
