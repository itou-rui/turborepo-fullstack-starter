'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { type LucideIcon } from 'lucide-react';
import { cn } from '@workspace/ui/lib/utils';

export interface NavItem {
  name: string;
  url: string;
  icon: LucideIcon;
}

export interface NavBarProps {
  items: NavItem[];
  className?: string;
}

export const TurbelightNavBar = ({ items, className }: NavBarProps) => {
  const [activeTab, setActiveTab] = useState(items[0].name);
  const [, setIsMobile] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < lastScrollY) {
        setVisible(true);
      } else if (currentScrollY > 50) {
        setVisible(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlNavbar);

    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      className={cn(
        'fixed sm:top-0 bottom-0 left-1/2 -translate-x-1/2 z-50',
        'transition-all duration-300',
        'mb-6 sm:mb-0 sm:mt-6 w-fit h-fit',
        visible ? 'translate-y-0 opacity-100' : 'sm:-translate-y-full translate-y-full opacity-0', // スライドの方向を画面サイズによって変更
        className,
      )}
    >
      <div className='flex items-center gap-3 bg-background/5 border border-border backdrop-blur-lg py-1 px-1 rounded-full shadow-lg'>
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.name;

          return (
            <Link
              key={item.name}
              href={item.url}
              onClick={() => setActiveTab(item.name)}
              className={cn(
                'relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-colors',
                'text-foreground/80 hover:text-primary',
                isActive && 'bg-muted text-primary',
              )}
            >
              <span className='hidden md:inline'>{item.name}</span>
              <span className='md:hidden'>
                <Icon size={18} strokeWidth={2.5} />
              </span>
              {isActive && (
                <motion.div
                  layoutId='lamp'
                  className='absolute inset-0 w-full bg-primary/5 rounded-full -z-10'
                  initial={false}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <div className='absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-t-full'>
                    <div className='absolute w-12 h-6 bg-primary/20 rounded-full blur-md -top-2 -left-2' />
                    <div className='absolute w-8 h-6 bg-primary/20 rounded-full blur-md -top-1' />
                    <div className='absolute w-4 h-4 bg-primary/20 rounded-full blur-sm top-0 left-2' />
                  </div>
                </motion.div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
