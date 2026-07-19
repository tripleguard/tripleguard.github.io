import Link from 'next/link';

const docsUrl = 'https://docs.agentvera.ru/';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-[#090b0f]">
      <div className="container mx-auto flex flex-col gap-5 px-5 py-8 text-xs text-dim sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 Vera · Ваш компьютер. Ваши данные.</p>
        <div className="flex gap-5">
          <Link href={docsUrl}>Документация</Link>
          <Link href="https://github.com/tripleguard/Vera" target="_blank">GitHub</Link>
          <Link href="https://github.com/tripleguard/Vera/releases" target="_blank">Релизы</Link>
        </div>
      </div>
    </footer>
  );
}
