/**
 * Navigation.tsx
 *
 * Bottom navigation bar for the app.
 *
 * @author claude — 2026-03-20
 * @modified claude — 2026-03-22 — i18n support
 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Gamepad2, BookOpen, Settings } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

export default function Navigation() {
  const pathname = usePathname();
  const t = useTranslation();

  const NAV_ITEMS = [
    { href: '/', label: t.home, icon: Home },
    { href: '/game', label: 'Game', icon: Gamepad2 },
    { href: '/rules', label: t.rules, icon: BookOpen },
    { href: '/settings', label: t.settings, icon: Settings },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-lg border-t border-surface-hover z-50">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto px-4">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-colors ${
                isActive ? 'text-primary' : 'text-foreground/40'
              }`}
            >
              <Icon size={22} />
              <span className="text-[10px] font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
