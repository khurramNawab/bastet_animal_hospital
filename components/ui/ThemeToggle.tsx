'use client';

import React, { useEffect, useState } from 'react';
import { Sun, Moon, Laptop } from 'lucide-react';
import { useTheme } from '@/components/providers/ThemeProvider';
import { cn } from '@/lib/cn';

interface ThemeToggleProps {
  className?: string;
  showLabels?: boolean;
}

export function ThemeToggle({ className, showLabels = false }: ThemeToggleProps) {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={cn(
          'w-9 h-9 rounded-full border border-sand/40 bg-sand/10 flex items-center justify-center opacity-50',
          className,
        )}
        aria-hidden="true"
      />
    );
  }

  const cycleTheme = () => {
    if (theme === 'system') setTheme('light');
    else if (theme === 'light') setTheme('dark');
    else setTheme('system');
  };

  return (
    <button
      type="button"
      onClick={cycleTheme}
      className={cn(
        'relative p-2 rounded-full border border-sand/40 glass hover:border-orange hover:bg-orange/15 text-ink dark:text-cream transition-all duration-300 focus-visible:ring-2 focus-visible:ring-orange-deep flex items-center gap-2',
        className,
      )}
      aria-label={`Current theme: ${theme}. Click to change theme mode.`}
      title={`Theme: ${theme.charAt(0).toUpperCase() + theme.slice(1)}`}
    >
      {theme === 'system' ? (
        <Laptop className="w-4 h-4 text-orange" />
      ) : resolvedTheme === 'dark' ? (
        <Moon className="w-4 h-4 text-orange fill-orange/20" />
      ) : (
        <Sun className="w-4 h-4 text-orange fill-orange/20" />
      )}

      {showLabels && (
        <span className="text-xs uppercase font-semibold tracking-wider">
          {theme.charAt(0).toUpperCase() + theme.slice(1)}
        </span>
      )}
    </button>
  );
}
