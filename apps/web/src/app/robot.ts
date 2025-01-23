import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/private/*'],
      },
      {
        // GPTBot (ChatGPT/OpenAI)
        userAgent: 'GPTBot',
        disallow: '/',
      },
      {
        // Google-Extended (Bard/PaLM)
        userAgent: 'Google-Extended',
        disallow: '/',
      },
      {
        // CCBot (Common Crawl)
        userAgent: 'CCBot',
        disallow: '/',
      },
      {
        // anthropic-ai (Claude)
        userAgent: 'anthropic-ai',
        disallow: '/',
      },
      {
        // ChatGPT-User
        userAgent: 'ChatGPT-User',
        disallow: '/',
      },
      {
        // Cohere-ai
        userAgent: 'Cohere-ai',
        disallow: '/',
      },
      {
        // Clude-Web
        userAgent: 'Claude-Web',
        disallow: '/',
      },
    ],
    sitemap: `/sitemap.xml`,
  };
}
