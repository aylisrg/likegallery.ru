import { client } from '@/lib/sanity/client'
import { FEATURED_SOLD_QUERY } from '@/lib/sanity/queries'
import { HeroSection } from '@/components/home/HeroSection'
import { FeaturedItems } from '@/components/home/FeaturedItems'
import type { Item } from '@/types/sanity'

export const revalidate = 3600

export default async function HomePage() {
  let featuredItems: Item[] = []

  try {
    featuredItems = await client.fetch<Item[]>(FEATURED_SOLD_QUERY)
  } catch {
    // Render without data if Sanity is not configured yet
  }

  return (
    <>
      <HeroSection />
      <FeaturedItems items={featuredItems} />

      {/* Inbound sourcing CTA section */}
      <section className="py-20 bg-dark-soft">
        <div className="section-container text-center max-w-3xl mx-auto">
          <p className="text-gold text-xs uppercase tracking-[0.3em] mb-4 font-medium">
            Продать предмет
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-parchment mb-6">
            Хотите продать предмет искусства?
          </h2>
          <p className="text-parchment/70 text-lg mb-10 leading-relaxed">
            Просто отправьте нам фотографию. Мы проведём бесплатную экспертную оценку
            и предложим справедливую цену. Работаем конфиденциально.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            {[
              { step: '01', title: 'Отправьте фото', desc: 'Сфотографируйте предмет и отправьте нам в мессенджер' },
              { step: '02', title: 'Получите оценку', desc: 'Эксперт галереи оценит предмет бесплатно' },
              { step: '03', title: 'Получите деньги', desc: 'Договоримся о цене и проведём сделку удобным способом' },
            ].map((item) => (
              <div key={item.step} className="bg-dark/50 rounded-xl p-6 border border-gold/10">
                <div className="text-gold font-serif text-3xl font-bold mb-3 opacity-60">{item.step}</div>
                <h3 className="font-serif text-parchment text-lg mb-2">{item.title}</h3>
                <p className="text-parchment/60 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div id="contact">
            <p className="text-parchment/70 text-sm mb-4">Выберите удобный способ связи:</p>
          </div>
        </div>
      </section>
    </>
  )
}
