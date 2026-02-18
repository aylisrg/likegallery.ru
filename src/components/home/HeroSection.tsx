import Link from 'next/link'
import { MandalaDecoration } from './MandalaDecoration'

export function HeroSection() {
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP ?? ''
  const telegram = process.env.NEXT_PUBLIC_TELEGRAM ?? ''
  const generalMsg = encodeURIComponent('Здравствуйте, хочу оценить предмет. Можно отправить фото?')

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">

      {/* ── VIDEO BACKGROUND ─────────────────────────────────────── */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/buddha-bg.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />

      {/* ── DARK OVERLAY (keeps text readable) ───────────────────── */}
      <div className="absolute inset-0 bg-black/70" />

      {/* ── ATMOSPHERIC GRADIENT ──────────────────────────────────── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, rgba(26,18,8,0.85) 0%, rgba(10,8,4,0.7) 50%, rgba(20,14,4,0.85) 100%)',
        }}
      />

      {/* ── GOLD RADIAL GLOW ──────────────────────────────────────── */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 70% 60% at 50% 45%, rgba(212,175,55,0.35) 0%, transparent 70%)',
        }}
      />

      {/* ── MANDALA LEFT (large, slow spin counter-clockwise) ─────── */}
      <div className="absolute -left-32 top-1/2 -translate-y-1/2 pointer-events-none hidden lg:block">
        <MandalaDecoration
          size={520}
          opacity={0.1}
          className="mandala-spin-ccw"
        />
      </div>

      {/* ── MANDALA RIGHT (large, slow spin clockwise) ────────────── */}
      <div className="absolute -right-32 top-1/2 -translate-y-1/2 pointer-events-none hidden lg:block">
        <MandalaDecoration
          size={520}
          opacity={0.1}
          className="mandala-spin-cw"
        />
      </div>

      {/* ── MANDALA TOP-CENTER (small, accent) ───────────────────── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/3 pointer-events-none opacity-60">
        <MandalaDecoration
          size={220}
          opacity={0.18}
          className="mandala-spin-slow"
        />
      </div>

      {/* ── GOLD BOTTOM VIGNETTE ──────────────────────────────────── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgba(26,18,8,1) 0%, rgba(26,18,8,0.6) 50%, transparent 100%)',
        }}
      />

      {/* ── CONTENT ───────────────────────────────────────────────── */}
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

      {/* ── BOTTOM FADE TO DARK ───────────────────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-dark to-transparent" />
    </section>
  )
}
