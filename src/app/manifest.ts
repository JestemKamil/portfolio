import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Kamil Wąsik — Portfolio",
    short_name: "Portfolio Kamil",
    description:
      "Portfolio web developera z projektami i darmowymi narzędziami online, w tym kreatorem CV.",
    start_url: "/",
    display: "standalone",
    background_color: "#fafaf8",
    theme_color: "#2a5c45",
  };
}
