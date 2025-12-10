// @ts-nocheck
'use client';

import { Button } from '@/components/ui/button';
import { Download, Github, Lock, Terminal, Bot, User, Cpu, Mic, AppWindow, FolderSearch, Globe, Timer, Settings, Wifi, BrainCircuit, Rocket, Zap } from 'lucide-react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import React, { useState, useEffect } from 'react';

const features = [
  {
    icon: <AppWindow className="h-8 w-8 text-primary" />,
    title: 'Управляет компьютером',
    description: 'Запустит Steam, свернет окна, сделает скриншот или выключит ПК по вашей команде.',
  },
  {
    icon: <Rocket className="h-8 w-8 text-primary" />,
    title: 'Работает «из коробки»',
    description: 'Забудьте про сложные настройки Python, Git и Docker. Мы упаковали всё сложное в один файл. Просто установите и наслаждайтесь.',
  },
  {
    icon: <Lock className="h-8 w-8 text-primary" />,
    title: 'Только ваши данные',
    description: 'Никакой слежки и логов на чужих серверах. Вера работает оффлайн. Даже если интернет пропадет — она останется с вами.',
  },
  {
    icon: <Mic className="h-8 w-8 text-primary" />,
    title: 'Всегда на слуху',
    description: 'Не нужно нажимать кнопки или переключаться на окно чата. Вера работает в фоне и слышит вас, пока вы в игре, работе или на кухне.',
  },
  {
    icon: <FolderSearch className="h-8 w-8 text-primary" />,
    title: 'Умный поиск файлов',
    description: 'Не помните, где сохранили отчет? Просто спросите Веру. Она найдет документы, фото и папки быстрее, чем вы вспомните их название.',
  },
  {
    icon: <Zap className="h-8 w-8 text-primary" />,
    title: 'Быстрая и легкая',
    description: 'Оптимизирована для работы на домашнем железе. Использует современные модели (Qwen/Llama), выдавая высокую скорость даже без топовых видеокарт.',
  },
  {
    icon: <Globe className="h-8 w-8 text-primary" />,
    title: 'Интернет-агент',
    description: 'Нужна свежая информация? Вера сама найдет ответ в Интернете, расскажет о погоде и курсе валют.',
  },
  {
    icon: <Timer className="h-8 w-8 text-primary" />,
    title: 'Личный секретарь',
    description: 'Засечь время, напомнить о встрече или просто поболтать. Вера берет на себя рутину, чтобы вы могли сосредоточиться на важном.',
  },
];

const faqItems = [
  {
    question: "Что такое Vera?",
    answer: "Vera — локальный голосовой агент для Windows, работающий без передачи данных в облако. Распознавание речи (Vosk), ответы языковой модели (LLM) и синтез речи выполняются полностью на вашем компьютере."
  },
  {
    question: "Передает ли агент данные в интернет?",
    answer: "Нет, кроме веб-поиска, погоды и курсов валют. Распознавание речи (STT) и языковая модель (LLM) работают полностью локально на вашем устройстве."
  },
  {
    question: "На каких операционных системах работает Vera?",
    answer: "В настоящее время Vera доступна для Windows 10/11 x64."
  },
  {
    question: "Как обращаться к Вере?",
    answer: "При голосовом управлении обязательно начинайте фразу со слова «Вера» (например: «Вера, погода в Москве»). Если вы пишите команды текстом в терминал, обращение можно опустить."
  },

];

const conversations = [
  {
    user: "Вера, какая погода сейчас в Москве?",
    bot: "В Москве сейчас 12°, ощущается как 10°."
  },
  {
    user: "Вера, очисти корзину.",
    bot: "Корзина очищена, удалено 13 файлов."
  },
  {
    user: "Поставь таймер на 5 минут.",
    bot: "Поставила таймер на 5 минут."
  }
];

const TypingAnimation = ({ text, delay = 0, onFinished, className = "" }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (delay > 0) {
      const delayTimeout = setTimeout(() => {
        animateText();
      }, delay);
      return () => clearTimeout(delayTimeout);
    } else {
      animateText();
    }
  }, [text, delay]);

  const animateText = () => {
    setIsFinished(false);
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.substring(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        setIsFinished(true);
        if (onFinished) {
          setTimeout(onFinished, 500); // Wait a bit before calling finished
        }
      }
    }, 50); // Typing speed
  };

  return (
    <p className={`w-full relative ${className}`}>
      {displayedText}
      {!isFinished && <span className="animate-blink-caret border-r-2 border-current absolute right-0 top-0 bottom-0"></span>}
    </p>
  );
};

