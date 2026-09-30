import type { MetadataRoute } from "next";
import { POSTS } from "@/lib/journal";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/facilities", "/book", "/cafe", "/community", "/journal", "/contact", "/legal/privacy", "/legal/terms", "/legal/accessibility"];
  return [
    ...pages.map((p) => ({
      url: `${SITE.url}${p}`,
      changeFrequency: "monthly" as const,
      priority: p === "" ? 1 : p === "/book" ? 0.9 : p.startsWith("/legal") ? 0.2 : 0.7,
    })),
    ...POSTS.map((post) => ({
      url: `${SITE.url}/journal/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
