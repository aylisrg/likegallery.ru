import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { client } from '@/lib/sanity/client'
import { ITEM_BY_SLUG_QUERY, ALL_ITEM_SLUGS_QUERY } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'
import { ImageGallery } from '@/components/item/ImageGallery'
import { StatusCTA } from '@/components/item/StatusCTA'
import Link from 'next/link'
import type { Item } from '@/types/sanity'

export const revalidate = 3600

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  try {
    const slugs = await client.fetch<{ slug: string }[]>(ALL_ITEM_SLUGS_QUERY)
    return slugs.map(({ slug }) => ({ slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  try {
    const item = await client.fetch<Item>(ITEM_BY_SLUG_QUERY, { slug })
    if (!item) return { title: 'Предмет не найден' }

    const ogImage =
      item.images?.[0]
        ? urlFor(item.images[0]).width(1200).height(630).auto('format').url()
        : undefined

    return {
      title: item.title,
      description: item.description?.slice(0, 160),
      openGraph: {
        title: item.title,
        description: item.description?.slice(0, 160),
        images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : [],
        type: 'website',
      },
    }
  } catch {
    return { title: 'Предмет' }
  }
}

export default async function ItemPage({ params }: Props) {
  const { slug } = await params
  let item: Item | null = null

  try {
    item = await client.fetch<Item>(ITEM_BY_SLUG_QUERY, { slug })
  } catch {
    /* empty */
  }

  if (!item) {
    notFound()
  }

  const statusLabels: Record<string, string> = {
    active: 'В наличии',
    sold: 'Продано',
    restoration: 'На реставрации',
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="section-container">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-parchment/40 mb-8">
          <Link href="/catalog" className="hover:text-gold transition-colors">
            Каталог
          </Link>
          <span>/</span>
          <span className="hover:text-gold transition-colors cursor-pointer"
            onClick={() => history.back()}
          >
            {item.category}
          </span>
          <span>/</span>
          <span className="text-parchment/70 line-clamp-1">{item.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16">
          {/* Images */}
          <div>
            {item.images && item.images.length > 0 ? (
              <ImageGallery
                images={item.images}
                title={item.title}
                isSold={item.status === 'sold'}
              />
            ) : (
              <div className="aspect-square bg-dark-soft rounded-xl flex items-center justify-center">
                <span className="text-parchment/30">Нет фотографий</span>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <Link
                  href={`/catalog?category=${encodeURIComponent(item.category)}`}
                  className="text-xs text-gold/70 uppercase tracking-wider font-medium hover:text-gold transition-colors"
                >
                  {item.category}
                </Link>
                <span className="text-parchment/20">·</span>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                  item.status === 'active' ? 'bg-emerald-900/40 text-emerald-400 border border-emerald-700/30' :
                  item.status === 'sold' ? 'bg-gold/10 text-gold border border-gold/20' :
                  'bg-amber-900/40 text-amber-400 border border-amber-700/30'
                }`}>
                  {statusLabels[item.status]}
                </span>
              </div>

              <h1 className="font-serif text-2xl sm:text-3xl text-parchment leading-snug">
                {item.title}
              </h1>
            </div>

            {/* CTA block */}
            <StatusCTA item={item} />

            {/* Description */}
            {item.description && (
              <div>
                <h2 className="text-parchment/50 text-xs uppercase tracking-wider mb-3 font-medium">
                  Описание / Провенанс
                </h2>
                <div className="text-parchment/80 text-sm leading-relaxed whitespace-pre-wrap">
                  {item.description}
                </div>
              </div>
            )}

            {/* Expertise PDF */}
            {item.expertisePdf?.asset?.url && (
              <div className="border border-gold/20 rounded-xl p-4 flex items-center gap-4">
                <span className="text-2xl">📋</span>
                <div className="flex-1">
                  <p className="text-parchment font-medium text-sm">Экспертное заключение</p>
                  <p className="text-parchment/50 text-xs">PDF документ</p>
                </div>
                <a
                  href={item.expertisePdf.asset.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline-gold text-xs py-2 px-4"
                >
                  Скачать
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
