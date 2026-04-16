import React, { useEffect, useState, useMemo } from 'react';
import { Register } from './Register';
import { LoginPage } from './Login';

// GOST Standards
const GOST_LIST = [
  { id: 'gost-7.32', name: 'ГОСТ 7.32-2017', desc: 'Отчёт о научно-исследовательской работе' },
  { id: 'gost-2.105', name: 'ГОСТ 2.105-95', desc: 'ЕСКД. Общие требования к текстовым документам' },
  { id: 'gost-7.0.11', name: 'ГОСТ Р 7.0.11-2011', desc: 'Диссертация и автореферат' },
  { id: 'gost-7.1', name: 'ГОСТ 7.1-2003', desc: 'Библиографическая запись' },
  { id: 'iso-690', name: 'ISO 690', desc: 'Международный стандарт' },
];

const FOUNDERS = [
  {
    id: 1,
    name: 'Вероника Болтенкова',
    role: 'Основатель',
    description: 'Студентка ИТМО, разработала концепцию GOSTER для решения проблем с форматированием ВКР',
    icon: '👩‍💼',
  },
  {
    id: 2,
    name: 'Киреев Ханиль',
    role: 'Руководитель IT',
    description: 'Студент ИТМО, реализовал техническую архитектуру и разработку платформы',
    icon: '👨‍💻',
  },
];

const TESTIMONIALS = [
  {
    id: 1,
    author: 'Иван Иванов',
    institution: 'МГУ им. Ломоносова',
    text: 'Сэкономил 20 часов на форматирование ВКР. Сервис просто супер!',
    rating: 5,
  },
  {
    id: 2,
    author: 'Мария Петрова',
    institution: 'СПбГУ',
    text: 'Все требования ГОСТ соблюдены идеально. Больше не обращаюсь к преподавателям за переделкой.',
    rating: 5,
  },
  {
    id: 3,
    author: 'Александр Сидоров',
    institution: 'ВШЭ',
    text: 'Быстро, удобно, надёжно. Рекомендую всем студентам!',
    rating: 5,
  },
];

const FAQ_ITEMS = [
  {
    id: 1,
    question: 'Какие форматы файлов поддерживаются?',
    answer: 'Мы поддерживаем DOCX (Microsoft Word) и PDF. Рекомендуется использовать DOCX для максимальной точности форматирования.',
  },
  {
    id: 2,
    question: 'Сколько бесплатных попыток?',
    answer: 'Первые 3 документа абсолютно бесплатны. Для неограниченного доступа подпишитесь на один из наших тарифов.',
  },
  {
    id: 3,
    question: 'Мои документы в безопасности?',
    answer: 'Да! Мы используем шифрование SSL, файлы удаляются через 24 часа, не передаются третьим лицам.',
  },
  {
    id: 4,
    question: 'Могу ли я использовать требования своего вуза?',
    answer: 'Да, вы можете загрузить кастомный шаблон или выбрать готовый из базы (МГУ, СПбГУ, ВШЭ и др.)',
  },
  {
    id: 5,
    question: 'Что делать, если система не распознала оглавление?',
    answer: 'Убедитесь, что используете встроенные стили Word для заголовков. Если проблема сохраняется, свяжитесь с поддержкой.',
  },
];

const PRICING_PLANS = [
  {
    id: 'free',
    name: 'Бесплатно',
    price: '0',
    period: 'навсегда',
    description: 'Для первых проб',
    features: [
      'Загрузка любого DOCX файла',
      'Полная проверка по ГОСТ',
      'Разбор всех ошибок',
      'Рекомендации по исправлению',
      'Без ограничений',
    ],
    highlighted: false,
  },
  {
    id: 'student',
    name: 'Студентам',
    price: '499',
    period: 'за токен',
    description: 'Для полного форматирования',
    features: [
      'Автоматическое форматирование',
      'Готовый файл к сдаче',
      'Все ГОСТ стандарты',
      'История всех преобразований',
      'Приоритетная поддержка',
    ],
    highlighted: true,
    bundles: [
      { tokens: 3, price: 1299, discount: 13.3 },
      { tokens: 10, price: 3999, discount: 19.9 },
    ],
  },
  {
    id: 'business',
    name: 'Для компаний',
    price: '990',
    period: 'в месяц',
    description: 'Для коллективной работы',
    features: [
      'Неограниченные документы',
      'API интеграция',
      'Командная работа (до 10 пользователей)',
      'Кастомные шаблоны',
      'Техническая поддержка 24/7',
    ],
    highlighted: false,
  },
];

