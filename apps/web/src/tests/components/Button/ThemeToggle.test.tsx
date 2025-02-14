import { render, screen, act } from '../../jest.setup';
import { ThemeToggle, ThemeSlideToggle } from '../../../components/Button/ThemeToggle';

describe('ThemeToggle', () => {
  beforeEach(() => {
    act(() => {
      document.documentElement.className = 'light';
    });
  });

  /**
   * Test to check if the button renders with Sun and Moon icons.
   */
  it('renders the button with Sun and Moon icons', async () => {
    let rendered;
    await act(async () => {
      rendered = render(<ThemeToggle />);
    });

    const sunIcon = await screen.findByTestId('sun-icon');
    const moonIcon = await screen.findByTestId('moon-icon');
    const button = await screen.findByRole('button', { name: /switch color mode/i });

    expect(sunIcon).toBeInTheDocument();
    expect(moonIcon).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  /**
   * Test to check if the theme toggles between light and dark on button click.
   */
  it('toggles theme on button click', async () => {
    await act(async () => {
      render(<ThemeToggle />);
    });

    const button = await screen.findByRole('button', { name: /switch color mode/i });

    expect(document.documentElement).toHaveClass('light');

    // First click - should switch to dark mode
    await act(async () => {
      button.click();
    });
    expect(document.documentElement).toHaveClass('dark');

    // Second click - should switch back to light mode
    await act(async () => {
      button.click();
    });
    expect(document.documentElement).toHaveClass('light');
  });
});

describe('ThemeSlideToggle', () => {
  beforeEach(() => {
    act(() => {
      document.documentElement.className = 'light';
    });
  });

  /**
   * Test to check if the slider renders with Sun and Moon icons
   */
  it('renders the slider with Sun and Moon icons', async () => {
    await act(async () => {
      render(<ThemeSlideToggle />);
    });

    const toggle = screen.getByRole('button');
    const sunIcon = toggle.querySelector('.lucide-sun');
    const moonIcon = toggle.querySelector('.lucide-moon');

    expect(toggle).toBeInTheDocument();
    expect(sunIcon).toBeInTheDocument();
    expect(moonIcon).toBeInTheDocument();
  });

  /**
   * Test to check if the theme toggles between light and dark on slider click
   */
  it('toggles theme on slider click', async () => {
    await act(async () => {
      render(<ThemeSlideToggle />);
    });

    const toggle = screen.getByRole('button');
    expect(document.documentElement).toHaveClass('light');

    // First click - should switch to dark mode
    await act(async () => {
      toggle.click();
    });
    expect(document.documentElement).toHaveClass('dark');

    // Second click - should switch back to light mode
    await act(async () => {
      toggle.click();
    });
    expect(document.documentElement).toHaveClass('light');
  });

  /**
   * Test to check if custom className is applied
   */
  it('applies custom className', async () => {
    const customClass = 'custom-toggle';
    await act(async () => {
      render(<ThemeSlideToggle className={customClass} />);
    });

    const toggle = screen.getByRole('button');
    expect(toggle).toHaveClass(customClass);
  });
});
