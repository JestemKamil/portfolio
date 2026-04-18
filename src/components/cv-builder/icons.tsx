type CvIconProps = {
  name:
    | "plus"
    | "trash"
    | "download"
    | "sliders"
    | "arrow-left"
    | "sun"
    | "sparkles";
  size?: number;
};

export function CvIcon({ name, size = 14 }: CvIconProps) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (name) {
    case "plus":
      return (
        <svg {...common}>
          <path d="M12 5v14M5 12h14" />
        </svg>
      );
    case "trash":
      return (
        <svg {...common}>
          <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M6 6l1 14a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-14" />
        </svg>
      );
    case "download":
      return (
        <svg {...common}>
          <path d="M12 3v13M6 11l6 6 6-6M4 21h16" />
        </svg>
      );
    case "sliders":
      return (
        <svg {...common}>
          <path d="M4 6h10M18 6h2M4 12h2M10 12h10M4 18h14" />
          <circle cx="16" cy="6" r="2" />
          <circle cx="8" cy="12" r="2" />
        </svg>
      );
    case "arrow-left":
      return (
        <svg {...common}>
          <path d="M15 18l-6-6 6-6" />
        </svg>
      );
    case "sun":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4L7 17M17 7l1.4-1.4" />
        </svg>
      );
    case "sparkles":
      return (
        <svg {...common}>
          <path d="M5 12l2-5 2 5 5 2-5 2-2 5-2-5-5-2 5-2z" />
          <path d="M18 4l0.7 1.8L20.5 6.5l-1.8 0.7L18 9l-0.7-1.8L15.5 6.5l1.8-0.7L18 4z" />
        </svg>
      );
    default:
      return null;
  }
}
