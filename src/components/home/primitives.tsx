import type { ReactNode } from "react";
import Link from "next/link";
import type { ContactChannel, HeroStat, Project, Tool } from "@/components/home/types";

export function Divider() {
  return <div className="divider" />;
}

type SectionHeadingProps = {
  label: string;
  title: ReactNode;
  subtitle?: string;
};

export function SectionHeading({ label, title, subtitle }: SectionHeadingProps) {
  return (
    <>
      <div className="section-label">{label}</div>
      <h2>{title}</h2>
      {subtitle ? <p className="section-sub">{subtitle}</p> : null}
    </>
  );
}

export function HeroStatCard({ value, label }: HeroStat) {
  const lines = label.split("\n");
  return (
    <div className="stat-item">
      <div className="stat-num">{value}</div>
      <div className="stat-label">
        {lines.map((line, index) => (
          <span key={line}>
            {index > 0 ? <br /> : null}
            {line}
          </span>
        ))}
      </div>
    </div>
  );
}

type ProjectRowProps = {
  project: Project;
};

export function ProjectRow({ project }: ProjectRowProps) {
  const content = (
    <>
      <div className="project-index">
        <span>{project.index}</span>
      </div>
      <div className="project-body">
        <div className="project-meta">
          <span className="project-cat">{project.category}</span>
        </div>
        <h3 className="project-title">{project.title}</h3>
        <p className="project-desc">{project.description}</p>
        <div className="project-tags">
          {project.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="project-arrow">→</div>
    </>
  );

  if (!project.href) {
    return <div className="project-row">{content}</div>;
  }

  return (
    <a href={project.href} target="_blank" rel="noreferrer" className="project-row">
      {content}
    </a>
  );
}

type ToolCardProps = {
  tool: Tool;
};

export function ToolCard({ tool }: ToolCardProps) {
  const isLive = tool.status === "live";
  const cardClassName = `tool-card ${isLive ? "live" : "soon"}`;
  const badgeClassName = `tool-badge ${isLive ? "live-badge" : "soon-badge"}`;
  const badgeText = isLive ? "Dostępne" : "Wkrótce";
  const isInternalToolLink = Boolean(tool.href && tool.href.startsWith("/"));

  return (
    <div className={cardClassName}>
      <span className={badgeClassName}>{badgeText}</span>
      <div className="tool-icon-wrap">{tool.icon}</div>
      <h3 className="tool-name">{tool.name}</h3>
      <p className="tool-desc">{tool.description}</p>
      {isLive && tool.href ? (
        isInternalToolLink ? (
          <Link href={tool.href} className="tool-link">
            Przejdź do narzędzia →
          </Link>
        ) : (
          <a href={tool.href} className="tool-link" target="_blank" rel="noreferrer">
            Przejdź do narzędzia →
          </a>
        )
      ) : null}
    </div>
  );
}

type ContactLinkProps = {
  channel: ContactChannel;
};

export function ContactLink({ channel }: ContactLinkProps) {
  return (
    <a
      href={channel.href}
      className="contact-link"
      target={channel.external ? "_blank" : undefined}
      rel={channel.external ? "noreferrer" : undefined}
    >
      <div className="contact-link-icon">{channel.icon}</div>
      {channel.label}
    </a>
  );
}
