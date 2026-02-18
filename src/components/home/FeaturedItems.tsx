import Link from 'next/link'
import { ItemCard } from '@/components/catalog/ItemCard'
import type { Item } from '@/types/sanity'

interface FeaturedItemsProps {
  items: Item[]
}

export function FeaturedItems({ items }: FeaturedItemsProps) {
  if (!items || items.length === 0) return null

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
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-6">
          {items.map((item) => (
            <ItemCard key={item._id} item={item} />
          ))}
        </div>

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
