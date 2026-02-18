import type { Item } from '@/types/sanity'

interface StatusCTAProps {
  item: Pick<Item, 'title' | 'category' | 'status' | 'price'>
}

export function StatusCTA({ item }: StatusCTAProps) {
  const { title, category, status, price } = item
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP ?? ''
  const telegram = process.env.NEXT_PUBLIC_TELEGRAM ?? ''

  if (status === 'sold') {
    const soldMsg = encodeURIComponent(
      `У меня есть предмет, похожий на «${title}» (${category}), хочу продать. Можете оценить?`
    )
    return (
      <div className="bg-dark-soft border border-gold/20 rounded-xl p-6 space-y-4">
        <div className="border border-gold/40 rounded-lg px-4 py-2 inline-block">
          <span className="font-serif text-gold font-bold tracking-widest">ПРОДАНО</span>
        </div>
        <p className="font-serif text-parchment text-xl leading-snug">
          Владеете подобным предметом?
        </p>
        <p className="text-parchment/60 text-sm leading-relaxed">
          Мы купим его дорого. Отправьте фото — эксперт оценит бесплатно и быстро.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          {whatsapp && (
            <a
              href={`https://wa.me/${whatsapp}?text=${soldMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white font-semibold px-5 py-3 rounded-xl hover:opacity-90 transition-opacity"
            >
              <span className="text-xs font-bold opacity-80">WA</span>
              Продать через WhatsApp
            </a>
          )}
          {telegram && (
            <a
              href={`https://t.me/${telegram}?text=${soldMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-[#0088cc] text-white font-semibold px-5 py-3 rounded-xl hover:opacity-90 transition-opacity"
            >
              <span className="text-xs font-bold opacity-80">TG</span>
              Telegram
            </a>
          )}
        </div>
      </div>
    )
  }

  if (status === 'restoration') {
    const restMsg = encodeURIComponent(
      `Здравствуйте, интересует информация о реставрации предмета «${title}».`
    )
    return (
      <div className="bg-dark-soft border border-amber-700/30 rounded-xl p-6 space-y-4">
        <span className="inline-block bg-amber-700/20 text-amber-400 text-xs font-medium px-3 py-1 rounded-full border border-amber-700/40">
          На реставрации
        </span>
        <p className="text-parchment/60 text-sm leading-relaxed">
          Предмет временно находится на реставрации. Свяжитесь с нами, чтобы узнать сроки.
        </p>
        {whatsapp && (
          <a
            href={`https://wa.me/${whatsapp}?text=${restMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-gold w-full text-center"
          >
            Узнать подробности
          </a>
        )}
      </div>
    )
  }

  // active
  const buyMsg = encodeURIComponent(
    `Здравствуйте, интересует предмет «${title}» (${category}) из вашего каталога. Расскажите подробнее.`
  )
  return (
    <div className="bg-dark-soft border border-gold/20 rounded-xl p-6 space-y-4">
      {price && (
        <div>
          <p className="text-parchment/50 text-xs uppercase tracking-wider mb-1">Цена</p>
          <p className="text-gold text-2xl font-semibold font-serif">{price}</p>
        </div>
      )}
      <p className="text-parchment/60 text-sm leading-relaxed">
        Задайте вопрос или обсудите покупку — ответим быстро
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        {whatsapp && (
          <a
            href={`https://wa.me/${whatsapp}?text=${buyMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white font-semibold px-5 py-3 rounded-xl hover:opacity-90 transition-opacity"
          >
            <span className="text-xs font-bold opacity-80">WA</span>
            Купить / Обсудить
          </a>
        )}
        {telegram && (
          <a
            href={`https://t.me/${telegram}?text=${buyMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-[#0088cc] text-white font-semibold px-5 py-3 rounded-xl hover:opacity-90 transition-opacity"
          >
            <span className="text-xs font-bold opacity-80">TG</span>
            TG
          </a>
        )}
      </div>
    </div>
  )
}
