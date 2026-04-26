import type { MetadataRoute } from "next";
import { cities } from "@/lib/cities";

const BASE_URL = "https://lyrvio.com";

function toSlug(str: string): string {
  return str
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss");
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/wohnung-finden`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/extension`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/checkout`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  const cityPages: MetadataRoute.Sitemap = Object.values(cities).map((city) => ({
    url: `${BASE_URL}/wohnung-finden/${city.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const districtPages: MetadataRoute.Sitemap = Object.values(cities).flatMap((city) =>
    city.phase2Districts.map((bezirk) => ({
      url: `${BASE_URL}/wohnung-finden/${city.slug}/${toSlug(bezirk)}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.75,
    }))
  );

  return [...staticPages, ...cityPages, ...districtPages];
}
