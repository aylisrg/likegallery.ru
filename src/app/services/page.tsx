import type { Metadata } from 'next'
import { client } from '@/lib/sanity/client'
import { SERVICE_CASES_QUERY } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'
import { BeforeAfterSlider } from '@/components/services/BeforeAfterSlider'
import type { ServiceCase } from '@/types/sanity'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Услуги',
  description:
    'Экспертная оценка и реставрация предметов восточного искусства. Бесплатная первичная консультация.',
}

export default async function ServicesPage() {
  let serviceCases: ServiceCase[] = []

  try {
    serviceCases = await client.fetch<ServiceCase[]>(SERVICE_CASES_QUERY)
  } catch {
    /* empty */
  }

  const restorationCases = serviceCases.filter((c) => c.type === 'restoration')
  const expertiseCases = serviceCases.filter((c) => c.type === 'expertise')

  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP ?? ''
  const telegram = process.env.NEXT_PUBLIC_TELEGRAM ?? ''

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="section-container">
        <h1 className="page-title">Услуги</h1>

        {/* === RESTAVRATION === */}
        <section className="mb-20" id="restoration">
          <div className="flex items-start justify-between flex-wrap gap-4 mb-8">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl text-parchment mb-2">
                Реставрация
              </h2>
              <p className="text-parchment/60 max-w-xl leading-relaxed text-sm sm:text-base">
                Бережное восстановление предметов восточного искусства — бронза, дерево, позолота, ткань.
                Используем традиционные техники и современные материалы.
              </p>
            </div>
            {whatsapp && (
              <a
                href={`https://wa.me/${whatsapp}?text=${encodeURIComponent('Здравствуйте, хочу узнать стоимость реставрации предмета. Можно отправить фото?')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold whitespace-nowrap flex-shrink-0"
              >
                Оценить реставрацию
              </a>
            )}
          </div>

          {restorationCases.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {restorationCases.map((c) => (
                <BeforeAfterSlider
                  key={c._id}
                  beforeSrc={urlFor(c.imageBefore).width(800).auto('format').url()}
                  afterSrc={urlFor(c.imageAfter).width(800).auto('format').url()}
                  title={c.title}
                  description={c.description}
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'Реставрация бронзы', desc: 'Удаление патины, укрепление, патинирование по образцу' },
                { title: 'Реставрация позолоты', desc: 'Восстановление золочения, прописка утрат' },
                { title: 'Реставрация тканей', desc: 'Укрепление, расчистка, дублирование ветхих фрагментов' },
              ].map((item) => (
                <div key={item.title} className="bg-dark-card rounded-xl p-6 border border-gold/10">
                  <h3 className="font-serif text-parchment text-lg mb-2">{item.title}</h3>
                  <p className="text-parchment/50 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* === EXPERTISE === */}
        <section className="mb-20" id="expertise">
          <div className="flex items-start justify-between flex-wrap gap-4 mb-8">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl text-parchment mb-2">
                Научная экспертиза
              </h2>
              <p className="text-parchment/60 max-w-xl leading-relaxed text-sm sm:text-base">
                Письменное экспертное заключение с описанием предмета, датировкой, определением
                подлинности и оценкой рыночной стоимости.
              </p>
            </div>
            {telegram && (
              <a
                href={`https://t.me/${telegram}?text=${encodeURIComponent('Здравствуйте, хочу заказать экспертизу предмета.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-gold whitespace-nowrap flex-shrink-0"
              >
                Заказать экспертизу
              </a>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            {[
              { icon: '🔍', title: 'Атрибуция', desc: 'Определение школы, региона, периода создания' },
              { icon: '📋', title: 'Документация', desc: 'Письменное заключение с печатью эксперта' },
              { icon: '💰', title: 'Оценка', desc: 'Рыночная стоимость для страховки или продажи' },
            ].map((item) => (
              <div key={item.title} className="bg-dark-card rounded-xl p-6 border border-gold/10 text-center">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-serif text-parchment text-lg mb-2">{item.title}</h3>
                <p className="text-parchment/50 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {expertiseCases.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-serif text-parchment text-xl">Примеры экспертиз</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {expertiseCases.map((c) => (
                  <div key={c._id} className="bg-dark-card rounded-xl p-5 border border-gold/10">
                    <h4 className="font-serif text-parchment text-base mb-1">{c.title}</h4>
                    {c.description && (
                      <p className="text-parchment/60 text-sm leading-relaxed">{c.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* === SOURCING CTA === */}
        <section className="bg-dark-soft rounded-2xl p-8 sm:p-12 text-center border border-gold/10">
          <h2 className="font-serif text-2xl sm:text-3xl text-parchment mb-4">
            Хотите продать предмет?
          </h2>
          <p className="text-parchment/60 max-w-xl mx-auto mb-8 leading-relaxed text-sm sm:text-base">
            Бесплатная первичная оценка по фотографии. Выкупаем сразу, платим честно.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {whatsapp && (
              <a
                href={`https://wa.me/${whatsapp}?text=${encodeURIComponent('Здравствуйте, хочу оценить предмет для продажи. Могу отправить фото.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#25D366] text-white font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity"
              >
                <span className="text-xs font-bold opacity-80">WA</span>
                Оценить бесплатно
              </a>
            )}
            {telegram && (
              <a
                href={`https://t.me/${telegram}?text=${encodeURIComponent('Здравствуйте, хочу продать предмет.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#0088cc] text-white font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity"
              >
                <span className="text-xs font-bold opacity-80">TG</span>
                Написать в Telegram
              </a>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
