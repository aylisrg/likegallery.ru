'use client'

import { useState } from 'react'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/image'
import type { SanityImage } from '@/types/sanity'

interface ImageGalleryProps {
  images: SanityImage[]
  title: string
  isSold?: boolean
}

export function ImageGallery({ images, title, isSold = false }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeImage = images[activeIndex]

  if (!images || images.length === 0) {
    return (
      <div className="aspect-square bg-dark-soft rounded-xl flex items-center justify-center">
        <span className="text-parchment/30">Нет фотографий</span>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div className="relative aspect-[4/3] sm:aspect-square rounded-xl overflow-hidden bg-dark-soft">
        <Image
          src={urlFor(activeImage).width(900).auto('format').url()}
          alt={activeImage.alt ?? title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className={`object-contain transition-all duration-300 ${isSold ? 'grayscale brightness-80' : ''}`}
          priority
        />
        {isSold && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="rotate-[-12deg] border-2 border-gold bg-dark/70 px-8 py-3">
              <span className="font-serif text-gold text-2xl font-bold tracking-widest">ПРОДАНО</span>
            </div>
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                i === activeIndex ? 'border-gold' : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <Image
                src={urlFor(img).width(160).auto('format').url()}
                alt={img.alt ?? `${title} ${i + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
