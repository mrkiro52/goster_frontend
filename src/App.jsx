import React, { useEffect, useState, useMemo } from 'react';
import { Register } from './Register';
import { LoginPage } from './Login';
import { Navbar } from './Navbar';

// ============================================================
//  DATA
// ============================================================

const routes = {
  home: '#/',
  login: '#/login',
  register: '#/register',
  cabinet: '#/cabinet',
  students: '#/students',
  business: '#/business',
  universities: '#/universities',
};

const TESTIMONIALS = [
  {
    id: 1,
    author: 'София В.',
    uni: 'МГУ, факультет психологии',
    text: 'Начала переделывать диплом в последний день перед защитой. GOSTER спас мне — за 5 минут всё было готово. Преподавательница даже замечаний не нашла.',
    rating: 5,
  },
  {
    id: 2,
    author: 'Максим К.',
    uni: 'СПбГУ, кафедра информатики',
    text: 'Загрузил 100-страничный диплом, система нашла 47 ошибок форматирования. После исправления — идеально по ГОСТу. Реально спасает при дедлайнах.',
    rating: 5,
  },
  {
    id: 3,
    author: 'Екатерина З.',
    uni: 'ВШЭ, магистратура',
    text: 'Скептически относилась, но после первого использования уже всем подругам рекомендую. 499 рублей — ничто по сравнению со сэкономленными нервами.',
    rating: 5,
  },
];

const FAQ_ITEMS = [
  {
    q: 'За сколько я получу отформатированный файл?',
    a: 'Система работает за 30–60 секунд. Загружаете DOCX — получаете готовый документ, полностью соответствующий ГОСТ 7.32-2017. Скачивайте и сдавайте.',
  },
  {
    q: 'Что именно форматирует GOSTER по ГОСТ 7.32?',
    a: 'Поля (20/20/30/15 мм), шрифт Times New Roman 14pt, межстрочный интервал 1.5, абзацный отступ 1.25 см, нумерацию страниц, автоматическое оглавление, стили заголовков, оформление списков и ссылок на литературу.',
  },
  {
    q: 'Если преподаватель найдёт ошибки форматирования — вернёте токен?',
    a: 'Да. Мы гарантируем 100% соответствие ГОСТ 7.32-2017. Если преподаватель найдёт замечания именно по форматированию (не содержанию) — вернём токен или переделаем бесплатно.',
  },
  {
    q: 'Диплом содержит формулы, таблицы и рисунки — справитесь?',
    a: 'Да. Система форматирует формулы, таблицы, рисунки, списки, сноски, библиографические ссылки. Сложные структуры обрабатываются автоматически.',
  },
  {
    q: 'Мой диплом останется конфиденциальным?',
    a: 'Абсолютно. Файлы зашифрованы при передаче, обрабатываются в изолированной среде и автоматически удаляются через 24 часа. Мы не читаем содержимое документов.',
  },
  {
    q: 'Какие форматы поддерживаются?',
    a: 'Загрузка: DOCX и PDF. Выгрузка: DOCX. Максимальный размер файла — 50 МБ. Для очень больших файлов рекомендуем разбить на части.',
  },
];

const GOST_SPECS = [
  {
    icon: '📐',
    title: 'Поля страницы',
    value: 'Верх 20 мм · Низ 20 мм · Лево 30 мм · Право 15 мм',
    color: '#4F46E5',
  },
  {
    icon: '🔤',
    title: 'Основной шрифт',
    value: 'Times New Roman, кегль 14, обычное начертание',
    color: '#7C3AED',
  },
  {
    icon: '↕️',
    title: 'Межстрочный интервал',
    value: 'Полуторный (1.5) для основного текста',
    color: '#0EA5E9',
  },
  {
    icon: '⇥',
    title: 'Абзацный отступ',
    value: 'Первая строка 1.25 см, выравнивание по ширине',
    color: '#10B981',
  },
  {
    icon: '🔢',
    title: 'Нумерация страниц',
    value: 'Арабские цифры, внизу по центру, с 3-й страницы',
    color: '#F59E0B',
  },
  {
    icon: '📋',
    title: 'Оглавление',
    value: 'Автоматическое, с номерами страниц по точкам',
    color: '#EF4444',
  },
  {
    icon: '📝',
    title: 'Заголовки разделов',
    value: 'Прописные, жирный, по центру или с отступа',
    color: '#8B5CF6',
  },
  {
    icon: '📚',
    title: 'Список литературы',
    value: 'По ГОСТ 7.1-2003, в алфавитном порядке',
    color: '#06B6D4',
  },
  {
    icon: '📊',
    title: 'Таблицы и рисунки',
    value: 'Подписи по ГОСТ, нумерация в пределах разделов',
    color: '#EC4899',
  },
];

const FEATURES = [
  {
    title: 'Мгновенный результат',
    desc: 'Загрузите DOCX — через 30 секунд получите полностью отформатированный документ, готовый к сдаче.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
  },
  {
    title: '100% соответствие ГОСТ',
    desc: 'Каждый параметр документа проверяется по официальным требованиям ГОСТ 7.32-2017.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    title: 'Не нужен Word',
    desc: 'Работаем с вашим файлом на сервере. Не нужно ничего устанавливать — только браузер.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
        <line x1="8" y1="21" x2="16" y2="21"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
  },
  {
    title: 'Сохраняет содержимое',
    desc: 'Текст, формулы, таблицы и изображения остаются нетронутыми. Меняется только оформление.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
    ),
  },
  {
    title: 'Конфиденциальность',
    desc: 'Файлы зашифрованы и автоматически удаляются через 24 часа. Никто не читает ваш диплом.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    ),
  },
  {
    title: 'История документов',
    desc: 'Все отформатированные файлы хранятся в личном кабинете. Скачивайте в любой момент.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/>
        <polyline points="13 2 13 9 20 9"/>
      </svg>
    ),
  },
];

const pipelineSteps = [
  'Загрузка документа и проверка структуры',
  'Нормализация стилей заголовков',
  'Установка полей и параметров страницы',
  'Применение шрифтов и межстрочных интервалов',
  'Форматирование абзацев и списков',
  'Пересборка оглавления с нумерацией',
  'Финальная валидация — ГОСТ 7.32-2017',
];

const initialDocs = [
  { id: 'd1', name: 'vkr_ivanov_v1.docx', status: 'ready', date: '30.03.2026 10:42' },
  { id: 'd2', name: 'diplom_petrov_final.docx', status: 'ready', date: '29.03.2026 18:11' },
  { id: 'd3', name: 'nir_sidorova.docx', status: 'ready', date: '28.03.2026 13:25' },
];

function getRoute() {
  const h = window.location.hash || routes.home;
  const valid = [routes.home, routes.login, routes.register, routes.cabinet,
    routes.students, routes.business, routes.universities];
  return valid.includes(h) ? h : routes.home;
}

// ============================================================
//  SVG HELPERS
// ============================================================

const CheckCircle = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const ChevronDown = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

// ============================================================
//  LANDING
// ============================================================

function Landing() {
  return (
    <>
      <Navbar />
      <Hero />
      <StatsBar />
      <HowItWorks />
      <GostSpecs />
      <FreeCheckBlock />
      <WhyGoster />
      <Testimonials />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </>
  );
}

// ============================================================
//  HERO
// ============================================================

