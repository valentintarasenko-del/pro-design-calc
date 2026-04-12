// Лендинг-страница для мотивации команды

// Иконки для карточек преимуществ
function IconClock() {
  return (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" strokeWidth="2"/>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6l4 2"/>
    </svg>
  );
}

function IconDocument() {
  return (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414A1 1 0 0121 9.414V19a2 2 0 01-2 2z"/>
    </svg>
  );
}

function IconChart() {
  return (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
    </svg>
  );
}

// Логотип компании
function Logo({ size = 'md' }) {
  const sizes = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16',
  };

  return (
    <div className="flex items-center gap-3">
      <div className="bg-brand-blue rounded-lg p-1.5 flex items-center justify-center">
        <span className="text-white font-black text-xs leading-none px-1">ПРО</span>
      </div>
      <div>
        <div className="text-white font-black text-xl leading-none tracking-tight">Дизайн</div>
        <div className="text-white/50 text-xs font-medium tracking-wider uppercase">Ремонт и комплектация</div>
      </div>
    </div>
  );
}

// Карточка преимущества
function FeatureCard({ icon, title, description, accent }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/8 hover:border-white/20 transition-all duration-300">
      <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl mb-6 ${accent}`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-3 leading-tight">{title}</h3>
      <p className="text-white/60 leading-relaxed">{description}</p>
    </div>
  );
}

// Заглушка скриншота приложения
function AppScreenshot() {
  return (
    <div className="relative mx-auto max-w-2xl">
      {/* Свечение сзади */}
      <div className="absolute inset-0 bg-brand-blue/20 blur-3xl rounded-full scale-75" />

      {/* Окно браузера */}
      <div className="relative bg-[#0F0F1A] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        {/* Строка браузера */}
        <div className="bg-white/5 px-4 py-3 flex items-center gap-2 border-b border-white/10">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
            <div className="w-3 h-3 rounded-full bg-green-400/60" />
          </div>
          <div className="flex-1 bg-white/5 rounded-md px-3 py-1 text-white/30 text-xs text-center">
            pro-design-calc.netlify.app
          </div>
        </div>

        {/* Содержимое */}
        <div className="p-6 space-y-4">
          {/* Заголовок */}
          <div className="flex items-center justify-between">
            <div className="h-4 bg-white/20 rounded w-32" />
            <div className="h-8 bg-brand-blue/60 rounded-lg w-28" />
          </div>

          {/* Форма расчёта */}
          <div className="grid grid-cols-2 gap-3">
            {[
              'Кухня «Смагин», нижняя база',
              'Верхняя база',
              'Пеналы',
              'Фасады — МДФ плёнка',
            ].map((label, i) => (
              <div key={i} className="bg-white/5 rounded-xl p-3">
                <div className="text-white/40 text-xs mb-2">{label}</div>
                <div className="h-3 bg-white/15 rounded w-3/4" />
              </div>
            ))}
          </div>

          {/* Итого */}
          <div className="bg-brand-blue/20 border border-brand-blue/40 rounded-xl p-4 flex justify-between items-center">
            <span className="text-white/70 text-sm">Итого к расчёту</span>
            <span className="text-white font-bold text-lg">347 500 ₽</span>
          </div>

          {/* Кнопка */}
          <div className="h-10 bg-brand-orange/80 rounded-xl flex items-center justify-center">
            <div className="h-3 bg-white/60 rounded w-32" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#0D0D1A]">

      {/* Навигация */}
      <nav className="border-b border-white/10 backdrop-blur-sm sticky top-0 z-50 bg-[#0D0D1A]/90">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Logo />
          <a
            href="/app"
            className="bg-brand-blue hover:bg-brand-blue/90 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm"
          >
            Открыть приложение →
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-brand-blue/15 border border-brand-blue/30 rounded-full px-4 py-2 text-sm text-brand-blue mb-8 font-medium">
          <span className="w-2 h-2 bg-brand-blue rounded-full animate-pulse" />
          Сервис для команды ПроДизайн
        </div>

        <h1 className="text-5xl md:text-6xl font-black text-white leading-tight mb-6 tracking-tight">
          ПроДизайн —<br />
          <span className="text-brand-blue">считаем мебель</span>
        </h1>

        <p className="text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
          Забудьте про ручной расчёт в Excel и часы за сметой.
          Вводите размеры — получаете красивое КП для клиента.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/app"
            className="bg-brand-blue hover:bg-brand-blue/90 text-white font-bold px-8 py-4 rounded-2xl transition-colors text-lg"
          >
            Открыть веб-приложение
          </a>
          <a
            href="#features"
            className="border border-white/20 hover:border-white/40 text-white/80 hover:text-white font-semibold px-8 py-4 rounded-2xl transition-colors text-lg"
          >
            Узнать подробнее
          </a>
        </div>

        {/* Скриншот */}
        <div className="mt-16">
          <AppScreenshot />
        </div>
      </section>

      {/* Три преимущества */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Почему это важно для нас
          </h2>
          <p className="text-white/50 text-lg">Три причины начать пользоваться прямо сейчас</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <FeatureCard
            icon={<IconClock />}
            accent="bg-brand-blue/20 text-brand-blue"
            title="Считаем кухню за 3 минуты вместо часа"
            description="Больше не нужно сидеть с калькулятором и вспоминать формулы. Вводите метры — приложение считает листы ЛДСП, фасады, монтаж и всё остальное само."
          />
          <FeatureCard
            icon={<IconDocument />}
            accent="bg-brand-orange/20 text-brand-orange"
            title="Красивое КП клиенту в один клик"
            description="Никаких таблиц Excel и скриншотов. Клиент получает профессиональное PDF с логотипом, фото объекта и понятным описанием — это продаёт."
          />
          <FeatureCard
            icon={<IconChart />}
            accent="bg-green-500/20 text-green-400"
            title="Видите маржу по каждому заказу"
            description="Сразу видно: сколько стоит нам, сколько стоит клиенту, и сколько мы зарабатываем. Больше осознанных решений, меньше убыточных заказов."
          />
        </div>
      </section>

      {/* Как это работает */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-10 md:p-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Как это работает
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Вводите размеры', desc: 'Длина баз, пеналы, материал фасадов — только нужное' },
              { step: '02', title: 'Приложение считает', desc: 'Листы ЛДСП, фасады, монтаж, доставка — автоматически' },
              { step: '03', title: 'Проверяете итог', desc: 'Видите полную смету, маржу, можете скорректировать цену' },
              { step: '04', title: 'Отправляете КП', desc: 'Скачиваете PDF и отправляете клиенту — красиво и быстро' },
            ].map(({ step, title, desc }) => (
              <div key={step} className="text-center">
                <div className="w-12 h-12 bg-brand-blue/20 border border-brand-blue/30 rounded-2xl flex items-center justify-center text-brand-blue font-black text-sm mx-auto mb-4">
                  {step}
                </div>
                <h3 className="text-white font-bold mb-2">{title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Режимы расчёта */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Быстрый */}
          <div className="bg-brand-blue/10 border border-brand-blue/30 rounded-2xl p-8">
            <div className="inline-flex items-center gap-2 bg-brand-blue/20 text-brand-blue text-sm font-semibold px-3 py-1.5 rounded-lg mb-6">
              ⚡ Быстрый расчёт
            </div>
            <h3 className="text-2xl font-black text-white mb-3">Для ранних переговоров</h3>
            <p className="text-white/60 mb-6">Когда клиент только пришёл и нужна примерная цифра за 2 минуты. Вводите минимум данных — получаете «предварительный расчёт» с понятной оговоркой.</p>
            <ul className="space-y-2 text-white/70 text-sm">
              <li>✓ Минимум полей для заполнения</li>
              <li>✓ Статистические значения подставляются автоматически</li>
              <li>✓ КП помечается как «Предварительный»</li>
            </ul>
          </div>

          {/* Точный */}
          <div className="bg-brand-orange/10 border border-brand-orange/30 rounded-2xl p-8">
            <div className="inline-flex items-center gap-2 bg-brand-orange/20 text-brand-orange text-sm font-semibold px-3 py-1.5 rounded-lg mb-6">
              🎯 Точный расчёт
            </div>
            <h3 className="text-2xl font-black text-white mb-3">Для финального КП</h3>
            <p className="text-white/60 mb-6">Когда есть чертёж и клиент готов к сделке. Заполняете все параметры — получаете точную смету и профессиональное КП с печатью.</p>
            <ul className="space-y-2 text-white/70 text-sm">
              <li>✓ Все блоки: корпуса, фасады, фурнитура, монтаж</li>
              <li>✓ Себестоимость и маржа</li>
              <li>✓ Итоговое КП в PDF</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="bg-gradient-to-br from-brand-blue/20 to-brand-blue/5 border border-brand-blue/30 rounded-3xl p-12 text-center">
          <h2 className="text-4xl font-black text-white mb-4">
            Готовы попробовать?
          </h2>
          <p className="text-white/60 text-lg mb-8 max-w-xl mx-auto">
            Откройте приложение и сделайте первый расчёт прямо сейчас. Без регистрации, без настройки.
          </p>
          <a
            href="/app"
            className="inline-block bg-brand-blue hover:bg-brand-blue/90 text-white font-bold px-10 py-4 rounded-2xl transition-colors text-lg"
          >
            Открыть приложение →
          </a>
        </div>
      </section>

      {/* Футер */}
      <footer className="border-t border-white/10 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <Logo size="sm" />
          <p className="text-white/30 text-sm text-center">
            Внутренний сервис компании ПроДизайн · Ремонт и комплектация
          </p>
          <div className="flex gap-4 text-white/30 text-sm">
            <a href="https://pro-design-ekb.ru" target="_blank" rel="noreferrer" className="hover:text-white/60 transition-colors">
              pro-design-ekb.ru
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
