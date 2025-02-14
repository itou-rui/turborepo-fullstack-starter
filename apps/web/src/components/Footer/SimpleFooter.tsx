'use client';

import { type LucideIcon } from 'lucide-react';
import { Button } from '@workspace/ui/components/button';
import { Input } from '@workspace/ui/components/input';
import { Label } from '@workspace/ui/components/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@workspace/ui/components/tooltip';
import { ThemeSlideToggle } from '@/components/Button';
import { Send } from '@/components/Icons';

export interface SocialLink {
  icon: LucideIcon;
  label: string;
  tooltip: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterProps {
  title?: string;
  description?: string;
  quickLinks?: FooterLink[];
  contact?: {
    address: string[];
    phone: string;
    email: string;
  };
  socialLinks?: SocialLink[];
  privacyLinks?: FooterLink[];
  companyName?: string;
}

export const SimpleFooter = ({
  title,
  description,
  quickLinks,
  contact,
  socialLinks,
  privacyLinks,
  companyName,
}: FooterProps) => {
  return (
    <footer className='relative border-t bg-background text-foreground transition-colors duration-300'>
      <div className='container mx-auto px-4 py-12 md:px-6 lg:px-8'>
        <div className='grid gap-12 md:grid-cols-2 lg:grid-cols-4'>
          <div className='relative'>
            <h2 className='mb-4 text-3xl font-bold tracking-tight'>{title}</h2>
            <p className='mb-6 text-muted-foreground'>{description}</p>
            <form className='relative'>
              <Input type='email' placeholder='Enter your email' className='pr-12 backdrop-blur-sm' />
              <Button
                type='submit'
                size='icon'
                className='absolute right-1 top-1 h-7 w-7 rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105'
              >
                <Send className='h-4 w-4' />
                <span className='sr-only'>Subscribe</span>
              </Button>
            </form>
            <div className='absolute -right-4 top-0 h-24 w-24 rounded-full bg-primary/10 blur-2xl' />
          </div>
          <div>
            <h3 className='mb-4 text-lg font-semibold'>Quick Links</h3>
            <nav className='space-y-2 text-sm'>
              {quickLinks?.map((link, index) => (
                <a key={index} href={link.href} className='block transition-colors hover:text-primary'>
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
          <div>
            <h3 className='mb-4 text-lg font-semibold'>Contact Us</h3>
            <address className='space-y-2 text-sm not-italic'>
              {contact?.address.map((line, index) => <p key={index}>{line}</p>)}
              <p>Phone: {contact?.phone}</p>
              <p>Email: {contact?.email}</p>
            </address>
          </div>
          <div className='relative'>
            <h3 className='mb-4 text-lg font-semibold'>Follow Us</h3>
            <div className='mb-6 flex space-x-4'>
              {socialLinks?.map((social, index) => (
                <TooltipProvider key={index}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant='outline' size='icon' className='rounded-full'>
                        <social.icon className='h-4 w-4' />
                        <span className='sr-only'>{social.label}</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{social.tooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
            <div className='flex items-center space-x-2'>
              <ThemeSlideToggle />
              <Label htmlFor='dark-mode' className='sr-only'>
                Toggle dark mode
              </Label>
            </div>
          </div>
        </div>
        <div className='mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 text-center md:flex-row'>
          <p className='text-sm text-muted-foreground'>
            © {new Date().getFullYear()} {companyName}. All rights reserved.
          </p>
          <nav className='flex gap-4 text-sm'>
            {privacyLinks?.map((link, index) => (
              <a key={index} href={link.href} className='transition-colors hover:text-primary'>
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
};
