import { Suspense } from 'react'
import type { Metadata } from 'next'
import { client } from '@/lib/sanity/client'
import { ITEMS_QUERY, ITEMS_COUNT_QUERY } from '@/lib/sanity/queries'
import { CatalogGrid } from '@/components/catalog/CatalogGrid'
import { CategoryFilter } from '@/components/catalog/CategoryFilter'
import Link from 'next/link'
import type { Item } from '@/types/sanity'

export const revalidate = 3600

const CATEGORIES = [
  'Буддизм',
  'Христианство',
  'Индия/Гималаи',
  'Китай/Тибет',
  'Монголия/Дзанабазар',
  'Современники',
  'Артефакты Востока',
]

const PAGE_SIZE = 12

interface CatalogPageProps {
  searchParams: Promise<{ category?: string; page?: string }>
}

export async function generateMetadata({ searchParams }: CatalogPageProps): Promise<Metadata> {
  const params = await searchParams
  const cat = params.category ?? ''
  return {
    title: cat ? `${cat} — Каталог` : 'Каталог',
    description:
      'Предметы восточного искусства: буддистские бронзы, иконы, артефакты Гималаев, Китая, Тибета, Монголии.',
  }
}

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const params = await searchParams
  const category = params.category ?? ''
  const page = Math.max(1, parseInt(params.page ?? '1', 10))
  const offset = (page - 1) * PAGE_SIZE

  let items: Item[] = []
  let totalCount = 0

  try {
    ;[items, totalCount] = await Promise.all([
      client.fetch<Item[]>(ITEMS_QUERY, {
        category,
        offset,
        end: offset + PAGE_SIZE,
      }),
      client.fetch<number>(ITEMS_COUNT_QUERY, { category }),
    ])
  } catch {
    // Empty state if Sanity not configured
  }

  const totalPages = Math.ceil(totalCount / PAGE_SIZE)

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="section-container">
        <div className="mb-8">
          <h1 className="page-title">Каталог</h1>
          {totalCount > 0 && (
            <p className="text-parchment/50 text-sm -mt-4">
              {totalCount} {pluralize(totalCount, ['предмет', 'предмета', 'предметов'])}
              {category ? ` в категории «${category}»` : ''}
            </p>
          )}
        </div>

        {/* Category filter — client component, needs Suspense */}
        <Suspense fallback={<div className="h-10 mb-8" />}>
          <CategoryFilter categories={CATEGORIES} active={category} />
        </Suspense>

        {/* Items grid */}
        <CatalogGrid items={items} />

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-12">
            {page > 1 && (
              <Link
                href={`/catalog?${category ? `category=${encodeURIComponent(category)}&` : ''}page=${page - 1}`}
                className="btn-outline-gold py-2 px-5 text-sm"
              >
                ← Назад
              </Link>
            )}
            <span className="text-parchment/50 text-sm">
              {page} / {totalPages}
            </span>
            {page < totalPages && (
              <Link
                href={`/catalog?${category ? `category=${encodeURIComponent(category)}&` : ''}page=${page + 1}`}
                className="btn-outline-gold py-2 px-5 text-sm"
              >
                Далее →
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function pluralize(count: number, forms: [string, string, string]): string {
  const mod10 = count % 10
  const mod100 = count % 100
  if (mod100 >= 11 && mod100 <= 14) return forms[2]
  if (mod10 === 1) return forms[0]
  if (mod10 >= 2 && mod10 <= 4) return forms[1]
  return forms[2]
}
