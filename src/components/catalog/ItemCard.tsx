import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/image'
import type { Item } from '@/types/sanity'

interface ItemCardProps {
  item: Item
}

export function ItemCard({ item }: ItemCardProps) {
  const { title, slug, status, price, mainImage, category } = item
  const isSold = status === 'sold'
  const isRestoration = status === 'restoration'

  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP ?? ''
  const soldMsg = encodeURIComponent(
    `У меня есть предмет, похожий на «${title}», хочу продать. Можете оценить?`
  )

  const imageUrl = mainImage
    ? urlFor(mainImage).width(600).height(800).auto('format').url()
    : null

  return (
    <article className="group bg-dark-card rounded-xl overflow-hidden border border-gold/10 hover:border-gold/30 hover:-translate-y-1 transition-all duration-300">
      {/* Image */}
      <Link href={`/catalog/${slug.current}`} className="block relative aspect-[3/4] overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={mainImage?.alt ?? title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className={`object-cover transition-all duration-500 group-hover:scale-105 ${
              isSold ? 'grayscale brightness-75' : ''
            }`}
          />
        ) : (
          <div className="absolute inset-0 bg-dark-soft flex items-center justify-center">
            <span className="text-parchment/30 text-sm">Нет фото</span>
          </div>
        )}

        {/* SOLD overlay */}
        {isSold && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="rotate-[-12deg] border-2 border-gold bg-dark/70 px-5 py-2">
              <span className="font-serif text-gold text-xl font-bold tracking-widest">
                ПРОДАНО
              </span>
            </div>
          </div>
        )}

        {/* Restoration badge */}
        {isRestoration && (
          <div className="absolute top-3 right-3 bg-amber-700/90 text-white text-xs px-2.5 py-1 rounded-full font-medium">
            Реставрация
          </div>
        )}
      </Link>

      {/* Card body */}
      <div className="p-4 space-y-2">
        <p className="text-gold/70 text-xs uppercase tracking-wider font-medium">{category}</p>
        <h3 className="font-serif text-parchment text-base leading-snug line-clamp-2 min-h-[2.5rem]">
          {title}
        </h3>

        {!isSold && price && (
          <p className="text-gold font-semibold text-sm">{price}</p>
        )}

        {/* CTA */}
        <div className="pt-1">
          {isSold ? (
            <a
              href={`https://wa.me/${whatsapp}?text=${soldMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center border border-gold/50 text-gold text-xs py-2.5 rounded-lg hover:bg-gold hover:text-dark transition-colors duration-200 font-semibold leading-tight px-2"
            >
              Владеете подобным? Купим дорого
            </a>
          ) : (
            <Link
              href={`/catalog/${slug.current}`}
              className="block w-full text-center bg-gold text-dark text-sm py-2.5 rounded-lg font-semibold hover:bg-gold/80 transition-colors duration-200"
            >
              {isRestoration ? 'Подробнее' : 'Купить / Обсудить'}
            </Link>
          )}
        </div>
      </div>
    </article>
  )
}
