'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  BrainCircuit,
  CalendarClock,
  Check,
  Cloud,
  Copy,
  Download,
  Eye,
  FileText,
  Github,
  Globe,
  Keyboard,
  Mic,
  Monitor,
  Presentation,
  Sparkles,
  Wrench,
} from 'lucide-react';
import Header from '@/components/header';
import Footer from '@/components/footer';

const repoUrl = 'https://github.com/tripleguard/Vera';
const releasesUrl = `${repoUrl}/releases`;
const docsUrl = 'https://docs.agentvera.ru/';
const cloneCommand = 'git clone https://github.com/tripleguard/Vera.git';

const capabilities = [
  {
    icon: Mic,
    title: 'Голос и диалог',
    text: 'Sherpa-ONNX работает офлайн, Supertonic ставится отдельно, а аудиоустройства меняются без перезапуска.',
    meta: 'Sherpa-ONNX · Supertonic',
  },
  {
    icon: Monitor,
    title: 'Управление Windows',
    text: 'Запуск приложений, окна, громкость, яркость, музыка и питание, плюс управление виджетом через системный трей.',
    meta: 'Приложения · окна · система',
  },
  {
    icon: BrainCircuit,
    title: 'Локальная память',
    text: 'Факты, предпочтения и проекты хранятся на компьютере и находятся гибридным поиском.',
    meta: 'BM25 · SQLite · JSON',
  },
  {
    icon: FileText,
    title: 'Файлы и документы',
    text: 'Поиск файлов, drag-and-drop, чтение PDF, DOCX, XLSX, PPTX, кода и других форматов.',
    meta: 'PDF · DOCX · XLSX · PPTX',
  },
  {
    icon: Wrench,
    title: 'Tools и Skills',
    text: 'Интерпретатор Python, веб-поиск и локальные инструкции для специализированных сценариев.',
    meta: 'Python · Skills · Web',
  },
  {
    icon: Presentation,
    title: 'Создание материалов',
    text: 'Презентации, отчёты, статьи и текстовые документы с сохранением готового файла.',
    meta: 'PPTX · отчёты · документы',
  },
  {
    icon: CalendarClock,
    title: 'Задачи по расписанию',
    text: 'Таймеры, напоминания и периодические действия, которыми можно управлять голосом или в GUI.',
    meta: 'Таймеры · расписание',
  },
  {
    icon: Keyboard,
    title: 'Полноценный текстовый режим',
    text: 'Чат работает без микрофона, STT и Supertonic, а интерфейс отдельно показывает состояние каждого компонента.',
    meta: 'Без микрофона и TTS',
  },
  {
    icon: Globe,
    title: 'Веб и внешние LLM',
    text: 'Brave Search с fallback на DuckDuckGo, погода по городу из памяти, а также Ollama и LM Studio.',
    meta: 'Brave · DuckDuckGo · Ollama',
  },
  {
    icon: Eye,
    title: 'Мультимодальность',
    text: 'Изображения и скриншоты можно отправлять вместе с текстом для анализа локальной vision-моделью.',
    meta: 'Текст + изображение',
  },
  {
    icon: CalendarClock,
    title: 'Продуктивность',
    text: 'Таймеры, периодические задачи, заметки, чек-листы и холст живут рядом в интерфейсе.',
    meta: 'Заметки · чек-листы · canvas',
  },
  {
    icon: Sparkles,
    title: 'Надёжность',
    text: 'Диагностика LLM, TTS, STT и audio, обновление llama.cpp из GUI, автоперезапуск backend и защищённый IPC.',
    meta: 'IPC · status · restart',
  },
];

const localStack = [
  ['Распознавание', 'Sherpa-ONNX', 'на устройстве'],
  ['Модель', 'GGUF / Ollama', 'ваш выбор'],
  ['Голос', 'Supertonic', 'необязательно'],
  ['Память', 'SQLite + JSON', 'на устройстве'],
];

