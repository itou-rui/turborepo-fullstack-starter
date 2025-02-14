import { type NavBarProps } from '@/components/Navbar';
import { type FooterProps } from '@/components/Footer';
import { Home, User, Briefcase, FileText, Facebook, Instagram, Linkedin, Twitter } from '@/components/Icons';

export const navbarDatail: NavBarProps = {
  className: 'fixed',
  items: [
    { name: 'Home', url: '#', icon: Home },
    { name: 'About', url: '#', icon: User },
    { name: 'Projects', url: '#', icon: Briefcase },
    { name: 'Resume', url: '#', icon: FileText },
  ],
};

export const footerDatail: FooterProps = {
  title: 'Stay Connected',
  description: 'Join our newsletter for the latest updates and exclusive offers.',
  quickLinks: [
    { label: 'Home', href: '#' },
    { label: 'About Us', href: '#' },
    { label: 'Services', href: '#' },
    { label: 'Products', href: '#' },
    { label: 'Contact', href: '#' },
  ],
  contact: {
    address: ['123 Innovation Street', 'Tech City, TC 12345'],
    phone: '(123) 456-7890',
    email: 'hello@example.com',
  },
  socialLinks: [
    { icon: Facebook, label: 'Facebook', tooltip: 'Follow us on Facebook' },
    { icon: Twitter, label: 'Twitter', tooltip: 'Follow us on Twitter' },
    { icon: Instagram, label: 'Instagram', tooltip: 'Follow us on Instagram' },
    { icon: Linkedin, label: 'LinkedIn', tooltip: 'Connect with us on LinkedIn' },
  ],
  privacyLinks: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Settings', href: '#' },
  ],
  companyName: 'Turborepo Fullstack Starter',
};
