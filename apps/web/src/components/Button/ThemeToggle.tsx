'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@workspace/ui/components/button';
import { cn } from '@workspace/ui/lib/utils';

interface ThemeToggleProps {
  className?: string;
}

export const ThemeSlideToggle = ({ className }: ThemeToggleProps) => {
  const { setTheme } = useTheme();

  return (
    <div
      className={cn(
        'flex w-16 h-8 p-1 rounded-full cursor-pointer transition-all duration-300',
        'dark:bg-zinc-950 dark:border-zinc-800 bg-white border border-zinc-200',
        'active:scale-95',
        'hover:ring-1 hover:ring-zinc-300 dark:hover:ring-zinc-600',
        className,
      )}
      onClick={() => setTheme((theme) => (theme === 'light' ? 'dark' : 'light'))}
      role='button'
      tabIndex={0}
    >
      <div className='relative flex justify-between items-center w-full'>
        <div
          className={cn(
            'absolute flex justify-center items-center w-6 h-6 rounded-full',
            'transform transition-all duration-500 ease-in-out',
            'dark:bg-zinc-800 bg-gray-200',
            'dark:translate-x-0 translate-x-8',
          )}
        >
          <Sun
            className={cn(
              'absolute w-4 h-4 transition-transform duration-500',
              'dark:rotate-[-180deg] dark:opacity-0 dark:scale-0 rotate-0 opacity-100 scale-100',
            )}
            strokeWidth={1.5}
          />
          <Moon
            className={cn(
              'absolute w-4 h-4 transition-transform duration-500',
              'dark:rotate-0 dark:opacity-100 dark:scale-100 rotate-180 opacity-0 scale-0',
            )}
            strokeWidth={1.5}
          />
        </div>
      </div>
    </div>
  );
};

interface ThemeToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  iconClassName?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export const ThemeToggle = ({ className, iconClassName, variant = 'outline', size = 'icon', ...props }: ThemeToggleProps) => {
  const { setTheme } = useTheme();

  return (
    <Button
      variant={variant}
      size={size}
      onClick={() => setTheme((theme) => (theme === 'light' ? 'dark' : 'light'))}
      className={cn('rounded-full', className)}
      {...props}
    >
      <Sun
        className={cn('h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0', iconClassName)}
        data-testid='sun-icon'
      />
      <Moon
        className={cn(
          'absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100',
          iconClassName,
        )}
        data-testid='moon-icon'
      />
      <span className='sr-only'>Switch color mode</span>
    </Button>
  );
};
