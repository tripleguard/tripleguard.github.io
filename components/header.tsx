'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Github, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const docsUrl = 'https://docs.agentvera.ru/';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? 'site-header-scrolled' : ''}`}>
      <div className="container mx-auto flex h-16 items-center justify-between px-5">
        <Link href="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-mark">
            <Image src="/vera.svg" alt="" width={22} height={22} priority />
          </span>
          <span>Vera</span>
        </Link>
        <nav className="hidden items-center gap-7 md:flex">
          <Link href="/#features">Возможности</Link>
          <Link href="/#local">Приватность</Link>
          <Link href={docsUrl}>Документация</Link>
          <Link className="header-github" href="https://github.com/tripleguard/Vera" target="_blank">
            <Github className="h-4 w-4" />
            GitHub
          </Link>
        </nav>
        <button
          className="mobile-menu-button md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <nav className="mobile-nav md:hidden">
          <Link href="/#features" onClick={() => setOpen(false)}>Возможности</Link>
          <Link href="/#local" onClick={() => setOpen(false)}>Приватность</Link>
          <Link href={docsUrl} onClick={() => setOpen(false)}>Документация</Link>
          <Link href="https://github.com/tripleguard/Vera" target="_blank">GitHub</Link>
        </nav>
      )}
    </header>
  );
}