const ChatAnimation = () => {
  const [currentConvIndex, setCurrentConvIndex] = useState(0);
  const [key, setKey] = useState(0);
  const [showBot, setShowBot] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const currentConversation = conversations[currentConvIndex];

  useEffect(() => {
    const totalDuration = 10000; // 10 seconds per full conversation loop

    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        setCurrentConvIndex((prevIndex) => (prevIndex + 1) % conversations.length);
        setKey(prevKey => prevKey + 1);
        setShowBot(false);
        setIsExiting(false);
      }, 500); // CSS animation duration
    }, totalDuration);

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        setKey(prev => prev + 1);
        setCurrentConvIndex(0);
        setShowBot(false);
        setIsExiting(false);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [currentConvIndex]);

  return (
    <div key={key} className={`space-y-4 ${isExiting ? 'animate-chat-exit' : 'animate-chat-enter'}`}>
      <div className="flex items-start justify-end gap-3 group">
        <div className="bg-primary p-3 rounded-xl rounded-tr-sm shadow-sm">
          <TypingAnimation text={currentConversation.user} className="text-primary-foreground" onFinished={() => setShowBot(true)} />
        </div>
        <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center flex-shrink-0">
          <User className="h-4 w-4 text-slate-600" />
        </div>
      </div>
      {showBot && (
        <div className="flex items-start gap-3 group">
          <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center flex-shrink-0 shadow-sm">
            <Bot className="h-4 w-4 text-primary" />
          </div>
          <div className="bg-white p-3 rounded-xl rounded-tl-sm border border-slate-200 shadow-sm">
            <TypingAnimation text={currentConversation.bot} className="text-slate-700" delay={500} />
          </div>
        </div>
      )}
    </div>
  );
};


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />

      <main className="flex-1 flex flex-col">
        {/* Hero Section */}
        <section className="flex flex-col justify-center min-h-screen pt-20 md:pt-0">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
              <div className="text-center md:text-left order-2 md:order-1">
                <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary tracking-tight">
                  Vera. Ваш личный ассистент.
                </h1>
                <p className="mt-4 md:mt-6 text-base md:text-lg lg:text-xl text-muted-foreground max-w-xl mx-auto md:mx-0">
                  Работает полностью оффлайн. Ваши данные остаются вашими.
                </p>
                <div className="mt-6 md:mt-10 flex flex-col sm:flex-row justify-center md:justify-start gap-3 md:gap-4">
                  <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all duration-300 hover:scale-105 w-full sm:w-auto">
                    <Download className="mr-2 h-5 w-5" />
                      <Link href="https://github.com/tripleguard/agent_vera/releases/download/v1.0.1/Vera.zip">
                      Скачать
                      </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild className="transition-all duration-300 hover:scale-105 hover:bg-accent/10 w-full sm:w-auto">
                    <Link href="https://github.com/tripleguard/agent_vera" target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-5 w-5" />
                      GitHub
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="flex justify-center items-center order-1 md:order-2">
                <div className="w-full max-w-md bg-slate-50/80 backdrop-blur-sm rounded-2xl shadow-xl shadow-slate-200/60 font-code text-sm border border-white/20 ring-1 ring-slate-200 overflow-hidden">
                  <div className="p-3 md:p-4 bg-white/50 border-b border-slate-200/60 flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-slate-300"></div>
                      <div className="w-3 h-3 rounded-full bg-slate-300"></div>
                      <div className="w-3 h-3 rounded-full bg-slate-300"></div>
                    </div>
                    <div className="flex-1 flex items-center justify-center gap-2">
                      <Terminal className="h-4 w-4 text-slate-400" />
                      <span className="text-sm text-slate-600 font-medium">Vera Assistant</span>
                    </div>
                    <div className="w-[52px]"></div>
                  </div>
                  <div className="p-4 md:p-6 h-48 md:h-64 overflow-hidden relative bg-slate-50/50">
                    <ChatAnimation />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 md:py-24 bg-card/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">
                Ключевые особенности
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Все, что вам нужно от современного ассистента, без компромиссов в отношении конфиденциальности.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {features.map((feature) => (
                <div key={feature.title} className="text-center p-4 md:p-6 rounded-xl bg-background/50 hover:bg-background transition-colors">
                  <div className="flex justify-center mb-4">{feature.icon}</div>
                  <h3 className="text-lg md:text-xl font-bold font-headline text-foreground">{feature.title}</h3>
                  <p className="mt-2 text-sm md:text-base text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-12 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 md:mb-16">
              <h2 className="font-headline text-2xl md:text-3xl lg:text-4xl font-bold text-primary">
                Часто задаваемые вопросы
              </h2>
              <p className="mt-3 md:mt-4 text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
                Нашли ответ на свой вопрос? Если нет, свяжитесь с нами.
              </p>
            </div>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                  <AccordionItem value={`item-${index}`} key={index}>
                    <AccordionTrigger className="text-sm md:text-lg font-medium text-left">{item.question}</AccordionTrigger>
                    <AccordionContent className="text-sm md:text-base text-muted-foreground">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
