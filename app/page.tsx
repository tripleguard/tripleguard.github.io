'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  BrainCircuit,
  CalendarClock,
  Check,
  Copy,
  Download,
  Eye,
  FileText,
  Github,
  Globe,
  Lock,
  Mic,
  Monitor,
  Presentation,
  Send,
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
    text: 'Оффлайн-распознавание Sherpa-ONNX, локальный голос Lily и возможность прервать ответ словом «Вера».',
  },
  {
    icon: Monitor,
    title: 'Управление Windows',
    text: 'Запуск приложений, работа с окнами, громкостью, яркостью, музыкой, скриншотами и питанием.',
  },
  {
    icon: BrainCircuit,
    title: 'Локальная память',
    text: 'Факты, предпочтения и проекты хранятся на компьютере и находятся гибридным поиском.',
  },
  {
    icon: FileText,
    title: 'Файлы и документы',
    text: 'Поиск файлов, drag-and-drop, чтение PDF, DOCX, XLSX, PPTX, кода и других форматов.',
  },
  {
    icon: Wrench,
    title: 'Tools и Skills',
    text: 'Интерпретатор Python, веб-поиск и локальные инструкции для специализированных сценариев.',
  },
  {
    icon: Presentation,
    title: 'Создание материалов',
    text: 'Презентации, отчеты, статьи и текстовые документы с сохранением готового файла.',
  },
  {
    icon: CalendarClock,
    title: 'Задачи по расписанию',
    text: 'Таймеры, напоминания и периодические действия, которыми можно управлять голосом или в GUI.',
  },
  {
    icon: Send,
    title: 'Telegram-режим',
    text: 'Работа через Saved Messages: сообщения, файлы и генерация документов вдали от компьютера.',
  },
  {
    icon: Globe,
    title: 'Веб и внешние LLM',
    text: 'Brave Search с fallback на DuckDuckGo, а также подключение Ollama и LM Studio.',
  },
  {
    icon: Eye,
    title: 'Мультимодальность',
    text: 'Изображения и скриншоты можно отправлять вместе с текстом для анализа локальной vision-моделью.',
  },
];

export default function Home() {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(cloneCommand);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <section className="hero-grid relative flex min-h-[92vh] items-center overflow-hidden border-b border-border pt-24">
          <div className="orb orb-one" />
          <div className="orb orb-two" />
          <div className="container relative z-10 mx-auto px-5 py-20">
            <div className="mx-auto max-w-5xl text-center">
              <div className="hero-group animate-fade-up">
                <h1 className="mx-auto max-w-4xl text-4xl font-bold leading-[1.05] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
                  Ваш компьютер.
                  <br />
                  <span className="text-accent">Ваши данные.</span>
                  <br />
                  Ваша Vera.
                </h1>
                <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                  Голосовой AI-агент, который слышит, помнит и действует. Распознавание речи,
                  языковая модель и синтез голоса работают локально, без обязательного облака.
                </p>
              </div>

              <div className="hero-group animate-fade-up-delayed mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                <Link className="button button-primary" href={releasesUrl}>
                  <Download className="h-4 w-4" />
                  Скачать для Windows
                </Link>
                <Link className="button" href={repoUrl} target="_blank">
                  <Github className="h-4 w-4" />
                  GitHub
                </Link>
                <Link className="button button-ghost" href={docsUrl}>
                  Документация
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="hero-group animate-fade-up-soft mt-9 flex flex-wrap justify-center gap-x-7 gap-y-3 text-xs text-dim">
                <span>Windows 10/11 x64</span>
                <span>Python 3.10+</span>
                <span>Node.js 20.19+</span>
                <span>52 теста</span>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="section-dark border-b border-border py-24">
          <div className="container mx-auto px-5">
            <div className="section-heading animate-fade-up-soft">
              <div>
                <p className="section-kicker">[ возможности ]</p>
                <h2>Один агент. Много способов помочь.</h2>
              </div>
              <p>
                Vera объединяет голосовой интерфейс, локальную LLM, инструменты и управление
                системой в одном desktop-приложении.
              </p>
            </div>
            <div className="mt-14 grid md:grid-cols-2 xl:grid-cols-3">
              {capabilities.map(({ icon: Icon, title, text }, index) => (
                <article className="feature-card reveal-card" key={title} style={{ animationDelay: `${index * 70}ms` }}>
                  <div className="mb-8 flex items-start justify-between">
                    <Icon className="h-6 w-6 text-accent" />
                    <span className="text-xs text-dim">{String(index + 1).padStart(2, '0')}</span>
                  </div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="local" className="border-b border-border py-24">
          <div className="container mx-auto grid gap-14 px-5 lg:grid-cols-2 lg:items-center">
            <div className="animate-fade-left">
              <p className="section-kicker">[ локально и под контролем ]</p>
              <h2 className="mt-4 max-w-xl text-3xl font-bold tracking-[-0.04em] sm:text-5xl">
                Локальная по умолчанию. Подключаемая, когда нужно.
              </h2>
              <p className="mt-7 max-w-xl leading-8 text-muted-foreground">
                Голос, модель и память могут оставаться на вашем компьютере. Интернет
                используется только для выбранных функций: поиска, погоды, курсов валют или
                внешнего LLM-сервера.
              </p>
            </div>
            <div className="architecture animate-fade-right">
              <div className="architecture-node node-main">
                <Sparkles className="h-5 w-5" />
                Vera Agent
              </div>
              <div className="architecture-grid">
                <div className="architecture-node">Sherpa-ONNX<br /><span>speech to text</span></div>
                <div className="architecture-node">GGUF / Ollama<br /><span>language model</span></div>
                <div className="architecture-node">Supertonic<br /><span>text to speech</span></div>
                <div className="architecture-node">memory.json<br /><span>local memory</span></div>
              </div>
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-dim">
                <Lock className="h-4 w-4 text-accent" />
                данные остаются под вашим контролем
              </div>
            </div>
          </div>
        </section>

        <section id="start" className="section-dark py-24">
          <div className="container mx-auto px-5 text-center">
            <div className="animate-fade-up-soft">
              <p className="section-kicker">[ начать работу ]</p>
              <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-bold tracking-[-0.04em] sm:text-5xl">
                Vera открыта, бесплатна и готова жить на вашем компьютере.
              </h2>
            </div>

            <div className="code-line mx-auto mt-10 max-w-3xl animate-fade-up-delayed">
              <div className="clone-command">
                <span className="text-violet">$</span>
                <span className="clone-command-text">{cloneCommand}</span>
              </div>
              <button
                className="copy-button"
                onClick={handleCopy}
                aria-label="Копировать git clone"
                type="button"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? 'Скопировано' : 'Скопировать'}
              </button>
            </div>

            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link className="button button-primary" href={releasesUrl}>
                Скачать релиз
              </Link>
              <Link className="button" href={docsUrl}>
                Открыть документацию
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
