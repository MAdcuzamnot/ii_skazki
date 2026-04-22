import { useState, useEffect, useRef } from 'react';
import {
  BookOpen,
  MessageCircle,
  Sparkles,
  Shield,
  Brain,
  Heart,
  Infinity,
  Image,
  Check,
  X,
  ChevronDown,
  Star,
  Zap,
  Users,
  Clock,
  ArrowRight,
  Menu,
  X as CloseIcon,
  Moon,
  Car,
  Lightbulb,
  GraduationCap,
} from 'lucide-react';

const TELEGRAM_LINK = 'https://t.me/Skazki_Dremy_bot';

function App() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.1 }
    );

    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const setRef = (id: string) => (el: HTMLDivElement | null) => {
    sectionRefs.current[id] = el;
  };

  const isVisible = (id: string) => visibleSections.has(id);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { label: 'Как это работает', id: 'solution' },
    { label: 'Возможности', id: 'features' },
    { label: 'Тарифы', id: 'pricing' },
    { label: 'Отзывы', id: 'testimonials' },
    { label: 'Вопросы', id: 'faq' },
  ];

  const faqs = [
    {
      q: 'Безопасен ли контент для детей?',
      a: 'Да, абсолютно. Все сказки проходят фильтрацию на неприемлемый контент. Родитель полностью контролирует тематику, мораль и сложность сюжета. Никакой агрессии, страхов и неподходящего контента — только то, что вы сами выбрали.',
    },
    {
      q: 'С какого возраста подходит сервис?',
      a: 'Сервис рассчитан на детей от 2 до 10 лет. Для малышей 2–3 лет — простые сюжеты с короткими фразами и яркими иллюстрациями. Для детей 4–6 лет — интерактивные выборы и развитие сюжета. Для школьников 7–10 лет — более сложные истории с моральными дилеммами.',
    },
    {
      q: 'Как работает искусственный интеллект?',
      a: 'Мы используем современные языковые модели, обученные на качественных детских текстах. Вы задаёте параметры (герой, тема, мораль), а ИИ создаёт уникальную историю за секунды. Каждая сказка создаётся индивидуально и никогда не повторяется.',
    },
    {
      q: 'Нужен ли интернет для использования?',
      a: 'Да, для генерации новых сказок требуется подключение к интернету. Однако уже созданные сказки сохраняются в истории и доступны офлайн. Рекомендуем Wi-Fi или мобильный интернет.',
    },
    {
      q: 'Можно ли отменить подписку в любой момент?',
      a: 'Конечно. Подписка оформляется через Telegram и может быть отменена в один клик без звонков в поддержку и скрытых условий. Доступ сохраняется до конца оплаченного периода.',
    },
    {
      q: 'Что входит в бесплатную версию?',
      a: 'В бесплатной версии доступно 3 полноценные сказки, чтобы вы и ребёнок могли оценить формат. Это не урезанные демо, а полноценные интерактивные истории с иллюстрациями. После этого — подписка 300 ₽/мес.',
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-semibold text-slate-900">Сказки Дрёмы</span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-sm text-slate-600 hover:text-blue-600 transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="hidden md:block">
              <a
                href={TELEGRAM_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Попробовать
              </a>
            </div>

            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <CloseIcon className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="block w-full text-left text-sm text-slate-600 hover:text-blue-600 py-2"
              >
                {link.label}
              </button>
            ))}
            <a
              href={TELEGRAM_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Попробовать бесплатно
            </a>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative pt-16 pb-20 lg:pt-24 lg:pb-28 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-full text-sm text-blue-700 font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                Новая глава в детском чтении
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
                Ребёнок — герой{' '}
                <span className="text-blue-600">собственной сказки</span>
              </h1>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Интерактивные сказки с искусственным интеллектом для детей 2–10 лет. 
                Ваш ребёнок влияет на сюжет, принимает решения и проживает приключения 
                вместе с героями. А вы — воспитываете через игру.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={TELEGRAM_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white text-base font-semibold rounded-xl hover:bg-blue-700 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  Попробовать бесплатно
                </a>
                <button
                  onClick={() => scrollToSection('solution')}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-700 text-base font-medium rounded-xl border border-slate-200 hover:border-blue-300 hover:text-blue-600 transition-colors"
                >
                  Узнать, как работает
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="mt-8 flex items-center gap-6 text-sm text-slate-500">
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-blue-600" />
                  <span>3 сказки бесплатно</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-blue-600" />
                  <span>Без карты</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-blue-600" />
                  <span>В Telegram</span>
                </div>
              </div>
            </div>
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md">
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-lg">🤖</span>
                    </div>
                    <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none px-4 py-3 text-sm text-slate-700">
                      Привет! Давай создадим сказку про Мишу и его верного друга — робота-пса. Как думаешь, что они должны найти в волшебном лесу?
                    </div>
                  </div>
                  <div className="flex items-start gap-3 flex-row-reverse">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-lg">👦</span>
                    </div>
                    <div className="bg-blue-600 text-white rounded-2xl rounded-tr-none px-4 py-3 text-sm">
                      Ключ от замка с сокровищами!
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-lg">🤖</span>
                    </div>
                    <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none px-4 py-3 text-sm text-slate-700">
                      Отличный выбор! Миша и робот-пёс отправились вглубь леса, где деревья шептали старые тайны...
                    </div>
                  </div>
                  <div className="pt-2 border-t border-slate-200">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Image className="w-4 h-4" />
                      <span>Иллюстрация сгенерирована</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section
        id="problem"
        ref={setRef('problem')}
        className="py-20 bg-slate-50"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Знакомо?
            </h2>
            <p className="text-lg text-slate-600">
              Мы опросили более 500 родителей и выяснили, с чем они сталкиваются каждый день
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                stat: '71%',
                text: 'родителей сталкиваются с тем, что ребёнок теряет интерес после одного прочтения',
                icon: <Clock className="w-6 h-6 text-blue-600" />,
              },
              {
                stat: '81%',
                text: 'устают читать одну и ту же сказку и вынуждены импровизировать на ходу',
                icon: <Zap className="w-6 h-6 text-blue-600" />,
              },
              {
                stat: '65%',
                text: 'хотели бы больше взаимодействовать с ребёнком во время чтения',
                icon: <Users className="w-6 h-6 text-blue-600" />,
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`bg-white border border-slate-200 rounded-2xl p-8 transition-all duration-700 ${
                  isVisible('problem')
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-6'
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <div className="text-4xl font-bold text-blue-600 mb-3">{item.stat}</div>
                <p className="text-slate-600 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-white border border-slate-200 rounded-2xl p-8 max-w-3xl mx-auto">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-slate-500 font-semibold text-sm">₽</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  А ещё — деньги на ветер
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Средняя семья тратит <strong className="text-slate-900">800–1 500 ₽ в месяц</strong> на печатные книги, 
                  которые ребёнок прослушивает один-два раза и забывает. Аудиосказки не дают взаимодействия. 
                  Придумывать истории самому — это стресс после рабочего дня.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution */}
      <section
        id="solution"
        ref={setRef('solution')}
        className="py-20"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Как работают Сказки Дрёмы
            </h2>
            <p className="text-lg text-slate-600">
              Четыре простых шага — и у вас уникальная история, созданная специально для вашего ребёнка
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Выбираете параметры',
                desc: 'Имя ребёнка, возраст, любимые герои, тему и воспитательный посыл',
                icon: <Users className="w-5 h-5" />,
              },
              {
                step: '02',
                title: 'ИИ создаёт сказку',
                desc: 'Уникальная история генерируется за секунды — ни одна не повторяется',
                icon: <Sparkles className="w-5 h-5" />,
              },
              {
                step: '03',
                title: 'Ребёнок влияет на сюжет',
                desc: 'На ключевых моментах ребёнок делает выбор, от которого зависит развитие истории',
                icon: <MessageCircle className="w-5 h-5" />,
              },
              {
                step: '04',
                title: 'Вместе проживаете историю',
                desc: 'Читаете вслух, обсуждаете выборы, учитесь на ошибках героев',
                icon: <Heart className="w-5 h-5" />,
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`relative bg-white border border-slate-200 rounded-2xl p-6 transition-all duration-700 hover:border-blue-300 ${
                  isVisible('solution')
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-6'
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="text-xs font-bold text-blue-600 mb-4">{item.step}</div>
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        ref={setRef('features')}
        className="py-20 bg-slate-50"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Почему родители выбирают нас
            </h2>
            <p className="text-lg text-slate-600">
              Не просто сказки — а полноценный инструмент для развития и воспитания
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Интерактивность',
                desc: 'Ребёнок не просто слушает, а принимает решения, влияет на сюжет и проживает историю',
                icon: <MessageCircle className="w-6 h-6" />,
              },
              {
                title: 'Персонализация',
                desc: 'Сказка адаптируется под интересы, увлечения и возраст вашего ребёнка',
                icon: <Users className="w-6 h-6" />,
              },
              {
                title: 'Инструмент воспитания',
                desc: 'Вы сами выбираете мораль и воспитательный посыл — от дружбы до ответственности',
                icon: <Shield className="w-6 h-6" />,
              },
              {
                title: 'Развитие ребёнка',
                desc: 'Тренирует воображение, осознанность выбора, ответственность и эмоциональный интеллект',
                icon: <Brain className="w-6 h-6" />,
              },
              {
                title: 'Больше взаимодействия',
                desc: 'Совместное чтение становится настоящим диалогом, а не монологом',
                icon: <Heart className="w-6 h-6" />,
              },
              {
                title: 'Бесконечные истории',
                desc: 'Новое приключение с любимым героем за пару касаний — никогда не надоест',
                icon: <Infinity className="w-6 h-6" />,
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`bg-white border border-slate-200 rounded-2xl p-6 transition-all duration-700 hover:border-blue-300 ${
                  isVisible('features')
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-6'
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section
        id="comparison"
        ref={setRef('comparison')}
        className="py-20"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Сравнение с альтернативами
            </h2>
            <p className="text-lg text-slate-600">
              Почему Сказки Дрёмы — это не просто ещё один способ читать перед сном
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th className="text-left py-4 pr-4 text-sm font-semibold text-slate-500 w-1/3">
                    Что важно родителям
                  </th>
                  <th className="text-center py-4 px-4 text-sm font-semibold text-slate-500">
                    Обычные книги
                  </th>
                  <th className="text-center py-4 px-4 text-sm font-semibold text-slate-500">
                    Аудиосказки
                  </th>
                  <th className="text-center py-4 px-4 text-sm font-semibold text-slate-500">
                    Нейросказки
                  </th>
                  <th className="text-center py-4 pl-4 text-sm font-semibold text-blue-700 bg-blue-50 rounded-t-lg">
                    Сказки Дрёмы
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {[
                  ['Интерактивность', false, false, false, true],
                  ['Персонализация под ребёнка', false, false, true, true],
                  ['Воспитательная функция', true, false, false, true],
                  ['Иллюстрации к каждой сказке', true, false, true, true],
                  ['Новая история каждый раз', false, false, true, true],
                  ['Совместное чтение с родителем', true, false, false, true],
                  ['Доступная цена', false, true, true, true],
                ].map((row, i) => (
                  <tr key={i} className="border-b border-slate-100">
                    <td className="py-4 pr-4 text-slate-700 font-medium">{row[0]}</td>
                    {row.slice(1).map((val, j) => (
                      <td
                        key={j}
                        className={`py-4 px-4 text-center ${
                          j === 3 ? 'bg-blue-50/50' : ''
                        }`}
                      >
                        {val ? (
                          <Check className="w-5 h-5 text-blue-600 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-slate-300 mx-auto" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl p-4">
            <Lightbulb className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-800">
              Сказки Дрёмы — единственный сервис, который сочетает <strong>настоящую интерактивность</strong>, 
              <strong> полный контроль контента</strong> и <strong>воспитательную функцию</strong> в одном месте.
            </p>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section
        id="usecases"
        ref={setRef('usecases')}
        className="py-20 bg-slate-50"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Для любого момента
            </h2>
            <p className="text-lg text-slate-600">
              Сказки Дрёмы подстраиваются под вашу жизнь, а не наоборот
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Сказка на ночь',
                desc: 'Успокаивающий сюжет с правильной моралью — ребёнок засыпает с хорошими мыслями',
                icon: <Moon className="w-6 h-6" />,
              },
              {
                title: 'Воспитательный момент',
                desc: 'Нужно объяснить, почему важно делиться? Создайте сказку, где герой учится на своём опыте',
                icon: <GraduationCap className="w-6 h-6" />,
              },
              {
                title: 'Развлечение в дороге',
                desc: 'В машине, в очереди к врачу, в поезде — сказка всегда под рукой в Telegram',
                icon: <Car className="w-6 h-6" />,
              },
              {
                title: 'Развитие воображения',
                desc: 'Каждая история уникальна — ребёнок учится мыслить творчески и нестандартно',
                icon: <Brain className="w-6 h-6" />,
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`bg-white border border-slate-200 rounded-2xl p-6 transition-all duration-700 hover:border-blue-300 ${
                  isVisible('usecases')
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-6'
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section
        id="pricing"
        ref={setRef('pricing')}
        className="py-20"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Простая и честная цена
            </h2>
            <p className="text-lg text-slate-600">
              Без скрытых платежей и сложных тарифов
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="bg-white border border-slate-200 rounded-2xl p-8">
              <div className="text-sm font-medium text-slate-500 mb-2">Бесплатно</div>
              <div className="text-4xl font-bold text-slate-900 mb-4">0 ₽</div>
              <p className="text-slate-600 mb-6 text-sm">
                Попробуйте формат без обязательств
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  '3 полноценные сказки',
                  'Все функции интерактивности',
                  'Иллюстрации к каждой истории',
                  'Персонализация под ребёнка',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                    <Check className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href={TELEGRAM_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center px-6 py-3 bg-white text-slate-700 font-medium rounded-xl border border-slate-200 hover:border-blue-300 hover:text-blue-600 transition-colors"
              >
                Начать бесплатно
              </a>
            </div>

            <div className="bg-white border-2 border-blue-600 rounded-2xl p-8 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Рекомендуем
                </span>
              </div>
              <div className="text-sm font-medium text-blue-600 mb-2">Безлимит</div>
              <div className="text-4xl font-bold text-slate-900 mb-4">
                300 ₽<span className="text-lg font-normal text-slate-500">/мес</span>
              </div>
              <p className="text-slate-600 mb-6 text-sm">
                Примерно 10 ₽ за сказку — в 3 раза дешевле книг
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Безлимитные сказки',
                  'Все функции интерактивности',
                  'Иллюстрации к каждой истории',
                  'Персонализация под ребёнка',
                  'История всех сказок',
                  'Приоритетная генерация',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                    <Check className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href={TELEGRAM_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
              >
                Подключить подписку
              </a>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-slate-500">
              Оплата через Telegram. Отмена в любой момент — без звонков и сложных процедур.
            </p>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section
        id="testimonials"
        ref={setRef('testimonials')}
        className="py-20 bg-slate-50"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Что говорят родители
            </h2>
            <p className="text-lg text-slate-600">
              Реальные отзывы от тех, кто уже попробовал Сказки Дрёмы
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              {
                name: 'Анна К.',
                child: 'Мама Миши, 4 года',
                text: 'Раньше я уставала придумывать истории на ходу. Теперь за минуту создаю сказку про Мишу и его любимого динозавра, и мы вместе решаем, что будет дальше. Это настоящее спасение!',
                rating: 5,
              },
              {
                name: 'Дмитрий В.',
                child: 'Папа Сони, 6 лет',
                text: 'Соня раньше слушала аудиосказки и засыпала. С Дрёмой она активно участвует в сюжете, обсуждает выборы. Чувствую, что это реально развивает её, а не просто развлекает.',
                rating: 5,
              },
              {
                name: 'Елена М.',
                child: 'Мама Макара, 3 года',
                text: 'Купила три книги за 1200 ₽ — прочитали два раза и забыли. За 300 ₽ в месяц у нас бесконечный запас новых историй. И ещё иллюстрации к каждой — Макар в восторге!',
                rating: 5,
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`bg-white border border-slate-200 rounded-2xl p-6 transition-all duration-700 ${
                  isVisible('testimonials')
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-6'
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: item.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 mb-6 leading-relaxed text-sm">{item.text}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-semibold text-sm">
                    {item.name[0]}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900">{item.name}</div>
                    <div className="text-xs text-slate-500">{item.child}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                <Award className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-slate-900">Грант 1 000 000 ₽</div>
                <div className="text-sm text-slate-500">Фонд содействия инновациям</div>
              </div>
            </div>
            <p className="text-center text-sm text-slate-600">
              Проект «Сказки Дрёмы» получил грантовую поддержку за инновационный подход 
              к детскому развитию и воспитанию через технологии.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        id="faq"
        ref={setRef('faq')}
        className="py-20"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Частые вопросы
            </h2>
            <p className="text-lg text-slate-600">
              Ответы на то, что интересует родителей больше всего
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`border border-slate-200 rounded-xl overflow-hidden transition-all duration-500 ${
                  isVisible('faq') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 transition-colors"
                >
                  <span className="font-medium text-slate-900 pr-4">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-300 ${
                      openFaq === i ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaq === i ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="px-5 pb-5 text-slate-600 text-sm leading-relaxed">
                    {faq.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Начните первую сказку прямо сейчас
          </h2>
          <p className="text-lg text-slate-400 mb-8 max-w-xl mx-auto">
            Три бесплатные сказки ждут вас в Telegram. Без регистрации, без карты, без обязательств.
          </p>
          <a
            href={TELEGRAM_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white text-base font-semibold rounded-xl hover:bg-blue-500 transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            Попробовать бесплатно
          </a>
          <div className="mt-6 flex items-center justify-center gap-6 text-sm text-slate-500">
            <div className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-blue-400" />
              <span>3 сказки бесплатно</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-blue-400" />
              <span>Без карты</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-blue-400" />
              <span>Отмена в любой момент</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-white border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-semibold text-slate-900">Сказки Дрёмы</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-slate-500">
              <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
                Telegram-бот
              </a>
              <button onClick={() => scrollToSection('faq')} className="hover:text-blue-600 transition-colors">
                Поддержка
              </button>
            </div>
            <div className="text-sm text-slate-400">
              © 2025 Сказки Дрёмы
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Award icon component since it's not in lucide-react default exports in some versions
function Award({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  );
}

export default App;
