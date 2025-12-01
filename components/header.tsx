'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`py-4 px-4 md:px-8 fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-background/80 backdrop-blur-md shadow-sm' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <Image 
            src="/vera.svg" 
            alt="Vera Logo" 
            width={32} 
            height={32} 
            className="dark:invert"
          />
          <span className="font-headline text-2xl font-bold text-foreground group-hover:text-primary transition-colors">Vera</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/#faq" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            FAQ
          </Link>
          <Link href="/docs" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Документация
          </Link>
        </nav>
      </div>
    </header>
  );
}
