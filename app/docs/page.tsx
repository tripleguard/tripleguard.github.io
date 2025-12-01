// @ts-nocheck
'use client';

import Header from '@/components/header';
import Footer from '@/components/footer';
import { 
  Download, Terminal, Settings, Mic, AppWindow, FolderSearch, 
  Volume2, Sun, Power, Timer, Cloud, Globe, HelpCircle,
  ChevronRight, Copy, Check, AlertTriangle
} from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

const CodeBlock = ({ children, language = 'bash' }: { children: string; language?: string }) => {
  const [copied, setCopied] = useState(false);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <pre className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto text-sm">
        <code className="text-slate-800 dark:text-slate-200">{children}</code>
      </pre>
      <button 
        onClick={copyToClipboard}
        className="absolute top-2 right-2 p-2 rounded-md bg-slate-200 dark:bg-slate-700 opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Копировать код"
      >
        {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
      </button>
    </div>
  );
};

const TableOfContents = ({ items }: { items: { id: string; title: string }[] }) => (
  <nav className="hidden lg:block sticky top-24 w-64 flex-shrink-0">
    <h3 className="font-bold text-lg mb-4">Содержание</h3>
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item.id}>
          <a 
            href={`#${item.id}`} 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            <ChevronRight className="h-3 w-3" />
            {item.title}
          </a>
        </li>
      ))}
    </ul>
  </nav>
);

const tocItems = [
  { id: 'about', title: 'О проекте' },
  { id: 'quickstart', title: 'Быстрый старт' },
  { id: 'requirements', title: 'Системные требования' },
  { id: 'installation', title: 'Установка (для разработчиков)' },
  { id: 'commands', title: 'Справочник команд' },
  { id: 'websearch', title: 'Веб-поиск' },
  { id: 'config', title: 'Конфигурация' },
  { id: 'structure', title: 'Структура проекта' },
  { id: 'troubleshooting', title: 'Устранение неполадок' },
];