function Hero() {
  return (
    <section className="hero">
      <div className="hero-orb-1" />
      <div className="hero-orb-2" />
      <div className="hero-orb-3" />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '700px' }}>
          {/* Badge */}
          <div className="hero-badge">
            <div className="hero-dot" />
            ГОСТ 7.32-2017 · Автоматическое форматирование дипломов
          </div>

          {/* Headline */}
          <h1 style={{ marginBottom: '20px' }}>
            Диплом примут{' '}
            <span className="text-gradient-hero">с первого раза</span>
          </h1>

          {/* Subheadline */}
          <p style={{ fontSize: '1.125rem', marginBottom: '40px', maxWidth: '560px' }}>
            Загружаете DOCX файл — через 30 секунд получаете идеально
            отформатированный диплом. Поля, шрифты, интервалы, нумерация,
            оглавление — всё по ГОСТ 7.32 автоматически.
          </p>

          {/* CTAs */}
          <div className="hero-cta">
            <a href="#free-check" className="btn btn-white btn-lg">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
              Проверить бесплатно
            </a>
            <a href={routes.register} className="btn btn-glass btn-lg">
              Создать аккаунт
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </a>
          </div>

          {/* Stats */}
          <div className="hero-stats">
            {[
              { num: '2 500+', label: 'дипломов отформатировано' },
              { num: '98%', label: 'приняты без замечаний' },
              { num: '30 сек', label: 'среднее время обработки' },
              { num: 'ГОСТ 7.32', label: '100% соответствие' },
            ].map((s) => (
              <div key={s.num}>
                <div className="hero-stat-num">{s.num}</div>
                <div className="hero-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
//  STATS BAR
// ============================================================

function StatsBar() {
  const stats = [
    { num: '2 500+', label: 'Дипломов обработано' },
    { num: '98%', label: 'Принято без замечаний' },
    { num: '30 сек', label: 'Среднее время форматирования' },
    { num: '100%', label: 'Соответствие ГОСТ 7.32' },
  ];

  return (
    <div className="stats-bar">
      <div className="container">
        <div className="stats-bar-grid">
          {stats.map((s) => (
            <div key={s.num} style={{ padding: '8px 0' }}>
              <div className="stat-num">{s.num}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================
//  HOW IT WORKS
// ============================================================

function HowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'Загрузите файл',
      desc: 'Выберите DOCX или PDF файл вашего диплома. Размер до 50 МБ, любой объём.',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/>
          <polyline points="13 2 13 9 20 9"/>
        </svg>
      ),
    },
    {
      num: '02',
      title: 'Система форматирует',
      desc: 'За 30 секунд применяем все требования ГОСТ 7.32: поля, шрифты, интервалы, оглавление, нумерацию.',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.35-4.35"/>
        </svg>
      ),
    },
    {
      num: '03',
      title: 'Скачайте результат',
      desc: 'Получаете готовый DOCX файл. Открываете в Word — всё идеально. Сдаёте на проверку.',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
      ),
    },
  ];

  return (
    <section className="section" style={{ background: 'var(--bg-alt)' }} id="how">
      <div className="container">
        {/* Header */}
        <div style={{ maxWidth: '560px', marginBottom: '56px' }}>
          <div className="badge badge-primary" style={{ marginBottom: '16px' }}>Как это работает</div>
          <h2 style={{ marginBottom: '12px' }}>3 шага до идеального диплома</h2>
          <p style={{ fontSize: '1.0625rem' }}>
            Никакой установки, никаких настроек. Загрузили файл — скачали результат.
          </p>
        </div>

        {/* Steps */}
        <div className="grid-3">
          {steps.map((s) => (
            <div key={s.num} style={{
              background: 'white',
              border: '1px solid var(--border)',
              borderRadius: 'var(--r-xl)',
              padding: '32px',
              position: 'relative',
              transition: 'all var(--t)',
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(79,70,229,0.4)';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(79,70,229,0.1)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'none';
              }}
            >
              <div className="step-num">{s.num}</div>
              <div className="step-icon">{s.icon}</div>
              <h3 style={{ fontSize: '1.1875rem', marginBottom: '10px' }}>{s.title}</h3>
              <p style={{ fontSize: '14.5px', lineHeight: '1.65' }}>{s.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA below */}
        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <a href="#free-check" className="btn btn-primary btn-lg">
            Попробовать прямо сейчас — бесплатно
          </a>
        </div>
      </div>
    </section>
  );
}

// ============================================================
//  GOST SPECS
// ============================================================

function GostSpecs() {
  return (
    <section className="section" style={{ background: 'white' }}>
      <div className="container">
        {/* Header */}
        <div style={{ maxWidth: '640px', marginBottom: '56px' }}>
          <div className="badge badge-primary" style={{ marginBottom: '16px' }}>ГОСТ 7.32-2017</div>
          <h2 style={{ marginBottom: '12px' }}>
            Что GOSTER форматирует автоматически
          </h2>
          <p style={{ fontSize: '1.0625rem' }}>
            Все параметры, которые нормоконтролёр проверяет при сдаче ВКР, —
            применяются одним нажатием кнопки.
          </p>
        </div>

        {/* Specs grid */}
        <div className="spec-grid">
          {GOST_SPECS.map((s) => (
            <div key={s.title} className="spec-card">
              <div className="spec-card-icon" style={{
                background: `${s.color}15`,
                color: s.color,
              }}>
                <span style={{ fontSize: '22px' }}>{s.icon}</span>
              </div>
              <h4 style={{ marginBottom: '6px', fontSize: '14.5px' }}>{s.title}</h4>
              <p style={{ fontSize: '13px', lineHeight: '1.55', color: 'var(--text-muted)' }}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div style={{
          background: 'linear-gradient(135deg, #EEF2FF 0%, #F5F3FF 100%)',
          border: '1px solid rgba(79,70,229,0.2)',
          borderRadius: 'var(--r-xl)',
          padding: '28px 32px',
          marginTop: '40px',
          display: 'flex',
          gap: '20px',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: 'var(--r-md)',
            background: 'var(--color-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            color: 'white',
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          </div>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <h4 style={{ marginBottom: '6px', color: 'var(--color-primary)' }}>Гарантия соответствия ГОСТ</h4>
            <p style={{ fontSize: '14px', margin: 0 }}>
              Если нормоконтролёр найдёт ошибки форматирования в документе, обработанном GOSTER, — возвращаем токен или переделываем бесплатно. Без споров.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
//  FREE CHECK
// ============================================================

function FreeCheckBlock() {
  const [fileName, setFileName] = useState('');
  const [checking, setChecking] = useState(false);
  const [results, setResults] = useState(null);
  const [drag, setDrag] = useState(false);

  const handleCheck = (e) => {
    e.preventDefault();
    if (!fileName) return;
    setChecking(true);
    setResults(null);

    setTimeout(() => {
      setResults({
        score: 62,
        issues: [
          { type: 'error', text: 'Поле сверху 25 мм вместо 20 мм по ГОСТ 7.32' },
          { type: 'error', text: 'Шрифт Arial вместо Times New Roman' },
          { type: 'error', text: 'Нумерация страниц отсутствует' },
          { type: 'warning', text: 'Межстрочный интервал 1.15 вместо 1.5' },
          { type: 'warning', text: 'Заголовки 2-го уровня не соответствуют стилю' },
          { type: 'success', text: 'Оглавление сформировано корректно' },
          { type: 'success', text: 'Абзацный отступ соответствует требованиям' },
        ],
      });
      setChecking(false);
    }, 2200);
  };

  const ScoreColor = (n) => n >= 80 ? '#10B981' : n >= 60 ? '#F59E0B' : '#EF4444';

  return (
    <section id="free-check" className="section" style={{ background: 'var(--bg-alt)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ maxWidth: '560px', marginBottom: '48px' }}>
          <div className="badge badge-primary" style={{ marginBottom: '16px' }}>Бесплатно</div>
          <h2 style={{ marginBottom: '12px' }}>Проверьте диплом прямо сейчас</h2>
          <p style={{ fontSize: '1.0625rem' }}>
            Загрузите файл — покажем все ошибки форматирования с объяснением.
            Бесплатно и без регистрации.
          </p>
        </div>

        <div className="check-grid">
          {/* Left: upload */}
          <div>
            <div
              className={`upload-zone${drag ? ' drag-over' : ''}`}
              onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
              onDragLeave={() => setDrag(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDrag(false);
                const f = e.dataTransfer.files[0];
                if (f) setFileName(f.name);
              }}
            >
              <div className="upload-icon-wrap">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="17 8 12 3 7 8"/>
                  <line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
              </div>
              <h3 style={{ fontSize: '1.0625rem', marginBottom: '8px', color: 'var(--text)' }}>
                Перетащите файл или нажмите
              </h3>
              <p style={{ fontSize: '13.5px', marginBottom: '20px' }}>DOCX или PDF, до 50 МБ</p>
              <label style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                background: 'var(--color-gradient)',
                color: 'white',
                borderRadius: 'var(--r-md)',
                fontWeight: '600',
                fontSize: '14px',
                cursor: 'pointer',
              }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
                Выбрать файл
                <input
                  type="file"
                  accept=".docx,.pdf"
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) setFileName(f.name);
                  }}
                  disabled={checking}
                />
              </label>
            </div>

            {fileName && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginTop: '12px',
                padding: '12px 16px',
                background: 'rgba(16,185,129,0.07)',
                border: '1px solid rgba(16,185,129,0.2)',
                borderRadius: 'var(--r-md)',
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span style={{ fontSize: '13.5px', fontWeight: '600', color: 'var(--text)' }}>{fileName}</span>
              </div>
            )}

            <button
              onClick={handleCheck}
              disabled={!fileName || checking}
              className="btn btn-primary btn-full btn-lg"
              style={{ marginTop: '16px' }}
            >
              {checking ? (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ animation: 'spin 0.8s linear infinite' }}>
                    <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                  </svg>
                  Анализируем документ...
                </>
              ) : 'Проверить на соответствие ГОСТ'}
            </button>

            {/* Trust */}
            <div style={{ display: 'flex', gap: '16px', marginTop: '16px', flexWrap: 'wrap' }}>
              {['Бесплатно', 'Конфиденциально', 'Без регистрации'].map((t) => (
                <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12.5px', color: 'var(--text-muted)' }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--color-success)" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  {t}
                </div>
              ))}
            </div>
          </div>

          {/* Right: results or placeholder */}
          <div>
            {!results && !checking && (
              <div style={{
                background: 'white',
                border: '1px solid var(--border)',
                borderRadius: 'var(--r-xl)',
                padding: '32px',
                textAlign: 'center',
                minHeight: '300px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
              }}>
                <div style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: 'var(--r-xl)',
                  background: 'var(--color-primary-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-primary)',
                }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="m21 21-4.35-4.35"/>
                  </svg>
                </div>
                <h3 style={{ fontSize: '1.125rem', margin: 0 }}>Результаты проверки</h3>
                <p style={{ fontSize: '14px', maxWidth: '240px' }}>
                  Загрузите файл слева, и мы покажем все ошибки форматирования
                </p>
              </div>
            )}

            {checking && (
              <div style={{
                background: 'white',
                border: '1px solid var(--border)',
                borderRadius: 'var(--r-xl)',
                padding: '32px',
                textAlign: 'center',
                minHeight: '300px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '16px',
              }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  border: '4px solid var(--color-primary-light)',
                  borderTop: '4px solid var(--color-primary)',
                  animation: 'spin 0.8s linear infinite',
                }} />
                <h3 style={{ fontSize: '1.0625rem', margin: 0 }}>Анализируем документ</h3>
                <p style={{ fontSize: '13.5px' }}>Проверяем соответствие ГОСТ 7.32-2017...</p>
              </div>
            )}

            {results && (
              <div style={{
                background: 'white',
                border: '1px solid var(--border)',
                borderRadius: 'var(--r-xl)',
                padding: '28px',
                boxShadow: 'var(--shadow-md)',
              }}>
                {/* Score */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  marginBottom: '24px',
                  padding: '20px',
                  background: 'var(--bg-alt)',
                  borderRadius: 'var(--r-lg)',
                }}>
                  <div style={{
                    width: '72px',
                    height: '72px',
                    borderRadius: '50%',
                    border: `4px solid ${ScoreColor(results.score)}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <span style={{ fontSize: '1.25rem', fontWeight: '800', color: ScoreColor(results.score) }}>
                      {results.score}%
                    </span>
                  </div>
                  <div>
                    <p style={{ fontSize: '12px', color: 'var(--text-faint)', margin: '0 0 4px' }}>Соответствие ГОСТ 7.32</p>
                    <p style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text)', margin: 0 }}>
                      {results.score >= 80 ? 'Хорошее' : results.score >= 60 ? 'Требует доработки' : 'Критические ошибки'}
                    </p>
                    <p style={{ fontSize: '12.5px', color: 'var(--text-muted)', margin: '2px 0 0' }}>
                      {results.issues.filter(i => i.type === 'error').length} крит. ·{' '}
                      {results.issues.filter(i => i.type === 'warning').length} предупреждений
                    </p>
                  </div>
                </div>

                {/* Issues */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
                  {results.issues.map((issue, i) => {
                    const colors = { error: '#EF4444', warning: '#F59E0B', success: '#10B981' };
                    const bgs = { error: 'rgba(239,68,68,0.05)', warning: 'rgba(245,158,11,0.05)', success: 'rgba(16,185,129,0.05)' };
                    const labels = { error: '✕ Ошибка', warning: '⚠ Внимание', success: '✓ Хорошо' };
                    return (
                      <div key={i} style={{
                        padding: '10px 14px',
                        borderRadius: 'var(--r-md)',
                        background: bgs[issue.type],
                        borderLeft: `3px solid ${colors[issue.type]}`,
                      }}>
                        <span style={{ fontSize: '11px', fontWeight: '700', color: colors[issue.type], display: 'block', marginBottom: '2px' }}>
                          {labels[issue.type]}
                        </span>
                        <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{issue.text}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Upsell */}
                <div style={{
                  background: 'linear-gradient(135deg, #EEF2FF, #F5F3FF)',
                  border: '1px solid rgba(79,70,229,0.2)',
                  borderRadius: 'var(--r-lg)',
                  padding: '20px',
                  textAlign: 'center',
                }}>
                  <p style={{ fontWeight: '700', fontSize: '15px', color: 'var(--text)', marginBottom: '6px' }}>
                    Исправить всё автоматически?
                  </p>
                  <p style={{ fontSize: '13px', marginBottom: '14px' }}>
                    Зарегистрируйтесь — и получите готовый документ за 30 секунд
                  </p>
                  <a href={routes.register} className="btn btn-primary btn-full">
                    Исправить и скачать — 499 ₽
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </section>
  );
}

// ============================================================
//  WHY GOSTER
// ============================================================

function WhyGoster() {
  return (
    <section className="section" style={{ background: 'white' }}>
      <div className="container">
        <div style={{ maxWidth: '560px', marginBottom: '56px' }}>
          <div className="badge badge-primary" style={{ marginBottom: '16px' }}>Преимущества</div>
          <h2 style={{ marginBottom: '12px' }}>Почему выбирают GOSTER</h2>
          <p style={{ fontSize: '1.0625rem' }}>
            Не просто проверка — полноценное автоматическое форматирование по всем требованиям ГОСТ.
          </p>
        </div>

        <div className="grid-3">
          {FEATURES.map((f) => (
            <div key={f.title} className="feature-card">
              <div className="feature-icon">{f.icon}</div>
              <h4 style={{ fontSize: '1.0625rem', marginBottom: '8px' }}>{f.title}</h4>
              <p style={{ fontSize: '13.5px', lineHeight: '1.65' }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
//  TESTIMONIALS
// ============================================================

function Testimonials() {
  return (
    <section className="section" style={{ background: 'var(--bg-alt)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '560px', margin: '0 auto 56px' }}>
          <div className="badge badge-primary" style={{ marginBottom: '16px' }}>Отзывы</div>
          <h2 style={{ marginBottom: '12px' }}>2 500+ студентов уже сдали</h2>
          <p style={{ fontSize: '1.0625rem' }}>Что говорят те, кто уже воспользовался сервисом</p>
        </div>

        <div className="grid-3">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="testimonial-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div className="avatar">{t.author.charAt(0)}</div>
                <div>
                  <div style={{ fontWeight: '700', fontSize: '14.5px', color: 'var(--text)' }}>{t.author}</div>
                  <div style={{ fontSize: '12.5px', color: 'var(--text-muted)', marginTop: '2px' }}>{t.uni}</div>
                </div>
              </div>
              <div className="stars">{'★'.repeat(t.rating)}</div>
              <p style={{ fontSize: '14.5px', fontStyle: 'italic', lineHeight: '1.65', color: 'var(--gray-700)' }}>
                "{t.text}"
              </p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '20px' }}>
            Средняя оценка: <strong style={{ color: 'var(--text)' }}>4.9 / 5</strong> на основе 847 отзывов
          </p>
          <a href={routes.register} className="btn btn-primary btn-lg">
            Попробовать бесплатно
          </a>
        </div>
      </div>
    </section>
  );
}

// ============================================================
//  PRICING
// ============================================================

function Pricing() {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ company: '', phone: '' });

  const plans = [
    {
      name: 'Проверка',
      price: 'Бесплатно',
      period: 'навсегда',
      desc: 'Проверьте форматирование и узнайте все ошибки без оплаты',
      features: [
        'Загрузка любого DOCX или PDF',
        'Полный анализ по ГОСТ 7.32',
        'Список всех ошибок с описанием',
        'Рекомендации по исправлению',
        'Без регистрации',
      ],
      cta: 'Проверить сейчас',
      href: '#free-check',
      featured: false,
    },
    {
      name: 'Студент',
      price: '499',
      period: 'за документ',
      desc: 'Автоматическое форматирование с гарантией сдачи с первого раза',
      features: [
        'Автоматическое форматирование',
        'Готовый DOCX файл к сдаче',
        'ГОСТ 7.32-2017 — 100%',
        'Гарантия возврата токена',
        'История в личном кабинете',
        'Пакет 3 токена — 1 299 ₽ (−156 ₽)',
        'Пакет 10 токенов — 3 999 ₽ (−990 ₽)',
      ],
      cta: 'Создать аккаунт',
      href: routes.register,
      featured: true,
    },
    {
      name: 'Для вузов',
      price: 'По запросу',
      period: 'корпоративная лицензия',
      desc: 'Единая система для всего потока студентов',
      features: [
        'Неограниченное количество документов',
        'API интеграция в LMS',
        'Командный доступ (до 50 пользователей)',
        'Кастомные шаблоны под требования вуза',
        'Поддержка 24/7',
      ],
      cta: 'Оставить заявку',
      href: '#',
      featured: false,
      enterprise: true,
    },
  ];

  return (
    <section className="section" style={{ background: 'white' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '560px', margin: '0 auto 56px' }}>
          <div className="badge badge-primary" style={{ marginBottom: '16px' }}>Тарифы</div>
          <h2 style={{ marginBottom: '12px' }}>Простые, понятные цены</h2>
          <p style={{ fontSize: '1.0625rem' }}>
            Начните с бесплатной проверки. Платите только за форматирование.
          </p>
        </div>

        <div className="grid-3">
          {plans.map((plan) => (
            <div key={plan.name} className={`pricing-card${plan.featured ? ' featured' : ''}`}>
              {plan.featured && (
                <div className="pricing-badge">⭐ Популярный выбор</div>
              )}

              <div style={{ fontSize: '13.5px', fontWeight: '700', color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '8px' }}>
                {plan.name}
              </div>

              <div className={plan.price === 'Бесплатно' || plan.price === 'По запросу' ? 'pricing-price-free' : 'pricing-price'} style={{
                fontSize: plan.price === 'Бесплатно' || plan.price === 'По запросу' ? '1.75rem' : '3rem',
                fontWeight: '900',
                letterSpacing: '-0.04em',
                color: plan.featured ? 'var(--color-primary)' : 'var(--text)',
                lineHeight: 1,
                margin: '12px 0 4px',
              }}>
                {plan.price !== 'Бесплатно' && plan.price !== 'По запросу' && (
                  <span style={{ fontSize: '1.25rem', verticalAlign: 'super', fontWeight: 700 }}>₽</span>
                )}
                {plan.price}
              </div>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>{plan.period}</div>
              <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', marginBottom: '24px', minHeight: '42px' }}>
                {plan.desc}
              </p>

              <div style={{ flex: 1, marginBottom: '24px' }}>
                {plan.features.map((f, i) => (
                  <div key={i} className="pricing-feat">
                    <div className="pricing-check"><CheckCircle /></div>
                    <span>{f}</span>
                  </div>
                ))}
              </div>

              <button
                className={`btn btn-full btn-lg ${plan.featured ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => {
                  if (plan.enterprise) {
                    setShowModal(true);
                  } else {
                    window.location.hash = plan.href.replace('#', '') || '';
                    if (plan.href === '#free-check') {
                      document.getElementById('free-check')?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }
                }}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Enterprise modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowModal(false)}
              style={{ float: 'right', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '18px', padding: '0 0 8px 8px' }}
            >
              ✕
            </button>
            <h3 style={{ marginTop: 0, fontSize: '1.25rem', marginBottom: '6px' }}>Заявка для вузов и компаний</h3>
            <p style={{ fontSize: '14px', marginBottom: '24px' }}>Расскажите о вашей организации — мы подберём условия</p>

            <form onSubmit={(e) => { e.preventDefault(); alert(`Спасибо! Свяжемся в течение 2 часов. ${form.company}, ${form.phone}`); setShowModal(false); }}>
              <div className="form-group">
                <label className="form-label">Название организации</label>
                <input type="text" className="form-input" placeholder="МГУ им. Ломоносова" required value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Телефон для связи</label>
                <input type="tel" className="form-input" placeholder="+7 (900) 123-45-67" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              </div>
              <button type="submit" className="btn btn-primary btn-full btn-lg">
                Отправить заявку
              </button>
            </form>
            <p style={{ textAlign: 'center', fontSize: '12.5px', color: 'var(--text-faint)', marginTop: '12px' }}>
              Обычно отвечаем в течение 2 часов
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

// ============================================================
//  FAQ
// ============================================================

function FAQ() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section className="section" style={{ background: 'var(--bg-alt)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '520px', margin: '0 auto 56px' }}>
          <div className="badge badge-primary" style={{ marginBottom: '16px' }}>FAQ</div>
          <h2>Часто задаваемые вопросы</h2>
        </div>

        <div style={{ maxWidth: '760px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {FAQ_ITEMS.map((item, idx) => (
            <div key={idx} className={`faq-item${openIdx === idx ? ' open' : ''}`}>
              <button className="faq-btn" onClick={() => setOpenIdx(openIdx === idx ? -1 : idx)}>
                <span>{item.q}</span>
                <div className="faq-chevron">
                  <ChevronDown />
                </div>
              </button>
              {openIdx === idx && (
                <div className="faq-answer">{item.a}</div>
              )}
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '16px' }}>
            Не нашли ответа?
          </p>
          <a href="mailto:support@goster.io" className="btn btn-ghost">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            Написать в поддержку
          </a>
        </div>
      </div>
    </section>
  );
}

// ============================================================
//  FINAL CTA
// ============================================================

function FinalCTA() {
  return (
    <section className="cta-section">
      <div className="hero-orb-1" style={{ opacity: 0.7 }} />
      <div className="hero-orb-2" style={{ opacity: 0.5 }} />

      <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <div className="badge badge-dark" style={{ marginBottom: '24px' }}>
            <div className="hero-dot" />
            Начните прямо сейчас
          </div>

          <h2 style={{ color: 'white', fontSize: 'clamp(1.75rem, 4vw, 3rem)', marginBottom: '16px' }}>
            Отформатируйте диплом{' '}
            <span className="text-gradient-hero">за 30 секунд</span>
          </h2>

          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1.0625rem', marginBottom: '40px', maxWidth: '480px', margin: '0 auto 40px' }}>
            Начните с бесплатной проверки. Без карты, без обязательств.
            Более 2 500 студентов уже сдали диплом с первого раза.
          </p>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={routes.register} className="btn btn-white btn-xl">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <line x1="19" y1="8" x2="19" y2="14"/>
                <line x1="22" y1="11" x2="16" y2="11"/>
              </svg>
              Создать аккаунт бесплатно
            </a>
            <a href="#free-check" className="btn btn-glass btn-xl">
              Проверить диплом
            </a>
          </div>

          <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', marginTop: '32px', flexWrap: 'wrap' }}>
            {['Бесплатная проверка', 'Гарантия ГОСТ 7.32', 'Конфиденциальность'].map((t) => (
              <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
//  FOOTER
// ============================================================

function Footer() {
  const cols = [
    {
      title: 'Сервис',
      links: [
        { label: 'Для студентов', href: routes.students },
        { label: 'Для вузов', href: routes.universities },
        { label: 'Для компаний', href: routes.business },
        { label: 'Тарифы', href: '#' },
      ],
    },
    {
      title: 'Форматирование',
      links: [
        { label: 'ГОСТ 7.32-2017', href: '#' },
        { label: 'Бесплатная проверка', href: '#free-check' },
        { label: 'FAQ', href: '#' },
      ],
    },
    {
      title: 'Аккаунт',
      links: [
        { label: 'Войти', href: routes.login },
        { label: 'Регистрация', href: routes.register },
        { label: 'Личный кабинет', href: routes.cabinet },
      ],
    },
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div>
            <div className="footer-logo">GOSTER</div>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)', lineHeight: '1.65', marginTop: '8px', maxWidth: '260px' }}>
              Автоматическое форматирование дипломных работ по ГОСТ 7.32-2017. Создано студентами для студентов.
            </p>
            <div style={{ display: 'flex', gap: '8px', marginTop: '20px' }}>
              {['ВКР', 'ГОСТ 7.32', 'Диплом'].map((tag) => (
                <span key={tag} style={{
                  fontSize: '11px',
                  fontWeight: '600',
                  color: 'rgba(255,255,255,0.4)',
                  background: 'rgba(255,255,255,0.06)',
                  padding: '4px 10px',
                  borderRadius: 'var(--r-full)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          {cols.map((col) => (
            <div key={col.title}>
              <div style={{ fontSize: '11.5px', fontWeight: '700', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '16px' }}>
                {col.title}
              </div>
              {col.links.map((l) => (
                <a key={l.label} href={l.href} className="footer-link">{l.label}</a>
              ))}
            </div>
          ))}
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)', margin: 0 }}>
            © 2026 GOSTER.io — Все права защищены
          </p>
          <div style={{ display: 'flex', gap: '20px' }}>
            <a href="#" className="footer-link" style={{ fontSize: '13px' }}>Конфиденциальность</a>
            <a href="#" className="footer-link" style={{ fontSize: '13px' }}>Условия использования</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ============================================================
//  CABINET
// ============================================================

function Cabinet() {
  const [tab, setTab] = useState('dashboard');
  const [documents, setDocuments] = useState(initialDocs);
  const [fileName, setFileName] = useState('');
  const [processing, setProcessing] = useState(false);
  const [stepIdx, setStepIdx] = useState(-1);
  const [showLogout, setShowLogout] = useState(false);
  const [drag, setDrag] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const canSubmit = fileName && !processing;

  useEffect(() => {
    if (!processing) return;
    if (stepIdx >= pipelineSteps.length - 1) {
      const t = setTimeout(() => {
        const now = new Date();
        const dt = `${now.toLocaleDateString('ru-RU')} ${now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}`;
        setDocuments((prev) => [{ id: Date.now(), name: fileName, status: 'ready', date: dt }, ...prev]);
        setProcessing(false);
        setStepIdx(-1);
        setFileName('');
        setSuccessMsg('Документ отформатирован и сохранён!');
        setTab('documents');
        setTimeout(() => setSuccessMsg(''), 4000);
      }, 700);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setStepIdx((s) => s + 1), 850);
    return () => clearTimeout(t);
  }, [processing, stepIdx, fileName]);

  const progress = useMemo(() => {
    if (!processing || stepIdx < 0) return 0;
    return Math.round(((stepIdx + 1) / pipelineSteps.length) * 100);
  }, [processing, stepIdx]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setProcessing(true);
    setStepIdx(0);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.hash = '#/';
  };

  const navItems = [
    { id: 'dashboard', label: 'Дашборд', icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg> },
    { id: 'upload', label: 'Загрузить файл', icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg> },
    { id: 'documents', label: 'Мои документы', icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></svg> },
    { id: 'settings', label: 'Настройки', icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg> },
  ];

  const MobileTabBar = () => (
    <div className="cab-mobile-nav">
      {navItems.map((item) => (
        <button
          key={item.id}
          className={`cab-mob-btn${tab === item.id ? ' active' : ''}`}
          onClick={() => setTab(item.id)}
        >
          {item.icon}
          <span>{item.id === 'upload' ? 'Загрузить' : item.label}</span>
        </button>
      ))}
    </div>
  );

  return (
    <div className="sidebar-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <a href={routes.home} className="sidebar-logo">GOSTER</a>

        <div className="sidebar-section">Навигация</div>
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`sidebar-btn${tab === item.id ? ' active' : ''}`}
              onClick={() => setTab(item.id)}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        {/* Token box */}
        <div style={{ marginTop: 'auto', paddingTop: '16px' }}>
          <div className="sidebar-token">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ fontSize: '11px', fontWeight: '700', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Форматирование</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '14px' }}>

              <span style={{ fontSize: '18px', color: 'rgba(255,255,255,1)', fontWeight: '500' }}>100 токенов</span>
            </div>
            <button style={{
              width: '100%',
              padding: '8px',
              background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
              color: 'white',
              border: 'none',
              borderRadius: 'var(--r-md)',
              fontWeight: '700',
              fontSize: '13px',
              cursor: 'pointer',
              fontFamily: 'var(--font)',
            }}>
              + Купить токены
            </button>
          </div>

          <div className="sidebar-sep" />

          {/* User info */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', marginBottom: '4px' }}>
            <div style={{
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: '700',
              fontSize: '14px',
              flexShrink: 0,
            }}>И</div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: '13px', fontWeight: '600', color: 'rgba(255,255,255,0.8)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Иван Иванов</div>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)' }}>Студент</div>
            </div>
          </div>

          <button
            onClick={() => setShowLogout(true)}
            className="sidebar-btn"
            style={{ color: 'rgba(255,100,100,0.7)' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Выйти из аккаунта
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="cabinet-main">
        {/* Success notification */}
        {successMsg && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '14px 20px',
            background: 'rgba(16,185,129,0.1)',
            border: '1px solid rgba(16,185,129,0.25)',
            borderRadius: 'var(--r-lg)',
            marginBottom: '24px',
            animation: 'slideDown 0.3s ease',
            color: 'var(--color-success)',
            fontWeight: '600',
            fontSize: '14px',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
            {successMsg}
          </div>
        )}

        {/* ─── DASHBOARD ─── */}
        {tab === 'dashboard' && (
          <div>
            <div className="cabinet-header">
              <h2>Добро пожаловать!</h2>
              <p>Ваш личный кабинет для форматирования документов по ГОСТ</p>
            </div>

            {/* Stats */}
            <div className="stat-card-grid">
              <div className="stat-card" style={{ borderLeft: '3px solid var(--color-primary)' }}>
                <div className="stat-card-num" style={{ color: 'var(--color-primary)' }}>{documents.length}</div>
                <div className="stat-card-label">Документов обработано</div>
              </div>
              <div className="stat-card" style={{ borderLeft: '3px solid var(--color-success)' }}>
              <span style={{ fontSize: '2.25rem', fontWeight: '900', lineHeight: 1, color: '#A5B4FC', letterSpacing: '-0.04em' }}>∞</span>
                <div className="stat-card-label">Бесплатных проверок</div>
              </div>
              <div className="stat-card" style={{ borderLeft: '3px solid var(--color-warning)' }}>
                <div className="stat-card-num" style={{ color: 'var(--color-warning)', fontSize: '1.25rem' }}>Бесплатный</div>
                <div className="stat-card-label">Текущий тариф</div>
              </div>
            </div>

            {/* Quick actions */}
            <div className="quick-actions-grid">
              <button
                onClick={() => setTab('upload')}
                style={{
                  background: 'var(--color-gradient)',
                  color: 'white',
                  border: 'none',
                  borderRadius: 'var(--r-xl)',
                  padding: '24px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontFamily: 'var(--font)',
                  transition: 'all var(--t)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'var(--shadow-primary)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div style={{ fontSize: '28px', marginBottom: '8px' }}>📄</div>
                <div style={{ fontWeight: '700', fontSize: '15px', marginBottom: '4px' }}>Отформатировать диплом</div>
                <div style={{ fontSize: '12.5px', opacity: 0.8 }}>Загрузите DOCX — получите по ГОСТ за 30 сек</div>
              </button>
              <button
                onClick={() => setTab('documents')}
                style={{
                  background: 'white',
                  color: 'var(--text)',
                  border: '1.5px solid var(--border)',
                  borderRadius: 'var(--r-xl)',
                  padding: '24px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontFamily: 'var(--font)',
                  transition: 'all var(--t)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(79,70,229,0.4)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none'; }}
              >
                <div style={{ fontSize: '28px', marginBottom: '8px' }}>📁</div>
                <div style={{ fontWeight: '700', fontSize: '15px', marginBottom: '4px' }}>Мои документы</div>
                <div style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>Скачать готовые файлы</div>
              </button>
            </div>

            {/* Recent docs */}
            <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 'var(--r-xl)', overflow: 'hidden' }}>
              <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '1rem', margin: 0 }}>Последние документы</h3>
                <button onClick={() => setTab('documents')} className="btn btn-ghost btn-sm">Все документы</button>
              </div>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Документ</th>
                    <th>Статус</th>
                    <th>Дата</th>
                    <th>Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {documents.slice(0, 3).map((doc) => (
                    <tr key={doc.id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{ width: '32px', height: '32px', borderRadius: 'var(--r-md)', background: 'var(--color-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)', flexShrink: 0 }}>
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/>
                              <polyline points="13 2 13 9 20 9"/>
                            </svg>
                          </div>
                          <span style={{ fontWeight: '500', fontSize: '13.5px' }}>{doc.name}</span>
                        </div>
                      </td>
                      <td>
                        <span className="badge badge-success">✓ Готов</span>
                      </td>
                      <td style={{ color: 'var(--text-muted)', fontSize: '13px' }}>{doc.date}</td>
                      <td>
                        <button className="btn btn-primary btn-sm">Скачать</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ─── UPLOAD ─── */}
        {tab === 'upload' && (
          <div>
            <div className="cabinet-header">
              <h2>Форматировать документ</h2>
              <p>Загрузите DOCX файл — получите готовый документ по ГОСТ 7.32-2017</p>
            </div>

            <div className="upload-col-grid">
              <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 'var(--r-xl)', padding: '28px' }}>
                <h3 style={{ fontSize: '1rem', marginBottom: '20px' }}>Выберите файл</h3>

                <form onSubmit={handleSubmit}>
                  <div
                    className={`upload-drop${drag ? ' drag-over' : ''}`}
                    onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
                    onDragLeave={() => setDrag(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setDrag(false);
                      const f = e.dataTransfer.files[0];
                      if (f) setFileName(f.name);
                    }}
                  >
                    <div style={{ width: '60px', height: '60px', borderRadius: 'var(--r-xl)', background: 'var(--color-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)', margin: '0 auto 14px' }}>
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                        <polyline points="17 8 12 3 7 8"/>
                        <line x1="12" y1="3" x2="12" y2="15"/>
                      </svg>
                    </div>
                    <h4 style={{ marginBottom: '6px', fontSize: '14.5px' }}>Перетащите файл сюда</h4>
                    <p style={{ fontSize: '13px', marginBottom: '16px' }}>DOCX или PDF, до 50 МБ</p>
                    <label className="btn btn-outline btn-sm" style={{ cursor: 'pointer' }}>
                      Выбрать файл
                      <input type="file" accept=".docx,.pdf" style={{ display: 'none' }} onChange={(e) => { const f = e.target.files?.[0]; if (f) setFileName(f.name); }} disabled={processing} />
                    </label>
                  </div>

                  {fileName && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '12px 0', padding: '12px 14px', background: 'rgba(16,185,129,0.07)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 'var(--r-md)' }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text)' }}>{fileName}</span>
                      <button type="button" onClick={() => setFileName('')} style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-faint)', fontSize: '16px' }}>×</button>
                    </div>
                  )}

                  <div style={{ marginTop: '20px' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--text)', marginBottom: '6px' }}>Стандарт</label>
                    <input type="text" value="ГОСТ 7.32-2017" disabled className="form-input" />
                  </div>

                  <button
                    type="submit"
                    disabled={!canSubmit}
                    className="btn btn-primary btn-full btn-lg"
                    style={{ marginTop: '16px' }}
                  >
                    {processing ? (
                      <>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ animation: 'spin 0.8s linear infinite' }}>
                          <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                        </svg>
                        Форматируем...
                      </>
                    ) : 'Начать форматирование'}
                  </button>
                </form>
              </div>

              {/* Pipeline */}
              <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 'var(--r-xl)', padding: '28px' }}>
                <h3 style={{ fontSize: '1rem', marginBottom: '20px' }}>
                  {processing ? 'Обрабатываем документ...' : 'Что происходит внутри'}
                </h3>

                {processing && (
                  <div style={{ marginBottom: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '13px', fontWeight: '600' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Прогресс</span>
                      <span style={{ color: 'var(--color-primary)' }}>{progress}%</span>
                    </div>
                    <div className="progress-track">
                      <div className="progress-fill" style={{ width: `${progress}%` }} />
                    </div>
                  </div>
                )}

                <div>
                  {pipelineSteps.map((step, idx) => {
                    const state = !processing ? 'todo' : idx < stepIdx ? 'done' : idx === stepIdx ? 'active' : 'todo';
                    return (
                      <div key={step} className="pipeline-step">
                        <div className={`pipeline-dot ${state}`}>
                          {state === 'done' ? '✓' : state === 'active' ? '●' : String(idx + 1)}
                        </div>
                        <span style={{
                          fontSize: '13.5px',
                          color: state === 'done' ? 'var(--color-success)' : state === 'active' ? 'var(--color-primary)' : 'var(--text-muted)',
                          fontWeight: state === 'active' ? '600' : '400',
                        }}>
                          {step}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {!processing && (
                  <div style={{ marginTop: '20px', padding: '14px', background: 'var(--color-primary-light)', borderRadius: 'var(--r-md)', fontSize: '13px', color: 'var(--color-primary)' }}>
                    <strong>1 токен = 1 документ.</strong> Загрузите файл и нажмите «Начать форматирование».
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ─── DOCUMENTS ─── */}
        {tab === 'documents' && (
          <div>
            <div className="cabinet-header">
              <h2>Мои документы</h2>
              <p>Все отформатированные файлы доступны для скачивания</p>
            </div>

            <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 'var(--r-xl)', overflow: 'hidden' }}>
              {documents.length === 0 ? (
                <div style={{ padding: '64px 32px', textAlign: 'center' }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>📭</div>
                  <h3 style={{ fontSize: '1.0625rem', marginBottom: '8px' }}>Нет документов</h3>
                  <p style={{ fontSize: '14px', marginBottom: '20px' }}>Загрузите первый файл для форматирования</p>
                  <button onClick={() => setTab('upload')} className="btn btn-primary">
                    Загрузить файл
                  </button>
                </div>
              ) : (
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Документ</th>
                      <th>Статус</th>
                      <th>Дата</th>
                      <th>Действия</th>
                    </tr>
                  </thead>
                  <tbody>
                    {documents.map((doc) => (
                      <tr key={doc.id}>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ width: '34px', height: '34px', borderRadius: 'var(--r-md)', background: 'var(--color-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)', flexShrink: 0 }}>
                              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/>
                                <polyline points="13 2 13 9 20 9"/>
                              </svg>
                            </div>
                            <span style={{ fontWeight: '500', fontSize: '13.5px' }}>{doc.name}</span>
                          </div>
                        </td>
                        <td><span className="badge badge-success">✓ Готов</span></td>
                        <td style={{ color: 'var(--text-muted)', fontSize: '13px' }}>{doc.date}</td>
                        <td>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button className="btn btn-primary btn-sm">
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                <polyline points="7 10 12 15 17 10"/>
                                <line x1="12" y1="15" x2="12" y2="3"/>
                              </svg>
                              Скачать
                            </button>
                            <button
                              className="btn btn-ghost btn-sm"
                              onClick={() => setDocuments((prev) => prev.filter((d) => d.id !== doc.id))}
                            >
                              Удалить
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* ─── SETTINGS ─── */}
        {tab === 'settings' && (
          <div>
            <div className="cabinet-header">
              <h2>Настройки</h2>
              <p>Управление профилем и безопасностью</p>
            </div>

            <div style={{ display: 'grid', gap: '20px', maxWidth: '640px' }}>
              {/* Profile */}
              <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 'var(--r-xl)', padding: '28px' }}>
                <h3 style={{ fontSize: '1rem', marginBottom: '20px' }}>Профиль</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                  <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--color-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '800', fontSize: '22px', flexShrink: 0 }}>И</div>
                  <div>
                    <div style={{ fontWeight: '700', fontSize: '15px' }}>Иван Иванов</div>
                    <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Студент · Бесплатный тариф</div>
                  </div>
                </div>
                <div className="settings-fields">
                  <div className="form-group">
                    <label className="form-label">Имя</label>
                    <input type="text" className="form-input" defaultValue="Иван Иванов" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-input" defaultValue="ivan@mail.ru" />
                  </div>
                </div>
                <button className="btn btn-primary">Сохранить изменения</button>
              </div>

              {/* Security */}
              <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 'var(--r-xl)', padding: '28px' }}>
                <h3 style={{ fontSize: '1rem', marginBottom: '20px' }}>Безопасность</h3>
                <div className="form-group">
                  <label className="form-label">Текущий пароль</label>
                  <input type="password" className="form-input" placeholder="••••••••" />
                </div>
                <div className="form-group">
                  <label className="form-label">Новый пароль</label>
                  <input type="password" className="form-input" placeholder="••••••••" />
                </div>
                <div className="form-group">
                  <label className="form-label">Подтвердите пароль</label>
                  <input type="password" className="form-input" placeholder="••••••••" />
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button className="btn btn-primary">Обновить пароль</button>
                  <button className="btn btn-ghost">Отмена</button>
                </div>
              </div>

              {/* Danger zone */}
              <div style={{ background: 'rgba(239,68,68,0.04)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 'var(--r-xl)', padding: '24px' }}>
                <h3 style={{ fontSize: '1rem', color: 'var(--color-error)', marginBottom: '8px' }}>Опасная зона</h3>
                <p style={{ fontSize: '13.5px', marginBottom: '16px' }}>Удаление аккаунта необратимо. Все документы будут удалены.</p>
                <button className="btn btn-danger btn-sm">Удалить аккаунт</button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Mobile nav */}
      <MobileTabBar />

      {/* Logout modal */}
      {showLogout && (
        <div className="modal-overlay" onClick={() => setShowLogout(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div style={{ width: '52px', height: '52px', borderRadius: 'var(--r-lg)', background: 'rgba(239,68,68,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', color: 'var(--color-error)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
            </div>
            <h3 style={{ fontSize: '1.1875rem', marginBottom: '6px', marginTop: 0 }}>Выйти из аккаунта?</h3>
            <p style={{ fontSize: '14px', marginBottom: '28px' }}>Вы будете перенаправлены на главную страницу</p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button className="btn btn-ghost btn-full" onClick={() => setShowLogout(false)}>Отмена</button>
              <button className="btn btn-danger btn-full" onClick={handleLogout}>Выйти</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}

// ============================================================
//  SEGMENT PAGES (simplified)
// ============================================================

// ============================================================
//  LEAD FORM (Universities & Business)
// ============================================================

function LeadForm({ context }) {
  const [form, setForm] = useState({ name: '', org: '', contact: '', size: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setSent(true); setLoading(false); }, 1200);
  };

  if (sent) {
    return (
      <div style={{ textAlign: 'center', padding: '52px 24px' }}>
        <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'rgba(16,185,129,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '32px' }}>✅</div>
        <h3 style={{ marginBottom: '10px' }}>Заявка получена!</h3>
        <p style={{ fontSize: '15px', maxWidth: '360px', margin: '0 auto' }}>
          Наш менеджер свяжется с вами в течение 2 рабочих часов и предложит условия под ваши задачи.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div className="settings-fields">
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">Ваше имя и должность *</label>
          <input type="text" className="form-input"
            placeholder={context === 'uni' ? 'Проректор по учебной работе' : 'Руководитель / технический директор'}
            value={form.name} onChange={set('name')} required disabled={loading} />
        </div>
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">{context === 'uni' ? 'Название вуза *' : 'Название компании *'}</label>
          <input type="text" className="form-input"
            placeholder={context === 'uni' ? 'МГУ им. М.В. Ломоносова' : 'ООО «ТехСтрой»'}
            value={form.org} onChange={set('org')} required disabled={loading} />
        </div>
      </div>
      <div className="settings-fields">
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">Email или телефон для связи *</label>
          <input type="text" className="form-input" placeholder="+7 (999) 000-00-00 или email@org.ru"
            value={form.contact} onChange={set('contact')} required disabled={loading} />
        </div>
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">{context === 'uni' ? 'Кол-во ВКР в год (примерно)' : 'Размер команды / объём документов'}</label>
          <input type="text" className="form-input"
            placeholder={context === 'uni' ? '~500 работ в год' : '~20 сотрудников, ~200 документов'}
            value={form.size} onChange={set('size')} disabled={loading} />
        </div>
      </div>
      <div className="form-group" style={{ marginBottom: 0 }}>
        <label className="form-label">Расскажите о задаче (необязательно)</label>
        <textarea className="form-input" style={{ resize: 'vertical', minHeight: '100px' }}
          placeholder={context === 'uni'
            ? 'Нужна интеграция с Moodle, кастомные шаблоны кафедры химии...'
            : 'Нужна пакетная обработка через API, интеграция в 1С, отчёты по НИОКР...'}
          value={form.message} onChange={set('message')} disabled={loading} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
        <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
          {loading ? (
            <>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                style={{ animation: 'spin 0.8s linear infinite' }}>
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
              Отправляем...
            </>
          ) : 'Отправить — мы перезвоним'}
        </button>
        <p style={{ fontSize: '12.5px', color: 'var(--text-faint)', margin: 0 }}>
          Без спама. Связываемся в течение 2 рабочих часов.
        </p>
      </div>
    </form>
  );
}

// ============================================================
//  STUDENTS PAGE
// ============================================================

function StudentsPage() {
  const [openFaq, setOpenFaq] = useState(null);

  const pains = [
    { icon: '😰', text: 'Нормоконтролёр нашёл 20 ошибок форматирования и вернул работу' },
    { icon: '🕐', text: 'Потратил 5 часов на настройку стилей в Word — и всё равно неправильно' },
    { icon: '📏', text: 'Перепутал поля или шрифт — пришлось переносить текст заново' },
    { icon: '🔄', text: 'Сдаёт 3-й раз и каждый раз новые замечания по оформлению' },
  ];

  const features = [
    { icon: '⚡', title: 'За 30 секунд', desc: 'Не нужно разбираться в стилях Word. Загрузили — получили готовый результат.' },
    { icon: '📐', title: 'Точно по ГОСТ', desc: 'Поля 20/20/30/15 мм, TNR 14pt, интервал 1.5, отступ 1.25 см, нумерация с 3-й страницы.' },
    { icon: '📋', title: 'Авто-оглавление', desc: 'Формируется автоматически с точками-заполнителями и номерами страниц.' },
    { icon: '🔒', title: 'Конфиденциально', desc: 'Файлы зашифрованы. Удаляются через 24 часа. Никто не читает содержимое.' },
    { icon: '✅', title: 'Гарантия', desc: 'Если нормоконтролёр найдёт ошибки форматирования — вернём токен или переделаем.' },
    { icon: '💾', title: 'История файлов', desc: 'Все документы в личном кабинете. Скачивайте в любое время.' },
  ];

  const steps = [
    { num: '01', title: 'Загрузите DOCX или PDF', desc: 'Перетащите файл или нажмите кнопку. До 50 МБ, любой объём страниц.' },
    { num: '02', title: 'GOSTER форматирует', desc: 'Поля, шрифт, интервалы, отступы, оглавление, нумерация — всё по ГОСТ 7.32-2017.' },
    { num: '03', title: 'Скачайте и сдавайте', desc: 'Готовый документ в кабинете через 30–60 секунд. Без замечаний по оформлению.' },
  ];

  const studentFaqs = [
    { q: 'Влияет ли GOSTER на текст и содержание диплома?', a: 'Нет, только оформление. Мы меняем поля, шрифты, отступы, стили и оглавление. Ваш текст, цитаты, таблицы и рисунки остаются нетронутыми.' },
    { q: 'Что если у моей кафедры особые требования?', a: 'В большинстве случаев кафедральные требования основаны на ГОСТ 7.32-2017. Если есть специфика — напишите нам, поможем разобраться.' },
    { q: 'Как быстро обрабатывается большой диплом?', a: 'Средний диплом (80–120 страниц) форматируется за 30–60 секунд. Файлы до 50 МБ поддерживаются.' },
    { q: 'Что значит «гарантия возврата токена»?', a: 'Если нормоконтролёр найдёт замечания именно по форматированию — покажите нам, вернём токен или переделаем бесплатно. Без споров.' },
    { q: 'Нужно ли что-то устанавливать?', a: 'Нет. GOSTER работает в браузере на компьютере, планшете и смартфоне. Никаких плагинов и программ.' },
  ];

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, #0A0E27 0%, #1a1040 60%, #0F172A 100%)',
        padding: '120px 0 80px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div className="hero-orb-1" />
        <div className="hero-orb-2" />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '700px' }}>
            <div className="hero-badge" style={{ marginBottom: '24px' }}>
              <div className="hero-dot" />
              Для студентов
            </div>
            <h1 style={{ color: 'white', marginBottom: '20px' }}>
              Диплом по ГОСТ 7.32 —{' '}
              <span className="text-gradient-hero">готово за 30 секунд</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1.125rem', maxWidth: '520px', marginBottom: '36px' }}>
              Загрузите DOCX — автоматически получите работу, оформленную по всем требованиям.
              Поля, шрифты, интервалы, оглавление, нумерация. Без ошибок.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '56px' }}>
              <a href={routes.register} className="btn btn-white btn-lg">Попробовать бесплатно</a>
              <a href="#st-how" className="btn btn-glass btn-lg">Как это работает</a>
            </div>
            <div className="hero-stats">
              {[
                { num: '47 000+', label: 'студентов уже сдали' },
                { num: '98%', label: 'проходят нормоконтроль с первого раза' },
                { num: '30 сек', label: 'среднее время обработки' },
                { num: '100%', label: 'гарантия соответствия ГОСТ' },
              ].map((s) => (
                <div key={s.label}>
                  <div className="hero-stat-num">{s.num}</div>
                  <div className="hero-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pain points */}
      <section className="section-sm" style={{ background: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2>Узнаёте себя?</h2>
            <p style={{ marginTop: '8px' }}>Каждый студент хотя бы раз сталкивался с этим</p>
          </div>
          <div className="grid-2" style={{ maxWidth: '800px', margin: '0 auto' }}>
            {pains.map((p, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: '16px',
                padding: '20px 24px', background: 'var(--bg-alt)',
                borderRadius: 'var(--r-lg)', border: '1px solid var(--border)',
              }}>
                <span style={{ fontSize: '26px', flexShrink: 0 }}>{p.icon}</span>
                <p style={{ fontSize: '14.5px', margin: 0, color: 'var(--text)' }}>{p.text}</p>
              </div>
            ))}
          </div>
          <p style={{ textAlign: 'center', marginTop: '36px', fontSize: '1.0625rem', fontWeight: '700', color: 'var(--text)' }}>
            С GOSTER это в прошлом. Один файл — один результат.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section id="st-how" className="section" style={{ background: 'var(--bg-alt)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '520px', margin: '0 auto 52px' }}>
            <div className="badge badge-primary" style={{ marginBottom: '16px' }}>Просто</div>
            <h2>Три шага до готового диплома</h2>
          </div>
          <div className="grid-3">
            {steps.map((s) => (
              <div key={s.num} style={{
                textAlign: 'center', padding: '36px 28px',
                background: 'white', border: '1px solid var(--border)',
                borderRadius: 'var(--r-xl)', boxShadow: 'var(--shadow-xs)',
              }}>
                <div className="step-num">{s.num}</div>
                <h3 style={{ fontSize: '1.125rem', marginBottom: '10px' }}>{s.title}</h3>
                <p style={{ fontSize: '14.5px' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section" style={{ background: 'white' }}>
        <div className="container">
          <div style={{ maxWidth: '520px', marginBottom: '48px' }}>
            <div className="badge badge-primary" style={{ marginBottom: '16px' }}>Возможности</div>
            <h2>Всё что нужно для сдачи диплома</h2>
          </div>
          <div className="grid-3">
            {features.map((f) => (
              <div key={f.title} className="feature-card card-hover">
                <div className="feature-icon"><span style={{ fontSize: '22px' }}>{f.icon}</span></div>
                <h4 style={{ marginBottom: '8px' }}>{f.title}</h4>
                <p style={{ fontSize: '14px' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section" style={{ background: 'var(--bg-alt)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '480px', margin: '0 auto 48px' }}>
            <h2>Студенты уже сдали. И вы сдадите</h2>
          </div>
          <div className="grid-3">
            {TESTIMONIALS.map((t) => (
              <div key={t.id} className="testimonial-card">
                <div className="stars">{'★'.repeat(t.rating)}</div>
                <p style={{ fontSize: '14.5px', fontStyle: 'italic', margin: 0 }}>"{t.text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: 'auto' }}>
                  <div className="avatar">{t.author[0]}</div>
                  <div>
                    <div style={{ fontWeight: '700', fontSize: '14px', color: 'var(--text)' }}>{t.author}</div>
                    <div style={{ fontSize: '12.5px', color: 'var(--text-faint)' }}>{t.uni}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="section" style={{ background: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '520px', margin: '0 auto 48px' }}>
            <div className="badge badge-primary" style={{ marginBottom: '16px' }}>Тарифы</div>
            <h2>Начните бесплатно</h2>
            <p style={{ marginTop: '12px' }}>Первая проверка всегда бесплатно. Платите только за форматирование.</p>
          </div>
          <div className="grid-2" style={{ maxWidth: '680px', margin: '0 auto', gap: '24px' }}>
            <div className="pricing-card">
              <span className="badge badge-success" style={{ marginBottom: '12px' }}>Бесплатно</span>
              <div className="pricing-price-free" style={{ fontWeight: '900', letterSpacing: '-0.04em', color: 'var(--text)' }}>0 ₽</div>
              <p style={{ fontSize: '13.5px', marginBottom: '24px' }}>Проверка ошибок</p>
              {['Полный анализ форматирования', 'Список всех ошибок по ГОСТ', '∞ бесплатных проверок', 'Без регистрации'].map((f) => (
                <div key={f} className="pricing-feat">
                  <div className="pricing-check">
                    <svg width="10" height="10" viewBox="0 0 12 12"><polyline points="1.5,6.5 4.5,9.5 10.5,2.5" fill="none" stroke="currentColor" strokeWidth="2" /></svg>
                  </div>
                  {f}
                </div>
              ))}
              <a href={routes.register} className="btn btn-outline btn-lg btn-full" style={{ marginTop: '24px' }}>Начать бесплатно</a>
            </div>
            <div className="pricing-card featured">
              <div className="pricing-badge">ПОПУЛЯРНЫЙ ВЫБОР</div>
              <span className="badge badge-primary" style={{ marginBottom: '12px' }}>Студент</span>
              <div className="pricing-price">499 ₽</div>
              <p style={{ fontSize: '13.5px', marginBottom: '24px' }}>за форматирование</p>
              {[
                'Полное форматирование по ГОСТ 7.32',
                'Times New Roman, поля, интервалы',
                'Авто-оглавление с нумерацией',
                'Стили заголовков всех уровней',
                'Скачивание DOCX в кабинете',
                'Гарантия — вернём токен при ошибках',
              ].map((f) => (
                <div key={f} className="pricing-feat">
                  <div className="pricing-check">
                    <svg width="10" height="10" viewBox="0 0 12 12"><polyline points="1.5,6.5 4.5,9.5 10.5,2.5" fill="none" stroke="currentColor" strokeWidth="2" /></svg>
                  </div>
                  {f}
                </div>
              ))}
              <a href={routes.register} className="btn btn-primary btn-lg btn-full" style={{ marginTop: '24px' }}>Отформатировать диплом</a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" style={{ background: 'var(--bg-alt)' }}>
        <div className="container" style={{ maxWidth: '720px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2>Частые вопросы</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {studentFaqs.map((item, i) => (
              <div key={i} className={`faq-item${openFaq === i ? ' open' : ''}`}>
                <button className="faq-btn" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  {item.q}
                  <div className="faq-chevron">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </button>
                {openFaq === i && <div className="faq-answer">{item.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="hero-orb-1" style={{ opacity: 0.5 }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <h2 style={{ color: 'white', marginBottom: '16px' }}>Сдайте диплом с первого раза</h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.0625rem', maxWidth: '460px', margin: '0 auto 36px' }}>
            Первая проверка бесплатно. Платите только когда убедитесь, что это работает.
          </p>
          <a href={routes.register} className="btn btn-white btn-xl">Попробовать бесплатно</a>
        </div>
      </section>

      <Footer />
    </>
  );
}

// ============================================================
//  UNIVERSITIES PAGE
// ============================================================

function UniversitiesPage() {
  const benefits = [
    { icon: '📉', title: 'Нагрузка на нормоконтролёров −60%', desc: 'Типовые ошибки оформления отсеиваются до проверки. Нормоконтролёры занимаются содержанием — а не полями.' },
    { icon: '🎨', title: 'Кастомные шаблоны', desc: 'Под требования вашего вуза, кафедры или отдельной программы. Без ограничений на число шаблонов.' },
    { icon: '🔗', title: 'API и LMS интеграция', desc: 'Встраивается в Moodle, Blackboard, Canvas через REST API. Студенты работают в привычном интерфейсе.' },
    { icon: '📊', title: 'Аналитика и отчётность', desc: 'Статистика ошибок по кафедрам, факультетам, программам. Видите слабые места и улучшаете стандарты.' },
    { icon: '🏛️', title: 'Любой масштаб', desc: 'От 50 до 50 000+ работ в год. Нагрузка масштабируется автоматически без доп. затрат с вашей стороны.' },
    { icon: '🛡️', title: 'SLA и поддержка', desc: 'Персональный менеджер, SLA 99.9%, техническая документация, обучение сотрудников, поддержка 24/7.' },
  ];

  const process = [
    { num: '01', title: 'Подключение и настройка', desc: 'Загружаем ваш шаблон оформления. Настраиваем под требования факультетов. Подключаем LMS при необходимости.' },
    { num: '02', title: 'Студент загружает работу', desc: 'Через кабинет GOSTER или прямо из LMS. Привычный интерфейс — не нужно обучать студентов.' },
    { num: '03', title: 'Автоматическое форматирование', desc: 'Система применяет требования ГОСТ и шаблон вашего вуза за 30–60 секунд без участия нормоконтролёра.' },
    { num: '04', title: 'Нормоконтролёр проверяет суть', desc: 'Вместо исправления полей и шрифтов — проверка структуры, аргументации, источников. Работа ускоряется в 3×.' },
  ];

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, #0A0E27 0%, #1a1040 60%, #0F172A 100%)',
        padding: '120px 0 80px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div className="hero-orb-1" />
        <div className="hero-orb-2" />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '700px' }}>
            <div className="hero-badge" style={{ marginBottom: '24px' }}>
              <div className="hero-dot" />
              Для университетов
            </div>
            <h1 style={{ color: 'white', marginBottom: '20px' }}>
              Единый ГОСТ для всего потока —{' '}
              <span className="text-gradient-hero">автоматически</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1.125rem', maxWidth: '560px', marginBottom: '36px' }}>
              Снижаем нагрузку на нормоконтролёров на 60%. Кастомные шаблоны, API интеграция в LMS,
              аналитика по ошибкам. Условия — индивидуально под ваш вуз.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a href="#uni-form" className="btn btn-white btn-lg">Получить предложение</a>
              <a href="#uni-process" className="btn btn-glass btn-lg">Как работает</a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div style={{ background: 'white', borderBottom: '1px solid var(--border)', padding: '32px 0' }}>
        <div className="container">
          <div className="stats-bar-grid">
            {[
              { num: '60%', label: 'снижение нагрузки на нормоконтролёров' },
              { num: '3×', label: 'быстрее проходит нормоконтроль' },
              { num: '50+', label: 'вузов уже работают с GOSTER' },
              { num: '99.9%', label: 'SLA uptime' },
            ].map((s) => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div className="stat-num">{s.num}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Problem vs Solution */}
      <section className="section" style={{ background: 'var(--bg-alt)' }}>
        <div className="container">
          <div className="check-grid" style={{ gap: '48px', alignItems: 'center' }}>
            <div>
              <div className="badge badge-error" style={{ marginBottom: '16px' }}>Типичная ситуация</div>
              <h2 style={{ marginBottom: '20px' }}>Нормоконтролёр тратит 80% времени на поля и шрифты</h2>
              <p style={{ fontSize: '1rem', marginBottom: '24px' }}>
                Студенты сдают работы с одинаковыми ошибками — неправильные отступы, Arial вместо Times New Roman,
                неверные поля. Нормоконтролёр возвращает работу снова и снова.
              </p>
              {[
                'Поток ВКР растёт — штат не масштабируется',
                'Одни и те же замечания — каждый семестр',
                'Задержки из-за оформления, а не содержания',
                'Студенты раздражены, нормоконтролёры перегружены',
              ].map((t, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '7px 0' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-error)', flexShrink: 0 }} />
                  <p style={{ margin: 0, fontSize: '14.5px' }}>{t}</p>
                </div>
              ))}
            </div>
            <div style={{
              background: 'white', borderRadius: 'var(--r-xl)', padding: '36px',
              border: '1px solid var(--border)', boxShadow: 'var(--shadow-md)',
            }}>
              <div className="badge badge-success" style={{ marginBottom: '16px' }}>С GOSTER</div>
              <h3 style={{ marginBottom: '20px', fontSize: '1.2rem' }}>Нормоконтролёр проверяет только суть</h3>
              {[
                'Оформление проверяется автоматически до сдачи',
                'Студент получает отформатированный файл',
                'Нормоконтролёр видит только содержательные правки',
                'Процесс ускоряется в 3 раза',
              ].map((t, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '10px 0', borderBottom: i < 3 ? '1px solid var(--bg-alt)' : 'none',
                }}>
                  <div style={{
                    width: '22px', height: '22px', borderRadius: '50%',
                    background: 'rgba(16,185,129,0.12)', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', flexShrink: 0, color: 'var(--color-success)', fontSize: '12px',
                  }}>✓</div>
                  <p style={{ margin: 0, fontSize: '14.5px', color: 'var(--text)' }}>{t}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section" style={{ background: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '520px', margin: '0 auto 52px' }}>
            <div className="badge badge-primary" style={{ marginBottom: '16px' }}>Возможности</div>
            <h2>Всё для образовательного учреждения</h2>
          </div>
          <div className="grid-3">
            {benefits.map((b) => (
              <div key={b.title} className="feature-card card-hover">
                <div className="feature-icon"><span style={{ fontSize: '22px' }}>{b.icon}</span></div>
                <h4 style={{ marginBottom: '8px' }}>{b.title}</h4>
                <p style={{ fontSize: '14px' }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="uni-process" className="section" style={{ background: 'var(--bg-alt)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '520px', margin: '0 auto 52px' }}>
            <div className="badge badge-primary" style={{ marginBottom: '16px' }}>Процесс</div>
            <h2>Как это работает для вуза</h2>
          </div>
          <div className="grid-2" style={{ maxWidth: '900px', margin: '0 auto', gap: '24px' }}>
            {process.map((s) => (
              <div key={s.num} style={{
                background: 'white', border: '1px solid var(--border)',
                borderRadius: 'var(--r-xl)', padding: '32px',
              }}>
                <div className="step-num" style={{ fontSize: '3.5rem' }}>{s.num}</div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>{s.title}</h3>
                <p style={{ fontSize: '14px' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead form */}
      <section id="uni-form" className="section" style={{ background: 'white' }}>
        <div className="container" style={{ maxWidth: '780px' }}>
          <div style={{ textAlign: 'center', marginBottom: '44px' }}>
            <div className="badge badge-primary" style={{ marginBottom: '16px' }}>Индивидуальные условия</div>
            <h2>Получите предложение для вашего вуза</h2>
            <p style={{ marginTop: '12px', fontSize: '1.0625rem' }}>
              Цены формируются под размер потока, набор функций и необходимость интеграции.
              Заполните форму — менеджер свяжется и подберёт оптимальный вариант.
            </p>
          </div>
          <div style={{
            background: 'var(--bg-alt)', border: '1px solid var(--border)',
            borderRadius: 'var(--r-xl)', padding: '40px',
          }}>
            <LeadForm context="uni" />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

// ============================================================
//  BUSINESS PAGE
// ============================================================

function BusinessPage() {
  const useCases = [
    { icon: '🔬', title: 'НИОКР и НИР', desc: 'Отчёты по научно-исследовательским работам по ГОСТ 7.32-2017.' },
    { icon: '📋', title: 'Технические задания', desc: 'ТЗ и проектная документация по ГОСТ 2.105 (ЕСКД).' },
    { icon: '🏗️', title: 'Тендерная документация', desc: 'Описание работ, технические задания, отчёты по госзакупкам.' },
    { icon: '📊', title: 'Проектные отчёты', desc: 'Технические отчёты, акты, заключения по стандартам ГОСТ.' },
    { icon: '🎓', title: 'Корпоративное обучение', desc: 'Учебные материалы, методические пособия, регламенты.' },
    { icon: '📁', title: 'Массовый документооборот', desc: 'Пакетная обработка сотен документов через API без ручного труда.' },
  ];

  const features = [
    { icon: '🔌', title: 'REST API', desc: 'Полноценный REST API с документацией. Интеграция в 1С, SharePoint, любую СЭД за несколько часов.' },
    { icon: '⚡', title: 'Пакетная обработка', desc: 'Сотни документов параллельно. Очередь с приоритетами, webhook-уведомления о завершении.' },
    { icon: '📝', title: 'Несколько стандартов', desc: 'ГОСТ 7.32-2017, ГОСТ 2.105 (ЕСКД), ГОСТ Р 7.0.11 (диссертации). Один сервис — все стандарты.' },
    { icon: '👥', title: 'Командный доступ', desc: 'До 50+ пользователей. Управление ролями, отделами и правами доступа централизованно.' },
    { icon: '📈', title: 'Отчётность', desc: 'Детальная аналитика по расходованию, активности пользователей, обработанным документам.' },
    { icon: '🤝', title: 'Персональный менеджер', desc: 'Выделенный менеджер, SLA 99.9%, поддержка в рабочие часы, оперативное решение задач.' },
  ];

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, #0A0E27 0%, #1a1040 60%, #0F172A 100%)',
        padding: '120px 0 80px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div className="hero-orb-1" />
        <div className="hero-orb-2" />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '720px' }}>
            <div className="hero-badge" style={{ marginBottom: '24px' }}>
              <div className="hero-dot" />
              Для компаний
            </div>
            <h1 style={{ color: 'white', marginBottom: '20px' }}>
              Техдокументация по ГОСТ —{' '}
              <span className="text-gradient-hero">автоматически в ваших процессах</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1.125rem', maxWidth: '580px', marginBottom: '36px' }}>
              REST API, пакетная обработка, несколько стандартов ГОСТ. Встраивается в 1С, SharePoint и любую СЭД.
              Условия — индивидуально под ваш объём и задачи.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a href="#biz-form" className="btn btn-white btn-lg">Обсудить интеграцию</a>
              <a href="#biz-usecases" className="btn btn-glass btn-lg">Примеры использования</a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div style={{ background: 'white', borderBottom: '1px solid var(--border)', padding: '32px 0' }}>
        <div className="container">
          <div className="stats-bar-grid">
            {[
              { num: '200+', label: 'компаний используют API' },
              { num: '3 ГОСТ', label: 'стандарта поддерживается' },
              { num: '99.9%', label: 'SLA uptime' },
              { num: '< 60 сек', label: 'на документ в пакете' },
            ].map((s) => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div className="stat-num">{s.num}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Use cases */}
      <section id="biz-usecases" className="section" style={{ background: 'var(--bg-alt)' }}>
        <div className="container">
          <div style={{ maxWidth: '520px', marginBottom: '52px' }}>
            <div className="badge badge-primary" style={{ marginBottom: '16px' }}>Применение</div>
            <h2>Для каких документов</h2>
            <p style={{ marginTop: '12px', fontSize: '1.0625rem' }}>
              GOSTER форматирует любые документы, которые требуют соответствия ГОСТ.
            </p>
          </div>
          <div className="grid-3">
            {useCases.map((u) => (
              <div key={u.title} style={{
                background: 'white', border: '1px solid var(--border)',
                borderRadius: 'var(--r-xl)', padding: '28px',
                transition: 'all var(--t)',
              }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
              >
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>{u.icon}</div>
                <h4 style={{ marginBottom: '8px' }}>{u.title}</h4>
                <p style={{ fontSize: '14px' }}>{u.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section" style={{ background: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '520px', margin: '0 auto 52px' }}>
            <div className="badge badge-primary" style={{ marginBottom: '16px' }}>Корпоративные функции</div>
            <h2>Всё для команды и интеграции</h2>
          </div>
          <div className="grid-3">
            {features.map((f) => (
              <div key={f.title} className="feature-card card-hover">
                <div className="feature-icon"><span style={{ fontSize: '22px' }}>{f.icon}</span></div>
                <h4 style={{ marginBottom: '8px' }}>{f.title}</h4>
                <p style={{ fontSize: '14px' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* API teaser */}
      <section className="section-sm" style={{ background: 'var(--bg-alt)' }}>
        <div className="container">
          <div className="check-grid" style={{ gap: '56px', alignItems: 'center' }}>
            <div>
              <div className="badge badge-primary" style={{ marginBottom: '16px' }}>REST API</div>
              <h2 style={{ marginBottom: '16px' }}>Встраивается в ваш процесс</h2>
              <p style={{ fontSize: '1rem', marginBottom: '24px' }}>
                Отправьте DOCX на наш эндпоинт — получите отформатированный файл.
                Асинхронная обработка, webhooks, очередь приоритетов.
              </p>
              {[
                'OpenAPI 3.0 документация + Sandbox',
                'SDK для Python, Node.js, PHP',
                'Webhook-уведомления о статусе',
                'Rate-limit и retry политики',
                'Тестовая среда без лимитов',
              ].map((t, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '7px 0' }}>
                  <div style={{
                    width: '20px', height: '20px', borderRadius: '50%',
                    background: 'var(--color-primary-light)', display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, color: 'var(--color-primary)', fontSize: '11px',
                  }}>✓</div>
                  <p style={{ margin: 0, fontSize: '14px', color: 'var(--text)' }}>{t}</p>
                </div>
              ))}
            </div>
            <div style={{
              background: '#0F172A', borderRadius: 'var(--r-xl)', padding: '28px',
              fontFamily: 'monospace', fontSize: '13px', lineHeight: '1.75', color: '#94A3B8',
              border: '1px solid rgba(255,255,255,0.07)',
            }}>
              <div style={{ color: '#64748B', marginBottom: '12px', fontSize: '11px', letterSpacing: '0.05em' }}>POST /api/v1/format</div>
              <div><span style={{ color: '#818CF8' }}>{'{'}</span></div>
              <div style={{ paddingLeft: '18px' }}>
                <span style={{ color: '#7DD3FC' }}>"standard"</span><span>: </span>
                <span style={{ color: '#86EFAC' }}>"GOST_7.32"</span><span>,</span>
              </div>
              <div style={{ paddingLeft: '18px' }}>
                <span style={{ color: '#7DD3FC' }}>"file_b64"</span><span>: </span>
                <span style={{ color: '#86EFAC' }}>"&lt;base64&gt;"</span><span>,</span>
              </div>
              <div style={{ paddingLeft: '18px' }}>
                <span style={{ color: '#7DD3FC' }}>"webhook_url"</span><span>: </span>
                <span style={{ color: '#86EFAC' }}>"https://..."</span>
              </div>
              <div><span style={{ color: '#818CF8' }}>{'}'}</span></div>
              <div style={{ margin: '14px 0 6px', color: '#64748B', fontSize: '11px' }}>← 202 Accepted</div>
              <div><span style={{ color: '#818CF8' }}>{'{'}</span></div>
              <div style={{ paddingLeft: '18px' }}>
                <span style={{ color: '#7DD3FC' }}>"job_id"</span><span>: </span>
                <span style={{ color: '#86EFAC' }}>"fmt_a3b9c2d1"</span><span>,</span>
              </div>
              <div style={{ paddingLeft: '18px' }}>
                <span style={{ color: '#7DD3FC' }}>"status"</span><span>: </span>
                <span style={{ color: '#86EFAC' }}>"processing"</span>
              </div>
              <div><span style={{ color: '#818CF8' }}>{'}'}</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* Lead form */}
      <section id="biz-form" className="section" style={{ background: 'white' }}>
        <div className="container" style={{ maxWidth: '780px' }}>
          <div style={{ textAlign: 'center', marginBottom: '44px' }}>
            <div className="badge badge-primary" style={{ marginBottom: '16px' }}>Индивидуальные условия</div>
            <h2>Обсудим интеграцию под ваши задачи</h2>
            <p style={{ marginTop: '12px', fontSize: '1.0625rem' }}>
              Расскажите о своём проекте — подберём объём, стандарты и стоимость.
              Ответим в течение 2 рабочих часов.
            </p>
          </div>
          <div style={{
            background: 'var(--bg-alt)', border: '1px solid var(--border)',
            borderRadius: 'var(--r-xl)', padding: '40px',
          }}>
            <LeadForm context="biz" />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

// ============================================================
//  APP ROUTER
// ============================================================

export default function App() {
  const [route, setRoute] = useState(getRoute());

  useEffect(() => {
    const onChange = () => setRoute(getRoute());
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  if (route === routes.cabinet) {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.hash = routes.login;
      return null;
    }
    return <Cabinet />;
  }

  if (route === routes.login) return <LoginPage />;
  if (route === routes.register) return <Register onSuccess={() => { window.location.hash = routes.login; }} />;
  if (route === routes.students) return <StudentsPage />;
  if (route === routes.business) return <BusinessPage />;
  if (route === routes.universities) return <UniversitiesPage />;
  return <Landing />;
}
