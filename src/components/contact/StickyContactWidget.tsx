'use client'

import { useState } from 'react'
import { ContactLink } from '@/components/ui/ContactLink'

interface StickyContactWidgetProps {
  telegram: string
  max: string
  avitoUrl: string
  vkUrl: string
  rutubeUrl: string
  phone: string
  email: string
  message?: string
}

export function StickyContactWidget({
  telegram,
  max,
  avitoUrl,
  vkUrl,
  rutubeUrl,
  phone,
  email,
  message = 'Здравствуйте, хочу оценить предмет...',
}: StickyContactWidgetProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Don't render if no contacts configured
  if (!telegram) return null

  return (
    <>
      {/* Desktop: fixed bottom-right bubble */}
      <div className="hidden md:flex fixed bottom-6 right-6 flex-col items-end gap-2.5 z-50">
        {isOpen && (
          <div className="flex flex-col gap-2 mb-1 animate-slide-in">

            {telegram && (
              <ContactLink type="telegram" value={telegram} message={message} label="Telegram" />
            )}
            {max && (
              <ContactLink type="max" value={max} label="Max" />
            )}
            {phone && (
              <ContactLink type="phone" value={phone} label={phone} />
            )}
          </div>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`
            w-14 h-14 rounded-full font-bold shadow-lg
            hover:scale-110 active:scale-95 transition-transform duration-200
            flex items-center justify-center text-lg
            ${isOpen ? 'bg-parchment/20 text-parchment border border-parchment/30' : 'bg-gold text-dark gold-shadow'}
          `}
          aria-label={isOpen ? 'Закрыть контакты' : 'Открыть контакты'}
        >
          {isOpen ? '✕' : '💬'}
        </button>
      </div>

      {/* Mobile: full-width bottom panel */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 max-h-[85vh] overflow-y-auto">
        {isOpen && (
          <div className="bg-dark/97 backdrop-blur border-t border-gold/30 p-3 grid grid-cols-2 gap-2 animate-slide-in">

            {telegram && (
              <ContactLink type="telegram" value={telegram} message={message} label="Telegram" fullWidth />
            )}
            {max && (
              <ContactLink type="max" value={max} label="Max" fullWidth />
            )}
            {phone && (
              <ContactLink type="phone" value={phone} label={phone} fullWidth className="col-span-2" />
            )}
          </div>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`
            w-full py-3.5 font-semibold text-sm tracking-wide
            transition-colors duration-200 sticky bottom-0 z-[60]
            ${isOpen ? 'bg-dark/95 text-parchment/80 border-t border-gold/20' : 'bg-gold text-dark'}
          `}
        >
          {isOpen ? 'Закрыть' : '📲 Отправить фото на оценку'}
        </button>
      </div>
    </>
  )
}
