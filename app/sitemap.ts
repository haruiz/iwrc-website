import type { MetadataRoute } from "next";
import { flatNavItems } from "@/content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.weedrecognition.org";
  return [
    {
      url: baseUrl,
      lastModified: new Date()
    },
    ...flatNavItems
      .filter((item) => item.href !== "/")
      .map((item) => ({
        url: `${baseUrl}${item.href}`,
        lastModified: new Date()
      }))
  ];
}
