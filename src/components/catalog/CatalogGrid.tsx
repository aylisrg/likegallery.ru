import { ItemCard } from './ItemCard'
import type { Item } from '@/types/sanity'

interface CatalogGridProps {
  items: Item[]
}

export function CatalogGrid({ items }: CatalogGridProps) {
  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-parchment/40 text-lg font-serif">Предметы не найдены</p>
        <p className="text-parchment/30 text-sm mt-2">Попробуйте выбрать другую категорию</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {items.map((item) => (
        <ItemCard key={item._id} item={item} />
      ))}
    </div>
  )
}
