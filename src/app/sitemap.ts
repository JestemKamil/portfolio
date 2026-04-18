import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: "https://kamil-wasik.pl",
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://kamil-wasik.pl/tools/cv-creator",
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://kamil-wasik.pl/privacy",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];
}