export default function DocsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />

      <main className="flex-1 pt-20 md:pt-24">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="flex gap-8">
            <TableOfContents items={tocItems} />
            
            <article className="flex-1 max-w-4xl prose prose-slate dark:prose-invert prose-headings:font-headline">
              {/* Header */}
              <div className="mb-12 not-prose">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-headline text-primary mb-4">
                  Документация Vera
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground">
                  Полностью локальный голосовой агент с оффлайн-распознаванием речи и локальной моделью LLM.
                </p>
              </div>

              {/* About */}
              <section id="about" className="scroll-mt-24 mb-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">О проекте</h2>
                <p className="text-muted-foreground mb-4">
                  Vera — локальный голосовой агент для Windows, работающий без передачи данных в облако. 
                  Все вычисления выполняются на компьютере пользователя:
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start gap-2">
                    <Mic className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span><strong>Распознавание речи:</strong> Vosk (оффлайн)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Terminal className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span><strong>Модель LLM:</strong> Ваша локальная (рекомендуется Qwen 3 1.7B)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Volume2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span><strong>Синтез речи:</strong> pyttsx3</span>
                  </li>
                </ul>
                <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4 flex gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-amber-800 dark:text-amber-200">
                    <strong>Важно:</strong> агент может ошибаться. Проверяйте критически важные данные, 
                    включая результаты веб-поиска, курсы валют, погодные данные и статистику.
                  </p>
                </div>
              </section>

              {/* Quick Start */}
              <section id="quickstart" className="scroll-mt-24 mb-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Быстрый старт</h2>
                <p className="text-muted-foreground mb-4">
                  Скачайте portable-версию с сайта и запустите:
                </p>
                <CodeBlock>Vera.exe</CodeBlock>
                
                <h3 className="text-xl font-bold mt-6 mb-3">Последовательность:</h3>
                <ol className="list-decimal list-inside space-y-2 text-muted-foreground mb-6">
                  <li>Дождитесь сообщения «Система готова»</li>
                  <li>Скажите слово активации</li>
                  <li>Произнесите команду</li>
                </ol>

                <h3 className="text-xl font-bold mt-6 mb-3">Режимы работы:</h3>
                <div className="space-y-4 mb-6">
                  <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 border border-slate-200 dark:border-slate-800">
                    <h4 className="font-bold flex items-center gap-2 mb-2 text-primary">
                      <Mic className="h-4 w-4" />
                      Голосовой режим
                    </h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Обязательно используйте слово активации перед командой. Агент слушает постоянно, но реагирует только на свое имя.
                    </p>
                    <div className="text-sm bg-slate-100 dark:bg-slate-950 p-2 rounded border border-slate-200 dark:border-slate-800">
                      <span className="text-green-600 dark:text-green-400">✓</span> «Вера, поставь таймер»<br/>
                      <span className="text-red-500 dark:text-red-400">✕</span> «Поставь таймер»
                    </div>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 border border-slate-200 dark:border-slate-800">
                    <h4 className="font-bold flex items-center gap-2 mb-2 text-primary">
                      <Terminal className="h-4 w-4" />
                      Текстовый режим (Терминал)
                    </h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      При вводе команд текстом слово активации не требуется. Вы уже находитесь в контексте диалога.
                    </p>
                    <div className="text-sm bg-slate-100 dark:bg-slate-950 p-2 rounded border border-slate-200 dark:border-slate-800">
                      <span className="text-green-600 dark:text-green-400">✓</span> «Поставь таймер»<br/>
                      <span className="text-green-600 dark:text-green-400">✓</span> «Вера, поставь таймер» (тоже сработает)
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-bold mt-6 mb-3">Консольные команды:</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Команда</th>
                        <th className="text-left py-3 px-4">Описание</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 px-4"><code className="bg-slate-200 dark:bg-slate-800 px-1 rounded">/help</code></td>
                        <td className="py-3 px-4">Справка</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4"><code className="bg-slate-200 dark:bg-slate-800 px-1 rounded">/color green</code></td>
                        <td className="py-3 px-4">Цвет консоли</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4"><code className="bg-slate-200 dark:bg-slate-800 px-1 rounded">/mute / /unmute</code></td>
                        <td className="py-3 px-4">Управление микрофоном</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4"><code className="bg-slate-200 dark:bg-slate-800 px-1 rounded">/exit</code></td>
                        <td className="py-3 px-4">Завершение работы</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* System Requirements */}
              <section id="requirements" className="scroll-mt-24 mb-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Системные требования</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Компонент</th>
                        <th className="text-left py-3 px-4">Минимум</th>
                        <th className="text-left py-3 px-4">Рекомендуется</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 px-4">ОС</td>
                        <td className="py-3 px-4">Windows 10 x64</td>
                        <td className="py-3 px-4">Windows 11 x64</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4">RAM</td>
                        <td className="py-3 px-4">4 ГБ</td>
                        <td className="py-3 px-4">8+ ГБ</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4">Диск</td>
                        <td className="py-3 px-4">2 ГБ</td>
                        <td className="py-3 px-4">4 ГБ SSD</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4">Микрофон</td>
                        <td className="py-3 px-4">Любой</td>
                        <td className="py-3 px-4">USB или качественный встроенный</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Installation for developers */}
              <section id="installation" className="scroll-mt-24 mb-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Установка (для разработчиков)</h2>
                <p className="text-muted-foreground mb-4">
                  Если вы хотите запустить агента из исходного кода или внести изменения:
                </p>
                
                <h3 className="text-xl font-bold mt-6 mb-3">Шаг 1: Клонирование</h3>
                <CodeBlock>
{`git clone https://github.com/tripleguard/agent_vera.git
cd agent_vera`}
                </CodeBlock>

                <h3 className="text-xl font-bold mt-6 mb-3">Шаг 2: Зависимости</h3>
                <CodeBlock>pip install -r requirements.txt</CodeBlock>

                <h3 className="text-xl font-bold mt-6 mb-3">Шаг 3: Установка llama-cpp-python (Windows)</h3>
                <p className="text-muted-foreground mb-3">
                  Установите Visual C++ Build Tools, затем:
                </p>
                <CodeBlock>
{`pip install --upgrade pip setuptools wheel
pip install llama-cpp-python`}
                </CodeBlock>

                <h3 className="text-xl font-bold mt-6 mb-3">Шаг 4: Модели</h3>
                <div className="space-y-4">
                  <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4">
                    <h4 className="font-bold mb-2">Vosk:</h4>
                    <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                      <li>Скачайте модель <code className="bg-slate-200 dark:bg-slate-800 px-1 rounded">vosk-model-small-ru-0.22</code></li>
                      <li>Распакуйте её в корень проекта</li>
                    </ol>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4">
                    <h4 className="font-bold mb-2">LLM:</h4>
                    <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                      <li>Скачайте модель GGUF (например, Q4_K_M)</li>
                      <li>Поместите файл в корень проекта (модель автоматически определяется агентом)</li>
                      <li>Либо укажите путь в <code className="bg-slate-200 dark:bg-slate-800 px-1 rounded">data/config.json</code></li>
                    </ol>
                  </div>
                </div>

                <h3 className="text-xl font-bold mt-6 mb-3">Шаг 5: Запуск</h3>
                <CodeBlock>python -m main.agent</CodeBlock>
              </section>

              {/* Commands Reference */}
              <section id="commands" className="scroll-mt-24 mb-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Справочник команд</h2>
                
                <div className="space-y-8">
                  {/* Applications */}
                  <div>
                    <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                      <AppWindow className="h-5 w-5 text-primary" />
                      Приложения
                    </h3>
                    <CodeBlock>
{`Вера, открой хром
Вера, закрой телеграм
Вера, запусти калькулятор`}
                    </CodeBlock>
                    <p className="text-sm text-muted-foreground mt-2">
                      Агент использует нечёткий поиск названий программ.
                    </p>
                  </div>

                  {/* Windows */}
                  <div>
                    <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                      <AppWindow className="h-5 w-5 text-primary" />
                      Окна
                    </h3>
                    <CodeBlock>
{`Вера, сверни окно
Вера, разверни браузер
Вера, переключись на телеграм`}
                    </CodeBlock>
                  </div>

                  {/* Files */}
                  <div>
                    <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                      <FolderSearch className="h-5 w-5 text-primary" />
                      Файлы и папки
                    </h3>
                    <CodeBlock>
{`Вера, открой файл отчет
Вера, найди файл резюме
Вера, открой папку проект`}
                    </CodeBlock>
                    <p className="text-sm text-muted-foreground mt-2">
                      Поиск выполняется в стандартных пользовательских каталогах.
                    </p>
                  </div>

                  {/* System */}
                  <div>
                    <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                      <Settings className="h-5 w-5 text-primary" />
                      Системные настройки
                    </h3>
                    <p className="font-medium mb-2">Громкость:</p>
                    <CodeBlock>
{`Вера, громкость 5
Вера, громкость 75 процентов`}
                    </CodeBlock>
                    <p className="font-medium mt-4 mb-2">Яркость:</p>
                    <CodeBlock>Вера, яркость 7</CodeBlock>
                    <p className="font-medium mt-4 mb-2">Прочее:</p>
                    <CodeBlock>
{`Вера, сделай скриншот
Вера, какой мой IP`}
                    </CodeBlock>
                  </div>

                  {/* Power */}
                  <div>
                    <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                      <Power className="h-5 w-5 text-primary" />
                      Питание
                    </h3>
                    <CodeBlock>
{`Вера, выключи компьютер
Вера, перезагрузи через час
Вера, спящий режим`}
                    </CodeBlock>
                    <p className="text-sm text-muted-foreground mt-2">
                      Без подтверждения выполняются только немедленные команды.
                    </p>
                  </div>

                  {/* Time */}
                  <div>
                    <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                      <Timer className="h-5 w-5 text-primary" />
                      Время и напоминания
                    </h3>
                    <CodeBlock>
{`Вера, который час
Вера, таймер 10 минут
Вера, напомни через полчаса позвонить`}
                    </CodeBlock>
                  </div>

                  {/* Weather */}
                  <div>
                    <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                      <Cloud className="h-5 w-5 text-primary" />
                      Погода
                    </h3>
                    <CodeBlock>Вера, погода в Москве</CodeBlock>
                  </div>

                  {/* Currency */}
                  <div>
                    <h3 className="text-xl font-bold mb-3">Курсы валют</h3>
                    <CodeBlock>Вера, курс доллара</CodeBlock>
                    <p className="text-sm text-muted-foreground mt-2">
                      Источник: ЦБ РФ.
                    </p>
                  </div>

                  {/* Web Search */}
                  <div>
                    <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                      <Globe className="h-5 w-5 text-primary" />
                      Веб-поиск и Википедия
                    </h3>
                    <CodeBlock>
{`Вера, найди информацию о Python
Вера, кто такой Эйнштейн
Вера, открой ютуб`}
                    </CodeBlock>
                    <p className="text-sm text-muted-foreground mt-2">
                      Агент выполняет поиск через DuckDuckGo, извлекает текст, затем формирует краткий ответ.
                    </p>
                  </div>
                </div>
              </section>

              {/* Web Search Details */}
              <section id="websearch" className="scroll-mt-24 mb-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Как работает веб-поиск</h2>
                
                <h3 className="text-xl font-bold mt-6 mb-3">Этапы:</h3>
                <ol className="list-decimal list-inside space-y-2 text-muted-foreground mb-6">
                  <li>Запрос через DuckDuckGo</li>
                  <li>Получение списка ссылок</li>
                  <li>Загрузка страниц</li>
                  <li>Очистка текста</li>
                  <li>Суммаризация LLM</li>
                </ol>

                <h3 className="text-xl font-bold mt-6 mb-3">Ограничения:</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Возможны блокировки при частых запросах</li>
                  <li>Некоторые сайты защищены от парсинга</li>
                  <li>Модель может искажать информацию</li>
                </ul>
              </section>

              {/* Configuration */}
              <section id="config" className="scroll-mt-24 mb-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Конфигурация</h2>
                <p className="text-muted-foreground mb-4">
                  Файл: <code className="bg-slate-200 dark:bg-slate-800 px-1 rounded">data/config.json</code>
                </p>
                
                <h3 className="text-xl font-bold mt-6 mb-3">Основные параметры:</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Параметр</th>
                        <th className="text-left py-3 px-4">Описание</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 px-4"><code className="bg-slate-200 dark:bg-slate-800 px-1 rounded">activation_word</code></td>
                        <td className="py-3 px-4">Слово активации</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4"><code className="bg-slate-200 dark:bg-slate-800 px-1 rounded">silence_timeout</code></td>
                        <td className="py-3 px-4">Таймаут тишины</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4"><code className="bg-slate-200 dark:bg-slate-800 px-1 rounded">tts.voice_index</code></td>
                        <td className="py-3 px-4">Голос Windows</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4"><code className="bg-slate-200 dark:bg-slate-800 px-1 rounded">tts.rate</code></td>
                        <td className="py-3 px-4">Скорость речи</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4"><code className="bg-slate-200 dark:bg-slate-800 px-1 rounded">sites</code></td>
                        <td className="py-3 px-4">Алиасы для сайтов</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Project Structure */}
              <section id="structure" className="scroll-mt-24 mb-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Структура проекта</h2>
                <CodeBlock>
{`main/                  Ядро агента
web/                   Веб-модули
user/                  Данные пользователя
data/                  Конфигурация и сохранения
vosk-model/            Модель распознавания речи
*.gguf                 Модель LLM`}
                </CodeBlock>
              </section>

              {/* Troubleshooting */}
              <section id="troubleshooting" className="scroll-mt-24 mb-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Устранение неполадок</h2>
                
                <div className="space-y-4">
                  <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4">
                    <h3 className="font-bold mb-2 flex items-center gap-2">
                      <HelpCircle className="h-5 w-5 text-primary" />
                      Vosk не загружается
                    </h3>
                    <p className="text-muted-foreground">
                      Проверьте наличие директории <code className="bg-slate-200 dark:bg-slate-800 px-1 rounded">vosk-model-small-ru-0.22</code>.
                    </p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4">
                    <h3 className="font-bold mb-2 flex items-center gap-2">
                      <HelpCircle className="h-5 w-5 text-primary" />
                      LLM не загружается
                    </h3>
                    <p className="text-muted-foreground">
                      Проверьте путь до GGUF и корректность файла.
                    </p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4">
                    <h3 className="font-bold mb-2 flex items-center gap-2">
                      <HelpCircle className="h-5 w-5 text-primary" />
                      Нет звука
                    </h3>
                    <p className="text-muted-foreground">
                      Проверьте корректность значения <code className="bg-slate-200 dark:bg-slate-800 px-1 rounded">tts.voice_index</code>.
                    </p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4">
                    <h3 className="font-bold mb-2 flex items-center gap-2">
                      <HelpCircle className="h-5 w-5 text-primary" />
                      Микрофон не работает
                    </h3>
                    <p className="text-muted-foreground">
                      Проверьте настройки устройства в Windows.
                    </p>
                  </div>
                </div>
              </section>

              {/* Credits */}
              <section className="scroll-mt-24 mb-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Благодарности</h2>
                <ul className="space-y-2 text-muted-foreground">
                  <li>
                    <Link href="https://github.com/ggerganov" className="text-primary hover:underline" target="_blank">
                      Георгию Герганову
                    </Link> — за вклад в развитие локальных языковых моделей и технологий, лежащих в основе экосистемы LLM.
                  </li>
                  <li>
                    <Link href="https://github.com/abetlen" className="text-primary hover:underline" target="_blank">
                      Андрею Abetlen
                    </Link> — за создание и поддержку проекта <strong>llama-cpp-python</strong>, позволившего интегрировать локальную LLM в Vera.
                  </li>
                </ul>
              </section>

              {/* Resources */}
              <section className="scroll-mt-24">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Лицензии и ссылки</h2>
                <ul className="space-y-2 text-muted-foreground">
                  <li>
                    <strong>Vosk:</strong>{' '}
                    <Link href="https://alphacephei.com/vosk" className="text-primary hover:underline" target="_blank">
                      alphacephei.com/vosk
                    </Link>
                  </li>
                  <li>
                    <strong>llama-cpp-python:</strong>{' '}
                    <Link href="https://github.com/abetlen/llama-cpp-python" className="text-primary hover:underline" target="_blank">
                      github.com/abetlen/llama-cpp-python
                    </Link>
                  </li>
                </ul>
              </section>
            </article>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
