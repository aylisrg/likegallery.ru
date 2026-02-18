import Link from 'next/link'

interface FooterProps {
  phone: string
  whatsapp: string
  telegram: string
}

export function Footer({ phone, whatsapp, telegram }: FooterProps) {
  return (
    <footer className="border-t border-gold/20 bg-dark-soft py-12 mt-16">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="font-serif text-2xl font-bold text-parchment mb-3">
              Галерея <span className="text-gold">ЛИК</span>
            </div>
            <p className="text-parchment/60 text-sm leading-relaxed">
              Экспертная оценка, покупка и продажа предметов восточного искусства
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-parchment font-semibold mb-4 text-sm uppercase tracking-wider">Разделы</h3>
            <nav className="space-y-2">
              {[
                { href: '/catalog', label: 'Каталог' },
                { href: '/services', label: 'Услуги' },
                { href: '/about', label: 'О нас' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-parchment/60 hover:text-gold text-sm transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="text-parchment font-semibold mb-4 text-sm uppercase tracking-wider">Связаться</h3>
            <div className="space-y-2">
              {phone && (
                <a
                  href={`tel:${phone}`}
                  className="block text-parchment/60 hover:text-gold text-sm transition-colors"
                >
                  {phone}
                </a>
              )}
              {whatsapp && (
                <a
                  href={`https://wa.me/${whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-parchment/60 hover:text-gold text-sm transition-colors"
                >
                  WhatsApp
                </a>
              )}
              {telegram && (
                <a
                  href={`https://t.me/${telegram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-parchment/60 hover:text-gold text-sm transition-colors"
                >
                  Telegram
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gold/10 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-parchment/40 text-xs">
            © {new Date().getFullYear()} Галерея ЛИК. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  )
}
