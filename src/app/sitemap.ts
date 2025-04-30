import type { MetadataRoute } from 'next';

// Base URL for the site (replace with your actual domain)
const baseUrl = 'https://b12insight.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '/',
    '/about-b12',
    '/sources-of-b12',
    '/b12-deficiency-symptoms',
    '/resources',
    '/contact',
    '/legal',
  ];

  const staticUrls = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const, // Or 'monthly' based on update frequency
    priority: route === '/' ? 1.0 : 0.8, // Higher priority for home page
  }));

  // TODO: Add dynamic routes here if/when article pages are implemented
  // Example:
  // const articleUrls = articles.map((article) => ({
  //   url: `${baseUrl}/resources/articles/${article.id}`,
  //   lastModified: article.updatedAt, // Use actual article update date
  //   changeFrequency: 'monthly',
  //   priority: 0.6,
  // }));

  return [
    ...staticUrls,
    // ...articleUrls, // Uncomment when dynamic routes exist
  ];
}
