import { MetadataRoute } from 'next'
import { client } from '@/lib/sanity/client'
import { ALL_ITEM_SLUGS_QUERY } from '@/lib/sanity/queries'

const BASE_URL = 'https://likegallery.ru'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let itemUrls: MetadataRoute.Sitemap = []

  try {
    const slugs = await client.fetch<{ slug: string }[]>(ALL_ITEM_SLUGS_QUERY)
    itemUrls = slugs.map(({ slug }) => ({
      url: `${BASE_URL}/catalog/${slug}`,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
  } catch {
    // If Sanity is not configured, return static pages only
  }

  return [
    { url: BASE_URL, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/catalog`, changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/services`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/about`, changeFrequency: 'monthly', priority: 0.6 },
    ...itemUrls,
  ]
}
