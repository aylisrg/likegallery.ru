import Link from 'next/link'

export function HeroSection() {
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP ?? ''
  const telegram = process.env.NEXT_PUBLIC_TELEGRAM ?? ''
  const generalMsg = encodeURIComponent('Здравствуйте, хочу оценить предмет. Можно отправить фото?')

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background gradient — atmospheric museum dark */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark via-[#120e08] to-[#1a1208]" />

      {/* Subtle gold texture overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            'radial-gradient(ellipse at 50% 50%, #d4af37 0%, transparent 70%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 section-container text-center py-24">
        <p className="text-gold text-xs sm:text-sm uppercase tracking-[0.3em] mb-6 font-medium animate-fade-in-up">
          Экспертная галерея восточного искусства
        </p>

        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-parchment leading-tight mb-6 animate-fade-in-up">
          Галерея{' '}
          <span className="text-gold">ЛИК</span>
        </h1>

        <p className="text-parchment/70 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up">
          Поможем определить, оценить и продать ваши предметы{' '}
          <span className="text-parchment">в достойные руки</span>
        </p>

        {/* Quick action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-12 animate-fade-in-up">
          {whatsapp && (
            <a
              href={`https://wa.me/${whatsapp}?text=${generalMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#25D366] text-white font-semibold px-6 py-3.5 rounded-xl hover:opacity-90 transition-opacity shadow-lg min-w-[200px] justify-center"
            >
              <span className="text-xs font-bold opacity-80">WA</span>
              Отправить фото
            </a>
          )}
          {telegram && (
            <a
              href={`https://t.me/${telegram}?text=${generalMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#0088cc] text-white font-semibold px-6 py-3.5 rounded-xl hover:opacity-90 transition-opacity shadow-lg min-w-[200px] justify-center"
            >
              <span className="text-xs font-bold opacity-80">TG</span>
              Написать в Telegram
            </a>
          )}
          <Link
            href="/catalog"
            className="btn-outline-gold min-w-[200px]"
          >
            Смотреть каталог
          </Link>
        </div>

        {/* Trust points */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-10 text-sm text-parchment/50">
          {[
            'Экспертная оценка бесплатно',
            'Покупаем сразу',
            'Честные цены',
            'Конфиденциально',
          ].map((point) => (
            <span key={point} className="flex items-center gap-1.5">
              <span className="text-gold">✓</span>
              {point}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-dark to-transparent" />
    </section>
  )
}
