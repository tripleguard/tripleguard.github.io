import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="py-6 px-4 md:px-8 absolute top-0 left-0 right-0 z-10 bg-transparent">
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
