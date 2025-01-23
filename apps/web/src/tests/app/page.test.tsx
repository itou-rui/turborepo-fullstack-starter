import { render, screen, userEvent, waitFor } from '../jest.setup';
import '@testing-library/jest-dom';
import RootPage from '@/app/(RootPage)/page';

describe('RootPage', () => {
	/**
	 * Test to check if the hero section renders correctly.
	 */
	it('renders hero section correctly', () => {
		render(<RootPage />);
		expect(screen.getByText('Turborepo Powered')).toBeInTheDocument();
		expect(
			screen.getByText((content, element) => {
				return element?.tagName.toLowerCase() === 'h1' && content.includes('Modern');
			}),
		).toBeInTheDocument();
		expect(screen.getByText('Monorepo')).toBeInTheDocument();
		expect(
			screen.getByText((content, element) => {
				return element?.tagName.toLowerCase() === 'h1' && content.includes('Full Stack Development Environment');
			}),
		).toBeInTheDocument();
		expect(
			screen.getByText((content, element) => {
				return (
					element?.tagName.toLowerCase() === 'p' &&
					content.includes('A high-performance application platform combining Next.js, Nest.js, and Nginx')
				);
			}),
		).toBeInTheDocument();
	});

	/**
	 * Test to check if all application cards render correctly.
	 */
	it('renders all application cards', () => {
		render(<RootPage />);
		expect(screen.getByText('Next.js')).toBeInTheDocument();
		expect(screen.getByText('Nest.js')).toBeInTheDocument();
		expect(screen.getByText('Nginx')).toBeInTheDocument();
	});

	/**
	 * Test to check if all package cards render correctly when the packages tab is selected.
	 */
	it('renders all package cards when packages tab is selected', async () => {
		render(<RootPage />);
		await userEvent.click(screen.getByRole('tab', { name: /Packages/i }));

		await waitFor(() => {
			expect(screen.getByText('Shared Packages')).toBeInTheDocument();
			expect(screen.getByText('TypeScript Config')).toBeInTheDocument();
			expect(screen.getByText('UI Components')).toBeInTheDocument();
		});
	});

	/**
	 * Test to check if action buttons in the feature section render correctly.
	 */
	it('renders action buttons in feature section', () => {
		render(<RootPage />);
		expect(screen.getByText('Quick Start')).toBeInTheDocument();
		expect(screen.getByText('Setup Guide')).toBeInTheDocument();
	});

	/**
	 * Test to check if tabs switch correctly.
	 */
	it('switches tabs correctly', async () => {
		render(<RootPage />);
		const appsTab = screen.getByRole('tab', { name: /Applications/i });
		const packagesTab = screen.getByRole('tab', { name: /Packages/i });

		// More robust way of checking initial state
		const initialAppsTabSelected = appsTab.getAttribute('aria-selected') === 'true';
		const initialPackagesTabSelected = packagesTab.getAttribute('aria-selected') === 'true';

		expect(initialAppsTabSelected).toBe(true);
		expect(initialPackagesTabSelected).toBe(false);

		// Use userEvent for more natural interaction
		await userEvent.click(packagesTab);

		// Wait for potential async updates
		await waitFor(() => {
			expect(appsTab).toHaveAttribute('aria-selected', 'false');
			expect(packagesTab).toHaveAttribute('aria-selected', 'true');
		});
	});
});