const routes = {
  home: '#/',
  login: '#/login',
  register: '#/register',
  cabinet: '#/cabinet',
};

const initialHistory = [
  {
    id: 'd1',
    original: 'vkr_ivanov_v1.docx',
    formatted: 'vkr_ivanov_v1_gost732.docx',
    datetime: '30.03.2026 10:42',
  },
  {
    id: 'd2',
    original: 'diplom_petrov_final.docx',
    formatted: 'diplom_petrov_final_gost732.docx',
    datetime: '29.03.2026 18:11',
  },
  {
    id: 'd3',
    original: 'nir_sidorova.docx',
    formatted: 'nir_sidorova_gost732.docx',
    datetime: '28.03.2026 13:25',
  },
];

const pipelineSteps = [
  'Загрузка документа и проверка структуры',
  'Определение и нормализация стилей заголовков',
  'Применение полей, шрифтов и межстрочных интервалов',
  'Форматирование списков и абзацев по ГОСТ 7.32',
  'Пересборка оглавления и проверка нумерации страниц',
  'Финальная валидация документа',
  'Готово! Файл можно скачивать',
];

function getRoute() {
  const hash = window.location.hash || routes.home;
  return [routes.home, routes.login, routes.register, routes.cabinet].includes(hash) ? hash : routes.home;
}

// ===== Components =====

