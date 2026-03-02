import Link from 'next/link'
import { Icons } from '@/components/ui/Icons'

interface FooterProps {
  phone: string
  email: string
  telegram: string
}

export function Footer({ phone, email, telegram }: FooterProps) {
  const vkUrl = process.env.NEXT_PUBLIC_VK_URL ?? ''
  const rutubeUrl = process.env.NEXT_PUBLIC_RUTUBE_URL ?? ''
  const avitoUrl = process.env.NEXT_PUBLIC_AVITO_URL ?? ''
  const tgChannel = process.env.NEXT_PUBLIC_TG_CHANNEL ?? ''

  return (
    <footer className="border-t border-gold/20 bg-dark-soft py-12 mt-16">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
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
                  className="block w-fit text-parchment/60 hover:text-gold text-sm transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="text-parchment font-semibold mb-4 text-sm uppercase tracking-wider">Связаться</h3>
            <div className="space-y-3">
              {phone && (
                <a
                  href={`tel:${phone}`}
                  className="flex items-center gap-2 text-parchment/60 hover:text-gold text-sm transition-colors w-fit"
                >
                  <Icons.phone className="w-4 h-4" />
                  {phone}
                </a>
              )}
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-2 text-parchment/60 hover:text-gold text-sm transition-colors w-fit"
                >
                  <Icons.email className="w-4 h-4" />
                  {email}
                </a>
              )}

              {/* Messengers Row */}
              <div className="flex gap-3 pt-2">
                {telegram && (
                  <a
                    href={`https://t.me/${telegram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-dark flex items-center justify-center text-parchment hover:text-white hover:bg-[#0088cc] transition-all border border-gold/20 hover:border-transparent"
                    aria-label="Telegram"
                  >
                    <Icons.telegram className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Channels */}
          <div>
            <h3 className="text-parchment font-semibold mb-4 text-sm uppercase tracking-wider">Наши каналы</h3>
            <div className="flex flex-wrap gap-3">
              {avitoUrl && (
                <a
                  href={avitoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-dark flex items-center justify-center text-parchment hover:text-white hover:bg-[#00AAFF] transition-all border border-gold/20 hover:border-transparent"
                  aria-label="Avito"
                >
                  <Icons.avito className="w-5 h-5" />
                </a>
              )}
              {vkUrl && (
                <a
                  href={vkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-dark flex items-center justify-center text-parchment hover:text-white hover:bg-[#0077FF] transition-all border border-gold/20 hover:border-transparent"
                  aria-label="VK"
                >
                  <Icons.vk className="w-5 h-5" />
                </a>
              )}
              {rutubeUrl && (
                <a
                  href={rutubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-dark flex items-center justify-center text-parchment hover:text-white hover:bg-[#00AAFF] transition-all border border-gold/20 hover:border-transparent"
                  aria-label="Rutube"
                >
                  <Icons.rutube className="w-5 h-5" />
                </a>
              )}
              {tgChannel && (
                <a
                  href={tgChannel}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-dark flex items-center justify-center text-parchment hover:text-white hover:bg-[#0088cc] transition-all border border-gold/20 hover:border-transparent"
                  aria-label="Telegram Channel"
                >
                  <Icons.telegram className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gold/10 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-parchment/40 text-xs text-center">
            © {new Date().getFullYear()} Галерея ЛИК. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  )
}
