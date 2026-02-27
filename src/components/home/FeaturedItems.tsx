'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ItemCard } from '@/components/catalog/ItemCard'
import type { Item } from '@/types/sanity'

const INITIAL_VISIBLE = 8

interface FeaturedItemsProps {
  items: Item[]
}

export function FeaturedItems({ items }: FeaturedItemsProps) {
  const [showAll, setShowAll] = useState(false)

  if (!items || items.length === 0) return null

  const hasMore = items.length > INITIAL_VISIBLE
  const visibleItems = showAll ? items : items.slice(0, INITIAL_VISIBLE)

  return (
    <section className="py-20 bg-dark" id="portfolio">
      <div className="section-container">
        {/* Section header */}
        <div className="text-center mb-12">
          <p className="text-gold text-xs uppercase tracking-[0.3em] mb-3 font-medium">
            Наше портфолио
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-parchment mb-4">
            Успешно проданные предметы
          </h2>
          <p className="text-parchment/60 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            Владеете подобным предметом? Мы поможем оценить и найти достойного покупателя
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {visibleItems.map((item) => (
            <ItemCard key={item._id} item={item} />
          ))}
        </div>

        {/* Show more / show less */}
        {hasMore && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAll(!showAll)}
              className="btn-outline-gold py-2 px-6 text-sm"
            >
              {showAll
                ? 'Свернуть'
                : `Показать все (${items.length})`}
            </button>
          </div>
        )}

        {/* CTA to full catalog */}
        <div className="text-center mt-12">
          <Link href="/catalog" className="btn-outline-gold">
            Смотреть весь каталог
          </Link>
        </div>
      </div>
    </section>
  )
}
