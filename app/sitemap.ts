import type { MetadataRoute } from "next";

const baseUrl = "https://www.urgentcareofennis.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/services", "/appointments", "/about", "/contact", "/services/walk-in-urgent-care", "/services/x-ray-lab", "/services/pediatric-family-urgent-care", "/services/physicals", "/services/occupational-medicine"].map((path) => ({ url: `${baseUrl}${path}`, lastModified: new Date(), changeFrequency: "monthly", priority: path === "" ? 1 : 0.8 }));
}

