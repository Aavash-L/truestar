import { MetadataRoute } from "next";
import { towns } from "@/data/towns";
import { services, subServices } from "@/data/services";
import { siteConfig } from "@/data/siteConfig";

const base = siteConfig.url;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/service-areas`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/estimate`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/gallery`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/reviews`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];

  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${base}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const subServicePages: MetadataRoute.Sitemap = subServices.map((s) => ({
    url: `${base}/services/${s.parentSlug}/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const townPages: MetadataRoute.Sitemap = towns.map((t) => ({
    url: `${base}/service-areas/${t.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: t.tier === 1 ? 0.8 : 0.7,
  }));

  const townServicePages: MetadataRoute.Sitemap = towns.flatMap((t) =>
    services.map((s) => ({
      url: `${base}/service-areas/${t.slug}/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: t.tier === 1 ? 0.7 : 0.6,
    }))
  );

  return [
    ...staticPages,
    ...servicePages,
    ...subServicePages,
    ...townPages,
    ...townServicePages,
  ];
}
