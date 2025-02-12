'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@workspace/ui/components/button';
import { cn } from '@workspace/ui/lib/utils';

interface ThemeToggleProps {
  className?: string;
}

export const ThemeSlideToggle = ({ className }: ThemeToggleProps) => {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <div
      className={cn(
        'flex w-16 h-8 p-1 rounded-full cursor-pointer transition-all duration-300',
        isDark ? 'bg-zinc-950 border border-zinc-800' : 'bg-white border border-zinc-200',
        className,
      )}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      role='button'
      tabIndex={0}
    >
      <div className='flex justify-between items-center w-full'>
        <div
          className={cn(
            'flex justify-center items-center w-6 h-6 rounded-full transition-transform duration-300',
            isDark ? 'transform translate-x-0 bg-zinc-800' : 'transform translate-x-8 bg-gray-200',
          )}
        >
          {isDark ? (
            <Moon className='w-4 h-4 text-white' strokeWidth={1.5} />
          ) : (
            <Sun className='w-4 h-4 text-gray-700' strokeWidth={1.5} />
          )}
        </div>
        <div
          className={cn(
            'flex justify-center items-center w-6 h-6 rounded-full transition-transform duration-300',
            isDark ? 'bg-transparent' : 'transform -translate-x-8',
          )}
        >
          {isDark ? (
            <Sun className='w-4 h-4 text-gray-500' strokeWidth={1.5} />
          ) : (
            <Moon className='w-4 h-4 text-black' strokeWidth={1.5} />
          )}
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
      />
      <Moon
        className={cn(
          'absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100',
          iconClassName,
        )}
      />
      <span className='sr-only'>Switch color mode</span>
    </Button>
  );
};
