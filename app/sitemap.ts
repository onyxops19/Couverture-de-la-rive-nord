import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  const now = new Date();

  return [
    { url: base,                                    lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${base}/services`,                      lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/membranes`,                     lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/realisations`,                  lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/contact`,                       lastModified: now, changeFrequency: 'yearly',  priority: 0.9 },
    { url: `${base}/couvreur-laval`,                lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/couvreur-montreal-nord`,        lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
  ];
}