function Navbar({ isLoggedIn = false }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <a href={routes.home} className="navbar-logo">
            GOSTER
          </a>
          <ul className="navbar-nav">
            <li><a href="#features">Возможности</a></li>
            <li><a href="#pricing">Токены</a></li>
            <li><a href="#faq">FAQ</a></li>
          </ul>
          <div className="navbar-actions">
            {isLoggedIn ? (
              <>
                <a href={routes.cabinet} className="btn btn-ghost btn-small">Кабинет</a>
                <a href={routes.home} className="btn btn-ghost btn-small">Выйти</a>
              </>
            ) : (
              <>
                <a href={routes.login} className="btn btn-ghost btn-small" style={{ textDecoration: 'none' }}>Войти</a>
                <a href={routes.register} className="btn btn-primary btn-small">Создать аккаунт</a>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

function Header() {
  return (
    <header className="topbar">
      <div className="logo">GOSTER</div>
      <div className="topbar-actions">
        <a className="btn btn-ghost" href={routes.login}>Войти</a>
        <a className="btn btn-primary" href={routes.register}>Создать аккаунт</a>
      </div>
    </header>
  );
}

function Landing() {
  return (
    <>
      <Navbar />
      <Hero />
      <HowItWorks />
      <Features />
      <SegmentFeatures />
      <StandardsList />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Founders />
      <CTA />
      <footer style={{ background: 'var(--color-dark)', color: 'white', padding: 'var(--spacing-3xl) 0', textAlign: 'center' }}>
        <p>&copy; 2026 GOSTER.io. Все права защищены.</p>
      </footer>
    </>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <h1>Форматируй любые документы по ГОСТ за минуты, не за дни</h1>
          <p>
            Автоматическое оформление курсовых, дипломов, отчётов, научных статей 
            и технической документации. Все требования ГОСТ соблюдены идеально.
          </p>
          <div className="hero-cta">
            <a href={routes.login} className="btn btn-primary btn-large">
              Попробовать бесплатно
            </a>
            <a href="#how" className="btn btn-secondary btn-large" style={{ color: 'white', borderColor: 'white' }}>
              Узнать больше
            </a>
          </div>
          <div className="social-proof">
            Уже 500+ студентов и компаний
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how" className="section">
      <div className="container">
        <h2 className="section-title">Как это работает</h2>
        <div className="steps-grid">
          <article className="step">
            <h3>Загрузите документ</h3>
            <p>Загрузите вашу работу в формате DOCX. Система автоматически распознает структуру.</p>
          </article>
          <article className="step">
            <h3>Получите разбор</h3>
            <p>Мы проверим документ по всем требованиям ГОСТ, покажем все ошибки и как их исправить.</p>
          </article>
          <article className="step">
            <h3>Готовый результат</h3>
            <p>Получите отформатированный документ со всеми исправлениями. Готово к сдаче и защите!</p>
          </article>
        </div>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    { title: 'Поля', desc: 'Автоматические поля документа: верхнее 30 мм, нижнее 20 мм, слева 20 мм, справа 15 мм — в точном соответствии с ГОСТ 7.32' },
    { title: 'Шрифт', desc: 'Times New Roman, кегель 14pt для основного текста и 12pt для сносок и примечаний' },
    { title: 'Межстрочный интервал', desc: 'Полуторный интервал (1.5) для всего документа, включая таблицы и списки' },
    { title: 'Абзацный отступ', desc: 'Первая строка абзаца — 1.25 см (автоматически применяется ко всем параграфам)' },
    { title: 'Нумерация страниц', desc: 'Страницы нумеруются арабскими цифрами в нижнем правом углу, начиная со второй страницы' },
    { title: 'Заголовки', desc: 'Поддержка 6 уровней заголовков с автоматической нумерацией и форматированием' },
    { title: 'Оглавление', desc: 'Автоматическое генерирование оглавления с указанием номеров страниц' },
    { title: 'Список литературы', desc: 'Форматирование библиографических ссылок в соответствии с ГОСТ 7.1 и ГОСТ 7.0.5' },
  ];

  return (
    <section id="features" className="section">
      <div className="container">
        <h2 className="section-title">Что форматирует GOSTER</h2>
        <div className="features-grid-beautiful">
          {features.map((feature, idx) => (
            <div key={idx} className="feature-card-beautiful">
              <div className="feature-icon">✓</div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SegmentFeatures() {
  const IconStudent = () => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="var(--color-primary)" strokeWidth="2">
      <path d="M24 8L4 16v8c0 8 20 12 20 12s20-4 20-12v-8L24 8z"/>
      <path d="M24 32v8"/>
      <path d="M18 38h12"/>
    </svg>
  );

  const IconUniversity = () => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="var(--color-primary)" strokeWidth="2">
      <path d="M8 16h32L24 6l-16 10z"/>
      <path d="M8 16v20c0 2 4 4 16 4s16-2 16-4V16"/>
      <rect x="12" y="22" width="5" height="8"/>
      <rect x="31" y="22" width="5" height="8"/>
      <rect x="21" y="26" width="6" height="4"/>
    </svg>
  );

  const IconBusiness = () => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="var(--color-primary)" strokeWidth="2">
      <rect x="8" y="12" width="32" height="24" rx="2"/>
      <path d="M14 12v-4h20v4"/>
      <rect x="12" y="20" width="4" height="10"/>
      <rect x="20" y="18" width="4" height="12"/>
      <rect x="28" y="22" width="4" height="8"/>
    </svg>
  );

  const IconScience = () => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="var(--color-primary)" strokeWidth="2">
      <circle cx="24" cy="24" r="12"/>
      <circle cx="24" cy="8" r="2"/>
      <circle cx="36" cy="32" r="2"/>
      <circle cx="12" cy="32" r="2"/>
      <path d="M24 24L24 8M24 24L36 32M24 24L12 32"/>
    </svg>
  );

  const segments = [
    {
      title: 'Студентам',
      icon: <IconStudent />,
      desc: 'Быстро оформите курсовую, ВКР или диплом без стресса. Экономьте время на форматирование и сосредоточьтесь на содержании работы. Автоматическая проверка всех требований ГОСТ гарантирует, что ваша работа не будет отправлена на переделку.',
      features: ['Экономия 20+ часов на форматирование', 'Автоматическая проверка по требованиям ГОСТ', 'Подходит для курсовых, дипломов, ВКР и отчётов', 'Скидка 30% на годовую подписку для студентов', 'Поддержка требований вашего вуза'],
    },
    {
      title: 'Университетам',
      icon: <IconUniversity />,
      desc: 'Установите единые стандарты оформления для всех студентов и кафедр. Снизьте нагрузку на преподавателей, исключив необходимость проверки форматирования. Интегрируйте GOSTER в вашу систему управления обучением.',
      features: ['Единые требования для всех студентов', 'Автоматическая проверка работ преподавателями', 'Интеграция с популярными LMS (Moodle, Canvas)', 'Командные аккаунты для факультетов и кафедр', 'Расширенная аналитика использования', 'Техническая поддержка для учреждения'],
    },
    {
      title: 'Компаниям',
      icon: <IconBusiness />,
      desc: 'Автоматизируйте оформление технической документации, отчётов и коммерческих предложений. Все документы будут соответствовать ГОСТ 2.105 и внутренним стандартам компании. Масштабируемое решение для любого размера организации.',
      features: ['Оформление технических условий (ТУ) и паспортов изделий', 'Форматирование по ГОСТ 2.105 (ЕСКД)', 'Корпоративные тарифы с оптовой скидкой', 'API для интеграции в ваши системы', 'Кастомные шаблоны с логотипом компании', 'Управление доступом для команды'],
    },
    {
      title: 'Учёным',
      icon: <IconScience />,
      desc: 'Подготовьте диссертацию, научную статью или отчёт по НИР в соответствии с высочайшими стандартами оформления. Экспортируйте библиографию в BibTeX для удобной работы с научными системами. Минимизируйте время на технические детали оформления.',
      features: ['Форматирование диссертаций и авторефератов', 'Научные статьи по ГОСТ 7.32 и ISO 690', 'Экспорт библиографии в BibTeX и другие форматы', 'Автоматическое оформление НИР отчётов', 'Интеграция с базами цитирования (PubMed, arXiv)', 'Архивирование и версионирование результатов'],
    },
  ];

  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">Для каждого есть решение</h2>
        <div className="segments-grid">
          {segments.map((seg, idx) => (
            <div key={idx} className="segment-card">
              <div className="segment-icon">{seg.icon}</div>
              <h3>{seg.title}</h3>
              <p className="segment-desc">{seg.desc}</p>
              <ul className="segment-features">
                {seg.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Founders() {
  return (
    <section className="section" style={{ backgroundColor: 'var(--color-light)' }}>
      <div className="container">
        <h2 className="section-title">Авторы проекта</h2>
        <p style={{ textAlign: 'center', marginBottom: 'var(--spacing-3xl)', color: 'var(--color-text-secondary)', fontSize: '18px' }}>Два студента ИТМО создали инструмент, который помогает тысячам студентов сэкономить время на форматирование</p>
        <div className="founders-grid">
          {FOUNDERS.map((founder) => (
            <div key={founder.id} className="founder-card">
              <div className="founder-icon">{founder.icon}</div>
              <h3>{founder.name}</h3>
              <p className="founder-role">{founder.role}</p>
              <p className="founder-desc">{founder.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StandardsList() {
  return null;
}

function Testimonials() {
  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">Отзывы пользователей</h2>
        <div className="testimonials-grid">
          {TESTIMONIALS.map((testimonial) => (
            <div key={testimonial.id} className="testimonial" style={{ borderLeft: 'none' }}>
              <div className="testimonial-header">
                <div className="testimonial-avatar">
                  {testimonial.author.charAt(0)}
                </div>
                <div className="testimonial-info">
                  <h4>{testimonial.author}</h4>
                  <p>{testimonial.institution}</p>
                </div>
              </div>
              <p className="testimonial-text">"{testimonial.text}"</p>
              <div className="testimonial-stars">
                {'★'.repeat(testimonial.rating)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const [showEnterprise, setShowEnterprise] = useState(false);
  const [enterpriseData, setEnterpriseData] = useState({ company: '', phone: '' });

  return (
    <section id="pricing" className="section">
      <div className="container">
        <h2 className="section-title">Простые и честные тарифы</h2>
        <div className="price-grid-new">
          {/* Free Plan */}
          <div className="price-card-new">
            <h3>Бесплатная проверка</h3>
            <div className="price">0 ₽</div>
            <div className="period">навсегда</div>
            <p style={{ marginBottom: 'var(--spacing-lg)', fontSize: '14px' }}>Для знакомства с сервисом</p>
            <ul className="price-features-new">
              <li>Загрузка любого DOCX файла</li>
              <li>Полная проверка по ГОСТ</li>
              <li>Разбор всех ошибок</li>
              <li>Рекомендации по исправлению</li>
              <li>Без ограничений</li>
            </ul>
            <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => window.location.hash = routes.register}>
              Попробовать
            </button>
          </div>

          {/* Student Plan */}
          <div className="price-card-new" style={{ 
            border: '3px solid var(--color-primary)',
            boxShadow: '0 8px 32px rgba(10, 88, 202, 0.2)',
            backgroundColor: 'rgba(10, 88, 202, 0.02)',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              top: '-12px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'var(--color-primary)',
              color: 'white',
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: '600',
            }}>
              ⭐ ПОПУЛЯРНО
            </div>
            <h3 style={{ marginTop: 'var(--spacing-lg)' }}>Студентам</h3>
            <div className="price" style={{ color: 'var(--color-primary)', fontSize: '36px', fontWeight: '700' }}>499 ₽</div>
            <div className="period">за токен</div>
            <p style={{ marginBottom: 'var(--spacing-lg)', fontSize: '13px', color: '#666' }}>Один токен = один полностью отформатированный файл</p>
            
            <ul className="price-features-new">
              <li>Автоматическое форматирование</li>
              <li>Готовый файл к сдаче</li>
              <li>Все ГОСТ стандарты</li>
              <li>История всех преобразований</li>
              <li>Приоритетная поддержка</li>
            </ul>

            <div style={{ marginTop: 'var(--spacing-xl)', padding: 'var(--spacing-lg)', background: '#F0F7FF', borderRadius: '8px', border: '1px solid #D0E8FF' }}>
              <p style={{ marginTop: 0, marginBottom: 'var(--spacing-md)', fontSize: '13px', fontWeight: '600', color: 'var(--color-primary)' }}>Выгодные пакеты с экономией:</p>
              <div style={{ display: 'grid', gap: 'var(--spacing-sm)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14px' }}>
                  <span>3 токена</span>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: '600' }}>1 299 ₽</div>
                    <div style={{ fontSize: '12px', color: '#22863A', fontWeight: '600' }}>Экономия 13.3% (-156 ₽)</div>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14px' }}>
                  <span>10 токенов</span>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: '600' }}>3 999 ₽</div>
                    <div style={{ fontSize: '12px', color: '#22863A', fontWeight: '600' }}>Экономия 19.9% (-990 ₽)</div>
                  </div>
                </div>
              </div>
            </div>

            <button className="btn btn-primary" style={{ width: '100%', marginTop: 'var(--spacing-lg)', background: 'var(--color-primary)' }} onClick={() => window.location.hash = routes.register}>
              Создать аккаунт
            </button>
            <p style={{ fontSize: '12px', marginTop: 'var(--spacing-lg)', color: 'var(--color-text-secondary)', textAlign: 'center' }}>В личном кабинете можно пополнить токены и получить отформатированный документ</p>
          </div>

          {/* Enterprise Plan */}
          <div className="price-card-new">
            <h3>Для компаний и вузов</h3>
            <div className="price">По запросу</div>
            <div className="period">индивидуальные условия</div>
            <p style={{ marginBottom: 'var(--spacing-lg)', fontSize: '14px' }}>Специальные предложения и интеграции</p>
            <ul className="price-features-new">
              <li>Неограниченные преобразования</li>
              <li>API интеграция</li>
              <li>Техподдержка 24/7</li>
              <li>Кастомные стандарты</li>
              <li>Управление командой</li>
            </ul>
            <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => setShowEnterprise(true)}>
              Связаться с нами
            </button>
          </div>
        </div>
      </div>

      {showEnterprise && (
        <div className="modal-overlay" onClick={() => setShowEnterprise(false)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ marginTop: 0 }}>Свяжитесь с нами</h3>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-lg)' }}>Расскажите о вашей компании и мы обсудим лучшие решения</p>
            <div className="form-group">
              <label className="form-label">Название компании</label>
              <input
                type="text"
                className="form-input"
                placeholder="ООО Компания"
                value={enterpriseData.company}
                onChange={(e) => setEnterpriseData({ ...enterpriseData, company: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Номер телефона</label>
              <input
                type="tel"
                className="form-input"
                placeholder="+7 (900) 123-45-67"
                value={enterpriseData.phone}
                onChange={(e) => setEnterpriseData({ ...enterpriseData, phone: e.target.value })}
              />
            </div>
            <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-lg)' }}>Наш менеджер свяжется с вами в течении 15 минут</p>
            <div style={{ display: 'flex', gap: 'var(--spacing-lg)', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowEnterprise(false)}
                className="btn btn-ghost"
              >
                Отмена
              </button>
              <button
                onClick={() => {
                  alert(`Спасибо! Компания: ${enterpriseData.company}, Телефон: ${enterpriseData.phone}`);
                  setShowEnterprise(false);
                }}
                className="btn btn-primary"
              >
                Отправить
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function FAQ() {
  const [openId, setOpenId] = useState(null);

  return (
    <section id="faq" className="section" style={{ backgroundColor: 'var(--color-light)' }}>
      <div className="container">
        <h2 className="section-title">Часто задаваемые вопросы</h2>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {FAQ_ITEMS.map((item) => (
            <div key={item.id} className="faq-item" style={{ marginBottom: 'var(--spacing-lg)' }}>
              <button
                className={`faq-question ${openId === item.id ? 'open' : ''}`}
                onClick={() => setOpenId(openId === item.id ? null : item.id)}
                style={{
                  width: '100%',
                  padding: 'var(--spacing-lg) var(--spacing-xl)',
                  background: 'white',
                  border: '1px solid #E0E0E0',
                  borderRadius: 'var(--size-border-radius-medium)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: '500',
                  color: 'var(--color-text)',
                  transition: 'all 0.3s ease',
                  boxShadow: openId === item.id ? '0 4px 12px rgba(10,88,202,0.15)' : 'none',
                }}
              >
                <span>{item.question}</span>
                <span className="faq-icon" style={{ transform: openId === item.id ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}>▼</span>
              </button>
              {openId === item.id && (
                <div className="faq-answer" style={{
                  padding: 'var(--spacing-lg) var(--spacing-xl)',
                  background: 'white',
                  borderRadius: 'var(--size-border-radius-medium)',
                  marginTop: '4px',
                  borderTop: '3px solid var(--color-primary)',
                  animation: 'slideDown 0.3s ease',
                }}>
                  <p style={{ margin: 0, color: '#6C757D', lineHeight: '1.6' }}>{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="section">
      <div className="container">
        <div style={{ textAlign: 'center', padding: 'var(--spacing-3xl)', background: 'var(--color-light)', borderRadius: 'var(--size-border-radius-large)' }}>
          <h2>Готовы сэкономить время?</h2>
          <p style={{ marginBottom: 'var(--spacing-2xl)' }}>Бесплатная проверка файла — мы покажем какие ошибки у вас есть и где их найти</p>
          <div style={{ display: 'flex', gap: 'var(--spacing-lg)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={routes.register} className="btn btn-primary btn-large">Создать аккаунт</a>
            <a href={routes.login} className="btn btn-secondary btn-large">Войти</a>
          </div>
          <p style={{ marginTop: 'var(--spacing-lg)', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
            💳 Безопасное пополнение • 🔒 Конфиденциальность документов
          </p>
        </div>
      </div>
    </section>
  );
}



function Cabinet() {
  const [tab, setTab] = useState('dashboard');
  const [theme, setTheme] = useState('light');
  const [documents, setDocuments] = useState([
    { id: 1, name: 'vkr_ivanov_v1.docx', status: 'ready', date: '30.03.2026' },
    { id: 2, name: 'diplom_petrov.docx', status: 'ready', date: '29.03.2026' },
  ]);
  const [history, setHistory] = useState(initialHistory);
  const [selectedGost, setSelectedGost] = useState('gost-7.32');
  const [selectedFileName, setSelectedFileName] = useState('');
  const [processing, setProcessing] = useState(false);
  const [stepIndex, setStepIndex] = useState(-1);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const canSubmit = selectedFileName && selectedGost && !processing;

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    if (!processing) return;
    if (stepIndex >= pipelineSteps.length - 1) {
      const timer = setTimeout(() => {
        const now = new Date();
        const dt = now.toLocaleDateString('ru-RU') + ' ' + now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
        const base = selectedFileName.replace(/\.(docx|pdf)$/i, '') || 'document';
        const ext = selectedFileName.toLowerCase().endsWith('.pdf') ? 'pdf' : 'docx';
        setDocuments((prev) => [
          {
            id: Date.now(),
            name: selectedFileName,
            status: 'ready',
            date: dt,
          },
          ...prev,
        ]);
        setProcessing(false);
        setStepIndex(-1);
        setTab('documents');
      }, 700);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => setStepIndex((s) => s + 1), 900);
    return () => clearTimeout(timer);
  }, [processing, stepIndex, selectedFileName]);

  const submit = (e) => {
    e.preventDefault();
    setProcessing(true);
    setStepIndex(0);
  };

  const progress = useMemo(() => {
    if (!processing || stepIndex < 0) return 0;
    return Math.round(((stepIndex + 1) / pipelineSteps.length) * 100);
  }, [processing, stepIndex]);

  const handleLogout = () => {
    console.log('🔓 Выход из аккаунта...');
    localStorage.removeItem('token');
    console.log('✅ Токен удалён из localStorage');
    window.location.hash = '#/';
  };

  return (
    <div className="sidebar-layout">
      <aside className="sidebar">
        <h3 style={{ color: 'white', marginBottom: 'var(--spacing-xl)' }}>GOSTER</h3>
        <ul className="sidebar-menu">
          <li>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); setTab('dashboard'); }}
              className={tab === 'dashboard' ? 'active' : ''}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
              </svg>
              Дашборд
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); setTab('upload'); }}
              className={tab === 'upload' ? 'active' : ''}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
              Загрузить
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); setTab('documents'); }}
              className={tab === 'documents' ? 'active' : ''}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/>
              </svg>
              Мои документы
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); setTab('subscription'); }}
              className={tab === 'subscription' ? 'active' : ''}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="1"/><path d="M12 1v6m0 6v6"/><path d="M4.22 4.22l4.24 4.24m2.12 2.12l4.24 4.24M1 12h6m6 0h6"/><path d="M4.22 19.78l4.24-4.24m2.12-2.12l4.24-4.24"/>
              </svg>
              Подписка
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); setTab('settings'); }}
              className={tab === 'settings' ? 'active' : ''}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m2.12 2.12l4.24 4.24M1 12h6m6 0h6M4.22 19.78l4.24-4.24m2.12-2.12l4.24-4.24"/>
              </svg>
              Настройки
            </a>
          </li>
          <li className="sidebar-footer">
            <div className="theme-toggle">
              <button
                onClick={() => setTheme('light')}
                className={`theme-btn ${theme === 'light' ? 'active' : ''}`}
                title="Светлая тема"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={`theme-btn ${theme === 'dark' ? 'active' : ''}`}
                title="Тёмная тема"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              </button>
            </div>
            <button
              onClick={() => setShowLogoutDialog(true)}
              className="sidebar-btn logout"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              Выйти
            </button>
          </li>
        </ul>
      </aside>

      <main className="main-content">
        {tab === 'dashboard' && (
          <div>
            <h2 style={{ marginTop: 0, paddingTop: 'var(--spacing-lg)', marginBottom: 'var(--spacing-2xl)' }}>Добро пожаловать!</h2>
            
            <div className="quick-stats">
              <div className="stat-card">
                <h3>{documents.length}</h3>
                <p>Документов обработано</p>
              </div>
              <div className="stat-card">
                <h3>1</h3>
                <p>Осталось бесплатных</p>
              </div>
              <div className="stat-card">
                <h3>Бесплатно</h3>
                <p>Текущий тариф</p>
              </div>
            </div>

            <div className="card">
              <h2 style={{ marginTop: 0 }}>Последние документы</h2>
              <table className="table">
                <thead>
                  <tr>
                    <th>Файл</th>
                    <th>Статус</th>
                    <th>Дата</th>
                    <th>Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {documents.slice(0, 3).map((doc) => (
                    <tr key={doc.id}>
                      <td>📄 {doc.name}</td>
                      <td><span className="badge badge-success">Готов</span></td>
                      <td>{doc.date}</td>
                      <td>
                        <button className="btn btn-small btn-ghost">Скачать</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === 'upload' && (
          <div>
            <h2 style={{ marginTop: 0, paddingTop: 'var(--spacing-lg)', marginBottom: 'var(--spacing-2xl)' }}>Загрузить файл</h2>
            <div className="card">
              <form style={{ display: 'grid', gap: 'var(--spacing-lg)' }} onSubmit={submit}>
                <div className="upload-zone">
                  <div className="upload-icon">☁️</div>
                  <h3>Перетащите файл или нажмите для выбора</h3>
                  <p>DOCX формат</p>
                  <input
                    type="file"
                    accept=".docx,.pdf"
                    onChange={(e) => setSelectedFileName(e.target.files?.[0]?.name || '')}
                    disabled={processing}
                    style={{ marginTop: 'var(--spacing-lg)' }}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Выберите стандарт</label>
                  <select 
                    className="form-select"
                    value={selectedGost}
                    onChange={(e) => setSelectedGost(e.target.value)}
                    disabled={processing}
                  >
                    {GOST_LIST.map((gost) => (
                      <option key={gost.id} value={gost.id}>
                        {gost.name}
                      </option>
                    ))}
                  </select>
                </div>

                <button 
                  type="submit"
                  className="btn btn-primary btn-large"
                  disabled={!canSubmit}
                >
                  Начать форматирование
                </button>
              </form>

              {processing && (
                <div className="pipeline" style={{ marginTop: 'var(--spacing-2xl)' }}>
                  <div className="progress-track">
                    <div className="progress-bar" style={{ width: `${progress}%` }} />
                  </div>
                  <p className="progress-text">{progress}%</p>
                  <ul>
                    {pipelineSteps.map((step, idx) => {
                      const state = idx < stepIndex ? 'done' : idx === stepIndex ? 'active' : 'todo';
                      return (
                        <li key={step} className={`stage ${state}`}>
                          <span>{state === 'done' ? '✓' : state === 'active' ? '⏳' : '•'}</span>
                          {step}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {tab === 'documents' && (
          <div>
            <h2 style={{ marginTop: 0, paddingTop: 'var(--spacing-lg)', marginBottom: 'var(--spacing-2xl)' }}>Мои документы</h2>
            <div className="card">
              <table className="table">
                <thead>
                  <tr>
                    <th>Файл</th>
                    <th>Статус</th>
                    <th>Дата</th>
                    <th>Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {documents.map((doc) => (
                    <tr key={doc.id}>
                      <td>📄 {doc.name}</td>
                      <td><span className="badge badge-success">Готов</span></td>
                      <td>{doc.date}</td>
                      <td>
                        <button className="btn btn-small btn-primary">Скачать</button>
                        <button className="btn btn-small btn-ghost">Удалить</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === 'subscription' && (
          <div>
            <h2 style={{ marginTop: 0, paddingTop: 'var(--spacing-lg)', marginBottom: 'var(--spacing-2xl)' }}>Подписка и тариф</h2>
            
            <div className="pricing-section">
              {PRICING_PLANS.map((plan) => (
                <div key={plan.id} className={`price-card-detail ${plan.highlighted ? 'featured' : ''}`}>
                  <div className="plan-header">
                    <h3 style={{ margin: 0 }}>{plan.name}</h3>
                    {plan.highlighted && <span className="badge badge-primary">Популярно</span>}
                  </div>
                  
                  <div className="plan-price">
                    <div className="price">{plan.price}</div>
                    <div className="period">{plan.period}</div>
                  </div>
                  
                  <ul className="plan-features">
                    {plan.features && plan.features.map((feature, idx) => (
                      <li key={idx}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <button className="btn btn-primary" style={{ width: '100%', marginTop: 'var(--spacing-lg)' }}>
                    {plan.id === 'free' ? 'Текущий план' : 'Выбрать'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'settings' && (
          <div>
            <h2 style={{ marginTop: 0, paddingTop: 'var(--spacing-lg)', marginBottom: 'var(--spacing-2xl)' }}>Настройки</h2>
            
            <div style={{ display: 'grid', gap: '24px' }}>
              <div className="card">
                <h3 style={{ marginTop: 0, fontSize: '16px', marginBottom: 'var(--spacing-xl)' }}>Профиль</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-lg)', marginBottom: 'var(--spacing-xl)' }}>
                  <div className="form-group">
                    <label className="form-label">Имя</label>
                    <input type="text" className="form-input" defaultValue="Иван Иванов" />
                  </div>
                  <div className="form-group" style={{ position: 'relative' }}>
                    <label className="form-label">Email</label>
                    <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
                      <input type="email" className="form-input" defaultValue="ivan@mail.ru" style={{ flex: 1 }} />
                      <button className="btn btn-ghost" style={{ padding: 'var(--spacing-md) var(--spacing-lg)' }} title="Изменить">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="card">
                <h3 style={{ marginTop: 0, fontSize: '16px', marginBottom: 'var(--spacing-xl)' }}>Безопасность</h3>
                <div className="form-group">
                  <label className="form-label">Текущий пароль</label>
                  <input type="password" className="form-input" placeholder="••••••••" />
                </div>
                <div className="form-group">
                  <label className="form-label">Новый пароль</label>
                  <input type="password" className="form-input" placeholder="••••••••" />
                </div>
                <div className="form-group">
                  <label className="form-label">Подтверждение пароля</label>
                  <input type="password" className="form-input" placeholder="••••••••" />
                </div>
                <button type="submit" className="btn btn-primary">Сохранить изменения</button>
              </div>
            </div>
          </div>
        )}
      </main>

      {showLogoutDialog && (
        <div className="modal-overlay" onClick={() => setShowLogoutDialog(false)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ marginTop: 0 }}>Вы уверены?</h3>
            <p style={{ marginBottom: 'var(--spacing-2xl)', color: 'var(--color-text-secondary)' }}>Вы действительно хотите выйти из аккаунта?</p>
            <div style={{ display: 'flex', gap: 'var(--spacing-lg)', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowLogoutDialog(false)}
                className="btn btn-ghost"
              >
                Отмена
              </button>
              <button
                onClick={handleLogout}
                className="btn btn-primary"
                style={{ background: '#DC2626' }}
              >
                Выйти
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [route, setRoute] = useState(getRoute());

  useEffect(() => {
    const onChange = () => setRoute(getRoute());
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  // Защита маршрута /cabinet - если нет токена, перенаправляем на логин
  if (route === routes.cabinet) {
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn('⚠️ Попытка доступа к /cabinet без токена. Перенаправление на логин...');
      window.location.hash = routes.login;
      return null;
    }
    return <Cabinet />;
  }

  if (route === routes.login) return <LoginPage />;
  if (route === routes.register) return <Register onSuccess={() => { window.location.hash = routes.login; }} />;
  return <Landing />;
}
