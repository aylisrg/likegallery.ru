'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useTransition } from 'react'

interface CategoryFilterProps {
  categories: string[]
  active: string
}

export function CategoryFilter({ categories, active }: CategoryFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  function handleSelect(category: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (category) {
      params.set('category', category)
    } else {
      params.delete('category')
    }
    params.delete('page')
    startTransition(() => {
      router.push(`/catalog?${params.toString()}`)
    })
  }

  return (
    <div className="flex flex-wrap gap-2 mb-8" role="navigation" aria-label="Фильтр по категориям">
      <button
        onClick={() => handleSelect('')}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
          !active
            ? 'bg-gold text-dark border-gold'
            : 'border-gold/30 text-parchment/70 hover:border-gold/60 hover:text-parchment'
        } ${isPending ? 'opacity-60 cursor-wait' : ''}`}
      >
        Все
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => handleSelect(cat)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
            active === cat
              ? 'bg-gold text-dark border-gold'
              : 'border-gold/30 text-parchment/70 hover:border-gold/60 hover:text-parchment'
          } ${isPending ? 'opacity-60 cursor-wait' : ''}`}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}
