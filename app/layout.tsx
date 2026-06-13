import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Vera — локальный голосовой AI-агент',
    template: '%s · Vera',
  },
  description:
    'Локальный голосовой агент для Windows с оффлайн-распознаванием речи, локальной LLM, памятью, tools и удобным GUI.',
  metadataBase: new URL('https://agentvera.ru'),
  openGraph: {
    title: 'Vera — локальный голосовой AI-агент',
    description: 'Слышит, помнит и действует. Ваши данные остаются под вашим контролем.',
    url: 'https://agentvera.ru',
    siteName: 'Vera',
    locale: 'ru_RU',
    type: 'website',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
