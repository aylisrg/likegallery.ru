'use client'

import { useState, useRef, useCallback } from 'react'
import Image from 'next/image'

interface BeforeAfterSliderProps {
  beforeSrc: string
  afterSrc: string
  beforeAlt?: string
  afterAlt?: string
  title?: string
  description?: string
}

export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt = 'До реставрации',
  afterAlt = 'После реставрации',
  title,
  description,
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)

  const updatePosition = useCallback((clientX: number) => {
    const container = containerRef.current
    if (!container) return
    const rect = container.getBoundingClientRect()
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
    setPosition(Math.round((x / rect.width) * 100))
  }, [])

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    isDragging.current = true
    updatePosition(e.clientX)
  }, [updatePosition])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDragging.current) updatePosition(e.clientX)
  }, [updatePosition])

  const handleMouseUp = useCallback(() => {
    isDragging.current = false
  }, [])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    e.preventDefault()
    updatePosition(e.touches[0].clientX)
  }, [updatePosition])

  return (
    <div className="bg-dark-card rounded-xl overflow-hidden border border-gold/10">
      {/* Header */}
      {(title || description) && (
        <div className="p-4 sm:p-5 border-b border-gold/10">
          {title && <h3 className="font-serif text-parchment text-lg mb-1">{title}</h3>}
          {description && <p className="text-parchment/60 text-sm leading-relaxed">{description}</p>}
        </div>
      )}

      {/* Slider */}
      <div
        ref={containerRef}
        className="relative w-full aspect-[4/3] select-none touch-none cursor-col-resize overflow-hidden"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchMove={handleTouchMove}
      >
        {/* AFTER image — full width, bottom layer */}
        <div className="absolute inset-0">
          <Image
            src={afterSrc}
            alt={afterAlt}
            fill
            className="object-cover"
            draggable={false}
          />
          {/* AFTER label */}
          <div className="absolute bottom-3 right-3 bg-dark/70 backdrop-blur text-parchment text-xs px-2.5 py-1 rounded-full font-medium">
            ПОСЛЕ
          </div>
        </div>

        {/* BEFORE image — clipped to left portion */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${position}%` }}
        >
          <div className="absolute inset-0" style={{ width: containerRef.current?.offsetWidth ?? '100%' }}>
            <Image
              src={beforeSrc}
              alt={beforeAlt}
              fill
              className="object-cover"
              draggable={false}
            />
          </div>
          {/* BEFORE label */}
          <div className="absolute bottom-3 left-3 bg-dark/70 backdrop-blur text-parchment text-xs px-2.5 py-1 rounded-full font-medium">
            ДО
          </div>
        </div>

        {/* Divider line + handle */}
        <div
          className="absolute top-0 bottom-0 z-10 pointer-events-none"
          style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
        >
          {/* Line */}
          <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-gold/80" />
          {/* Knob */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-gold border-2 border-white shadow-lg flex items-center justify-center">
            <span className="text-dark font-bold text-xs select-none">⟺</span>
          </div>
        </div>

        {/* Accessible range input overlay */}
        <input
          type="range"
          min="0"
          max="100"
          value={position}
          onChange={(e) => setPosition(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-col-resize z-20"
          aria-label="Ползунок сравнения до/после реставрации"
        />
      </div>
    </div>
  )
}
