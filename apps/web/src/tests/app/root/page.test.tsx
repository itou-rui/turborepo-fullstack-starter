import { render, screen, act } from '../../jest.setup';
import '@testing-library/jest-dom';
import RootPage from '@/app/(RootPage)/page';

describe('RootPage', () => {
  /**
   * Test to check if the hero section renders correctly.
   */
  it('renders hero section correctly', async () => {
    await act(async () => {
      render(await RootPage());
    });
    expect(screen.getByText('Turborepo Starter Kit')).toBeInTheDocument();
    expect(screen.getByText(/Production-ready full-stack monorepo starter/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Get Started' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Documentation' })).toBeInTheDocument();
  });

  /**
   * Test to check if all feature cards render correctly.
   */
  it('renders all feature cards', async () => {
    await act(async () => {
      render(await RootPage());
    });
    expect(screen.getByText('Next.js 14')).toBeInTheDocument();
    expect(screen.getByText('NestJS Backend')).toBeInTheDocument();
    expect(screen.getByText('TailwindCSS')).toBeInTheDocument();
    expect(screen.getByText('Cloud Ready')).toBeInTheDocument();
  });

  /**
   * Test to check if all bento features render correctly.
   */
  it('renders all bento features', async () => {
    await act(async () => {
      render(await RootPage());
    });
    expect(screen.getByText('Monorepo Structure')).toBeInTheDocument();
    expect(screen.getByText('Shared Packages')).toBeInTheDocument();
    expect(screen.getByText('Full Stack Ready')).toBeInTheDocument();
    expect(screen.getByText('Development Tools')).toBeInTheDocument();
    expect(screen.getByText('CI/CD Ready')).toBeInTheDocument();
  });

  /**
   * Test to check if the hero section links are working correctly.
   */
  it('renders hero section links with correct attributes', async () => {
    await act(async () => {
      render(await RootPage());
    });
    const getStartedLink = screen.getByRole('link', { name: 'Get Started' });
    const documentationLink = screen.getByRole('link', { name: 'Documentation' });

    expect(getStartedLink).toHaveAttribute('href', 'https://github.com/itou-rui/turborepo-fullstack-starter');
    expect(documentationLink).toHaveAttribute('href', '#');
  });

  /**
   * Test to check if feature descriptions are rendered correctly.
   */
  it('renders feature descriptions correctly', async () => {
    await act(async () => {
      render(await RootPage());
    });
    expect(screen.getByText(/Built with the latest Next.js features/)).toBeInTheDocument();
    expect(screen.getByText(/Enterprise-ready backend with TypeORM/)).toBeInTheDocument();
    expect(screen.getByText(/Modern UI with shadcn\/ui components/)).toBeInTheDocument();
    expect(screen.getByText(/Deployment configurations for Google Cloud Run/)).toBeInTheDocument();
  });
});