export default function Home() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.12 },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  async function handleCopy() {
    await navigator.clipboard.writeText(cloneCommand);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <section className="hero-surface relative overflow-hidden border-b border-border pt-16">
          <div className="hero-glow" aria-hidden="true" />
          <div className="container relative z-10 mx-auto grid min-h-[calc(100vh-4rem)] items-center gap-16 px-5 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:py-24">
            <div className="hero-copy animate-fade-up">
              <p className="hero-motto">veritas localis</p>
              <h1>
                Ваш компьютер.<br />
                <span>Ваши данные.</span><br />
                Ваша Vera.
              </h1>
              <p className="hero-lead">
                Голосовой и текстовый AI-агент для Windows, который слышит, помнит и действует.
                Без обязательного облака и без чужого доступа к вашим данным.
              </p>

              <div className="hero-actions animate-fade-up-delayed">
                <Link className="button button-primary" href={releasesUrl}>
                  <Download className="h-4 w-4" />
                  Скачать для Windows
                </Link>
                <Link className="button" href={repoUrl} target="_blank">
                  <Github className="h-4 w-4" />
                  GitHub
                </Link>
                <Link className="text-link" href={docsUrl}>
                  Документация
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="hero-facts animate-fade-up-soft">
                <span>Windows 10/11</span>
                <span>Open source</span>
                <span>146 тестов</span>
              </div>
            </div>

            <div className="product-stage animate-fade-up-delayed" aria-label="Предпросмотр интерфейса Vera">
              <div className="product-halo" aria-hidden="true" />
              <div className="product-window">
                <div className="window-bar">
                  <div className="window-controls"><i /><i /><i /></div>
                  <span>vera://workspace/today</span>
                  <span className="window-version">1.1.2</span>
                </div>
                <div className="preview-app">
                  <aside className="preview-rail" aria-hidden="true">
                    <img src="/vera.svg" alt="" width="24" height="24" />
                    <span className="rail-item is-active"><Sparkles /></span>
                    <span className="rail-item"><BrainCircuit /></span>
                    <span className="rail-item"><FileText /></span>
                    <span className="rail-item rail-bottom"><Wrench /></span>
                  </aside>
                  <div className="preview-main">
                    <div className="preview-header">
                      <div>
                        <strong>Сегодня</strong>
                        <span>Личная сессия</span>
                      </div>
                      <span className="preview-online"><i /> локально</span>
                    </div>
                    <div className="preview-conversation">
                      <div className="preview-user">
                        Собери краткую сводку по проекту Vera и открой последние заметки.
                      </div>
                      <div className="preview-vera">
                        <span className="preview-avatar"><img src="/vera.svg" alt="" width="18" height="18" /></span>
                        <div>
                          <strong>Vera</strong>
                          <p>Нашла три заметки и текущий README. В проекте 146 тестов, последнее обновление — версия 1.1.2.</p>
                        </div>
                      </div>
                      <div className="preview-tool">
                        <span><Check className="h-4 w-4" /> Заметки открыты</span>
                        <small>на этом компьютере</small>
                      </div>
                    </div>
                    <div className="preview-input">
                      <span>Спросите Vera...</span>
                      <span className="preview-mic"><Mic className="h-4 w-4" /></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="section-editorial border-b border-border py-24 sm:py-32">
          <div className="container mx-auto px-5">
            <div className="editorial-heading reveal-block" data-reveal>
              <div>
                <p className="section-kicker">Возможности</p>
                <h2>Не чат с кнопками.<br />Полноценный агент.</h2>
              </div>
              <p>
                Vera соединяет локальную модель, память и системные инструменты в одном
                приложении. Нужные функции рядом, но не мешают обычному разговору.
              </p>
            </div>

            <div className="features-showcase mt-16">
              {capabilities.map(({ icon: Icon, title, text, meta }, index) => (
                <article
                  className={`feature-card reveal-block ${index < 2 ? 'feature-card-wide' : ''}`}
                  data-reveal
                  key={title}
                  style={{ transitionDelay: `${Math.min(index, 5) * 40}ms` }}
                >
                  <div className="feature-icon"><Icon className="h-5 w-5" /></div>
                  <div className="feature-copy">
                    <h3>{title}</h3>
                    <p>{text}</p>
                    <span>{meta}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="local" className="privacy-section border-b border-border py-24 sm:py-32">
          <div className="container mx-auto grid gap-16 px-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div className="privacy-copy reveal-block" data-reveal>
              <p className="section-kicker">Приватность</p>
              <h2>Интернет — исключение, а не условие.</h2>
              <p>
                Распознавание речи, модель и память могут оставаться на вашем компьютере.
                Сеть подключается только для явно сетевых задач или выбранного вами внешнего LLM.
              </p>
              <div className="privacy-mark">
                <Cloud className="h-5 w-5" />
                <span><strong>0</strong> обязательных облачных сервисов</span>
              </div>
            </div>

            <div className="local-stack reveal-block" data-reveal>
              {localStack.map(([label, technology, mode]) => (
                <div className="stack-row" key={label}>
                  <span>{label}</span>
                  <strong>{technology}</strong>
                  <small>{mode}</small>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="start" className="start-section py-20 sm:py-28">
          <div className="container mx-auto px-5">
            <div className="start-panel reveal-block" data-reveal>
              <div className="start-copy">
                <p className="section-kicker">Начать работу</p>
                <h2>Открытая. Бесплатная.<br />Ваша.</h2>
                <p>Скачайте готовую сборку для Windows или запустите Vera из исходников.</p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link className="button button-primary" href={releasesUrl}>Скачать релиз</Link>
                  <Link className="button button-light" href={docsUrl}>Открыть документацию</Link>
                </div>
              </div>

              <div className="start-terminal">
                <div className="terminal-label"><span>PowerShell</span></div>
                <div className="clone-command">
                  <span className="terminal-prompt">›</span>
                  <span className="clone-command-text">{cloneCommand}</span>
                </div>
                <button className="copy-button" onClick={handleCopy} aria-label="Копировать git clone" type="button">
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied ? 'Скопировано' : 'Скопировать'}
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
