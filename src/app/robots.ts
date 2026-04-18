import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://kamil-wasik.pl/sitemap.xml",
    host: "https://kamil-wasik.pl",
  };
}
