import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'О нас',
  description:
    'Галерея ЛИК — эксперты в области восточного искусства. Работаем с буддийскими, христианскими и индуистскими предметами культа.',
}

export default function AboutPage() {
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP ?? ''
  const telegram = process.env.NEXT_PUBLIC_TELEGRAM ?? ''

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="section-container max-w-4xl">
        <h1 className="page-title">О Галерее ЛИК</h1>

        {/* Mission */}
        <div className="mb-16">
          <p className="text-parchment/80 text-lg sm:text-xl leading-relaxed font-serif mb-6">
            Галерея ЛИК специализируется на предметах восточного сакрального искусства:
            буддийской бронзе, тибетских тханках, монгольских скульптурах, христианских иконах
            и артефактах Гималаев, Китая и Индии.
          </p>
          <p className="text-parchment/60 text-base leading-relaxed">
            Мы не просто продаём предметы — мы находим им достойных владельцев, проводим
            экспертизу подлинности и реставрируем то, что требует бережного восстановления.
          </p>
        </div>

        {/* Why us */}
        <section className="mb-16">
          <h2 className="font-serif text-2xl sm:text-3xl text-parchment mb-8">
            Почему выбирают нас
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                title: 'Экспертная оценка',
                desc: 'Профессиональная атрибуция предметов с письменным заключением. Определяем подлинность, датировку, регион и рыночную стоимость.',
              },
              {
                title: 'Честные цены',
                desc: 'Мы платим справедливо — наша репутация важнее разовой выгоды. Никаких скрытых комиссий при продаже через нас.',
              },
              {
                title: 'Конфиденциальность',
                desc: 'Полная конфиденциальность сделок. Работаем как с частными лицами, так и с наследственным имуществом.',
              },
              {
                title: 'Мировой рынок',
                desc: 'Связи с коллекционерами в России, Европе, Азии. Найдём достойного покупателя для редкого предмета.',
              },
            ].map((item) => (
              <div key={item.title} className="bg-dark-card rounded-xl p-6 border border-gold/10">
                <h3 className="font-serif text-parchment text-lg mb-3 text-gold">{item.title}</h3>
                <p className="text-parchment/60 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Specialization */}
        <section className="mb-16">
          <h2 className="font-serif text-2xl sm:text-3xl text-parchment mb-8">
            Наша специализация
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              'Буддизм',
              'Христианство',
              'Индия / Гималаи',
              'Китай / Тибет',
              'Монголия / Дзанабазар',
              'Современники',
              'Артефакты Востока',
              'Реставрация',
            ].map((cat) => (
              <div
                key={cat}
                className="bg-dark-soft rounded-lg px-4 py-3 border border-gold/10 text-center"
              >
                <span className="text-parchment/70 text-sm font-medium">{cat}</span>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-dark-soft rounded-2xl p-8 sm:p-10 text-center border border-gold/10">
          <h2 className="font-serif text-2xl text-parchment mb-4">
            Есть предмет для оценки?
          </h2>
          <p className="text-parchment/60 text-sm mb-6 max-w-md mx-auto">
            Отправьте фото — мы ответим в течение нескольких часов
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {whatsapp && (
              <a
                href={`https://wa.me/${whatsapp}?text=${encodeURIComponent('Здравствуйте, хочу оценить предмет.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold"
              >
                Написать в WhatsApp
              </a>
            )}
            {telegram && (
              <a
                href={`https://t.me/${telegram}?text=${encodeURIComponent('Здравствуйте, хочу оценить предмет.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-gold"
              >
                Telegram
              </a>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
