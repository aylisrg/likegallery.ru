import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { StickyContactWidget } from '@/components/contact/StickyContactWidget'

export const metadata: Metadata = {
  title: {
    default: 'Галерея ЛИК — Предметы искусства Востока',
    template: '%s | Галерея ЛИК',
  },
  description:
    'Галерея ЛИК — экспертная оценка, покупка и продажа предметов восточного искусства: буддизм, Гималаи, Китай, Тибет, Монголия. Профессиональная реставрация и экспертиза.',
  keywords: ['галерея', 'восток', 'буддизм', 'антиквариат', 'скупка', 'оценка', 'реставрация'],
  openGraph: {
    siteName: 'Галерея ЛИК',
    locale: 'ru_RU',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP ?? ''
  const telegram = process.env.NEXT_PUBLIC_TELEGRAM ?? ''
  const wechat = process.env.NEXT_PUBLIC_WECHAT ?? ''
  const avitoUrl = process.env.NEXT_PUBLIC_AVITO_URL ?? ''
  const phone = process.env.NEXT_PUBLIC_PHONE ?? ''

  return (
    <html lang="ru" className="scroll-smooth">
      <body className="bg-dark text-parchment font-sans antialiased min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer phone={phone} whatsapp={whatsapp} telegram={telegram} />
        <StickyContactWidget
          whatsapp={whatsapp}
          telegram={telegram}
          wechat={wechat}
          avitoUrl={avitoUrl}
          phone={phone}
        />
      </body>
    </html>
  )
}
