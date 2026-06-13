'use client';

import { Check, Copy, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/header';
import Footer from '@/components/footer';

const repoUrl = 'https://github.com/tripleguard/Vera';

const toc = [
  ['overview', 'Обзор'],
  ['requirements', 'Требования'],
  ['install', 'Установка'],
  ['interface', 'Интерфейс'],
  ['commands', 'Команды'],
  ['memory', 'Память'],
  ['skills-tools', 'Skills и Tools'],
  ['integrations', 'Интеграции'],
  ['configuration', 'Конфигурация'],
  ['testing', 'Тестирование'],
  ['troubleshooting', 'Неполадки'],
  ['faq', 'FAQ'],
];

function CodeBlock({ children }: { children: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="relative">
      <pre className="code-block pr-14"><code>{children}</code></pre>
      <button
        className="absolute right-3 top-3 rounded-md border border-border bg-[#11151c] p-2 text-dim hover:text-foreground"
        onClick={copy}
        aria-label="Копировать"
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </button>
    </div>
  );
}

export default function Docs() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="docs-shell">
        <aside className="docs-sidebar">
          <nav>
            <p className="mb-4 px-3 text-[10px] uppercase tracking-[0.18em] text-dim">Документация</p>
            {toc.map(([id, title]) => <a href={`#${id}`} key={id}>{title}</a>)}
            <Link className="mt-4 flex items-center gap-2" href={`${repoUrl}/blob/main/README.md`} target="_blank">
              README на GitHub <ExternalLink className="h-3 w-3" />
            </Link>
          </nav>
        </aside>

        <article className="docs-content">
          <section id="overview">
            <p className="section-kicker">[ docs / актуально по README ]</p>
            <h1 className="mt-5">Vera</h1>
            <p className="max-w-3xl text-base sm:text-lg">
              Полностью локальный голосовой агент для Windows с оффлайн-распознаванием речи,
              встроенной локальной LLM и графическим интерфейсом.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <span className="tag">Python 3.10+</span>
              <span className="tag">Node.js 20.19+</span>
              <span className="tag">Windows x64</span>
              <span className="tag">52 tests</span>
            </div>
            <div className="docs-note">
              <strong>Важно.</strong> Vera может ошибаться. Проверяйте критически важные данные,
              особенно результаты веб-поиска, курсы валют, погоду и статистику.
            </div>
            <h3>Основные компоненты</h3>
            <ul>
              <li><strong>Распознавание речи:</strong> Sherpa-ONNX, streaming и оффлайн.</li>
              <li><strong>LLM:</strong> локальная GGUF-модель или внешний сервер Ollama / LM Studio.</li>
              <li><strong>Синтез речи:</strong> Supertonic с локальным голосом Lily через ONNX Runtime.</li>
              <li><strong>Интерфейс:</strong> плавающий виджет и полноценное окно чата поверх всех окон.</li>
            </ul>
          </section>

          <section id="requirements">
            <h2>Системные требования</h2>
            <p>
              С учетом встроенной локальной LLM (Qwen3.5-2B-GGUF) и нейросетевых
              движков распознавания/синтеза речи (Sherpa-ONNX STT, Supertonic TTS):
            </p>
            <div className="docs-table-wrap">
              <table className="docs-table">
                <thead><tr><th>Компонент</th><th>Минимальные</th><th>Рекомендуемые</th></tr></thead>
                <tbody>
                  <tr><td>ОС</td><td>Windows 10 (x64)</td><td>Windows 11 (x64)</td></tr>
                  <tr><td>Процессор (CPU)</td><td>2 ядра, с поддержкой AVX2</td><td>4+ ядер (Intel Core i5+ / AMD Ryzen)</td></tr>
                  <tr><td>ОЗУ (RAM)</td><td>8 ГБ</td><td>16 ГБ</td></tr>
                  <tr><td>Место на диске</td><td>4 ГБ</td><td>5 ГБ (на SSD)</td></tr>
                  <tr><td>Видеокарта (GPU)</td><td>Встроенная (работа LLM на CPU)</td><td>Совместимая с Vulkan (для ускорения LLM)</td></tr>
                  <tr><td>Микрофон</td><td>Любой встроенный</td><td>Внешний USB или гарнитура</td></tr>
                </tbody>
              </table>
            </div>
            <h3>Для разработчиков</h3>
            <ul>
              <li><code>Python 3.10+</code></li>
              <li><code>Node.js 18+</code> — требования Vite и <code>@vitejs/plugin-react</code> из <code>ui/package.json</code>.</li>
            </ul>
          </section>

          <section id="install">
            <h2>Установка и запуск</h2>
            <h3>Шаг 1: Клонирование</h3>
            <CodeBlock>{`git clone https://github.com/tripleguard/Vera.git
cd agent_vera`}</CodeBlock>
            <h3>Шаг 2: Зависимости</h3>
            <CodeBlock>{`pip install -r requirements.txt`}</CodeBlock>
            <p>
              Для сетевых запросов веб-слой использует <code>niquests</code> как основной
              HTTP-клиент с автоматическим fallback на <code>requests</code>.
            </p>
            <CodeBlock>{`cd ui
npm install
cd ..`}</CodeBlock>
            <h3>Шаг 3: Бинарные модели</h3>
            <ul>
              <li>Скачайте модель <code>sherpa-onnx-streaming-zipformer-small-ru-vosk-2025-08-16</code> и распакуйте ее в корень проекта.</li>
              <li>Для встроенного механизма запуска скачайте GGUF-модель, например Qwen3-4B-Q4_K_M, и поместите ее в корень проекта.</li>
            </ul>
            <h3>Запуск</h3>
            <CodeBlock>{`cd ui
npm start`}</CodeBlock>
            <p>
              Команда запускает Vite + Electron и автоматически поднимает Python backend
              `server.py` из `.venv`, если окружение найдено.
            </p>
          </section>

          <section id="interface">
            <h2>Графический интерфейс</h2>
            <p>
              Vera работает в фоне через графический интерфейс с плавающим поверх остальных
              окон виджетом. Также доступны окно чата и отдельная панель сессий.
            </p>
            <ul>
              <li>Системный трей с командами открытия чата и выхода.</li>
              <li>Сессии с переименованием, закреплением, архивированием и раздельным контекстом.</li>
              <li>Прикрепление файлов, drag-and-drop и вставка изображений из буфера обмена.</li>
              <li>Рабочая панель с деревом файлов и интерактивным CMD-терминалом.</li>
              <li>Раздел «Проекты» для созданных презентаций.</li>
              <li>Шесть тем: Обсидиан, Дневной, Терминал, Сакура, Графит и Аврора.</li>
              <li>Индикаторы «Думает» и текущего действия инструмента.</li>
            </ul>
            <div className="docs-note">
              Чтобы прервать голосовой ответ, скажите <strong>«Вера»</strong> или
              <strong> «Вера, стоп»</strong>.
            </div>
          </section>

          <section id="commands">
            <h2>Примеры команд</h2>
            <h3>Приложения, окна и система</h3>
            <CodeBlock>{`Вера, открой хром
Вера, переключись на телеграм
Вера, громкость 75 процентов
Вера, сделай скриншот
Вера, перезагрузи через час`}</CodeBlock>
            <h3>Файлы, веб и продуктивность</h3>
            <CodeBlock>{`Вера, найди файл резюме
Вера, погода в Москве
Вера, найди информацию о Python
Вера, таймер 10 минут
Вера, читай мне новости каждое утро в 9:30`}</CodeBlock>
            <h3>Память и создание материалов</h3>
            <CodeBlock>{`Вера, запомни меня зовут Имя
Вера, что ты знаешь обо мне
Вера, сделай презентацию про искусственный интеллект
Вера, создай таблицу с расходами
Вера, посчитай факториал 20`}</CodeBlock>
          </section>

          <section id="memory">
            <h2>Архитектура памяти</h2>
            <p>
              Память Vera работает полностью локально без векторной базы и эмбеддингов. Основное
              хранилище — `data/memory.json`; старый `data/MEMORY.md` мигрирует в JSON при первом запуске.
            </p>
            <h3>Категории фактов</h3>
            <div className="docs-table-wrap">
              <table className="docs-table">
                <thead><tr><th>Категория</th><th>Триггеры</th><th>Пример</th></tr></thead>
                <tbody>
                  <tr><td><code>identity</code></td><td>зовут, моё имя, кто я</td><td>«Меня зовут Тимур»</td></tr>
                  <tr><td><code>contact</code></td><td>@, телефон, почта, email</td><td>«мой email t@x.ru»</td></tr>
                  <tr><td><code>preference</code></td><td>люблю, нравится, ненавижу, предпочитаю</td><td>«Любит тёмный шоколад»</td></tr>
                  <tr><td><code>project</code></td><td>проект, задача, работаю над, разрабатываю</td><td>«Работаю над Vera»</td></tr>
                  <tr><td><code>fact</code></td><td>(по умолчанию)</td><td>«Есть кот по имени Барсик»</td></tr>
                </tbody>
              </table>
            </div>
            <p>
              Для поиска используются BM25, свежесть, совпадение категории и бонус закрепленным
              фактам. В системный промпт попадают три наиболее релевантных и закрепленные факты.
            </p>
          </section>

          <section id="skills-tools">
            <h2>Skills и Tools</h2>
            <h3>Skills</h3>
            <p>
              Каждый skill хранится в отдельном каталоге с `SKILL.md`. Он описывает назначение,
              правила, разрешенные инструменты и профиль модели. Vera загружает только подходящий
              skill, чтобы не раздувать системный prompt.
            </p>
            <h3>Tools</h3>
            <ul>
              <li>Чтение документов с автоматической суммаризацией длинных файлов.</li>
              <li>Python code interpreter в отдельном процессе с защитой от зависания.</li>
              <li>Создание текстовых файлов, таблиц, презентаций, докладов, отчетов и статей.</li>
            </ul>
          </section>

          <section id="integrations">
            <h2>Интеграции</h2>
            <h3>Внешний LLM-сервер</h3>
            <ol>
              <li>Откройте настройки Vera.</li>
              <li>Включите «Внешний LLM-сервер».</li>
              <li>Для Ollama укажите `http://localhost:11434/v1`.</li>
              <li>Для LM Studio укажите `http://localhost:1234/v1`.</li>
              <li>Сохраните настройки — перезапуск не требуется.</li>
            </ol>
            <h3>Telegram</h3>
            <p>
              Telegram-режим работает через Telethon и папку «Избранное» (Saved Messages).
              Vera может находить и отправлять файлы, присылать созданные PPTX и читать сообщения
              из переписок. Управление компьютером в этом режиме отключено из соображений безопасности.
            </p>
            <h3>Веб-поиск</h3>
            <p>
              Поиск сначала идет через Brave Search, затем при необходимости переключается на
              DuckDuckGo Lite. Страницы загружаются параллельно, очищаются и ранжируются перед
              передачей локальной модели.
            </p>
          </section>

          <section id="configuration">
            <h2>Конфигурация</h2>
            <p>Основной файл настроек: <code>data/config.json</code>.</p>
            <ul>
              <li>Слово активации и таймаут тишины.</li>
              <li><code>tts.voice_name</code>, <code>tts.total_steps</code>, <code>tts.volume</code>.</li>
              <li>Внешние серверы LLM.</li>
              <li>Алиасы сайтов.</li>
            </ul>
          </section>

          <section id="testing">
            <h2>Тестирование</h2>
            <CodeBlock>{`python tests/run_all.py`}</CodeBlock>
            <p>
              В README указано 52 теста. Они покрывают аудио и мультимодальность, память и
              сессии, Skills, маршрутизацию tools, генерацию документов и веб-экстракцию.
            </p>
            <CodeBlock>{`python tests/test_memory.py
python tests/test_tool_router.py
python tests/test_presentation_generator.py`}</CodeBlock>
          </section>

          <section id="troubleshooting">
            <h2>Устранение неполадок</h2>
            <h3>Sherpa-ONNX не загружается</h3>
            <p>Проверьте, что каталог модели распознавания речи находится в корне проекта.</p>
            <h3>LLM не запускается</h3>
            <p>
              Проверьте GGUF и наличие `llama-server.exe` с DLL. Для установленной версии
              стандартный каталог — `C:\Program Files\Vera`.
            </p>
            <h3>Нет звука или не работает микрофон</h3>
            <p>
              Проверьте <code>tts.voice_name</code>, доступные устройства воспроизведения и
              настройки звука в Windows.
            </p>
            <h3>Память забывает факты</h3>
            <p>
              Проверьте целостность `data/memory.json`. Лимит памяти — 20 фактов; закрепленные
              факты сохраняются при вытеснении.
            </p>
          </section>

          <section id="faq">
            <h2>FAQ</h2>
            <h3>Передает ли Vera данные в интернет?</h3>
            <p>
              Нет, кроме веб-поиска, погоды и курсов валют. STT и LLM работают локально
              или на вашем внешнем сервере, если он настроен.
            </p>
            <h3>Можно ли изменить слово активации?</h3>
            <p>Да, в <code>config.json</code>.</p>
            <h3>Как прервать Веру, когда она говорит?</h3>
            <p>Скажите «Вера» или «Вера, стоп» — она сразу остановится.</p>
            <h3>Как работает поиск по памяти?</h3>
            <p>
              Последняя реплика используется как поисковый запрос. Факты ранжируются по BM25,
              свежести, категории и бонусу закрепления; top-3 и закрепленные факты попадают в
              системный промпт.
            </p>
            <h3>Можно ли закрепить факт, чтобы он не потерялся?</h3>
            <p>
              Да, через API <code>MemoryManager.pin(fact_id)</code>. Закрепленные факты попадают
              в контекст и не вытесняются при достижении лимита <code>MAX_FACTS=20</code>.
            </p>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
}
