import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://emoji-maker.app', lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: 'https://emoji-maker.app/emoji-maker-for-slack', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: 'https://emoji-maker.app/emoji-maker-for-discord', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
  ]
}
