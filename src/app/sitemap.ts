import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteConfig.siteUrl, changeFrequency: "monthly", priority: 1 },
    { url: `${siteConfig.siteUrl}/colleges`, changeFrequency: "monthly", priority: 0.8 },
  ];
}
