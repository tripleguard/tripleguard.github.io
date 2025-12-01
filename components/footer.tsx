import { Github } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="py-6 md:py-8 px-4 md:px-8 border-t">
      <div className="container mx-auto">
        {/* Mobile: stacked layout */}
        <div className="flex flex-col items-center gap-4 md:hidden">
          <div className="flex items-center gap-6">
            <Link href="/docs" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Документация
            </Link>
            <Link href="https://github.com/tripleguard/agent_vera" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="GitHub">
              <Github className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Desktop: horizontal layout */}
        <div className="hidden md:flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/docs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Документация
            </Link>
            <Link href="https://github.com/tripleguard/agent_vera" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="GitHub">
              <Github className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
