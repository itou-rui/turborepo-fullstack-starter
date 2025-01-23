import { render, screen, userEvent, waitFor } from '../../jest.setup';
import { SwitchModeButton } from '../../../components/Button/SwitchModeButton';

describe('SwitchModeButton', () => {
  /**
   * Set the initial theme to light before each test.
   */
  beforeEach(() => {
    document.documentElement.className = 'light';
  });

  /**
   * Test to check if the button renders with Sun and Moon icons.
   */
  it('renders the button with Sun and Moon icons', () => {
    render(<SwitchModeButton />);

    const sunIcon = screen.getByRole('button').querySelector('.lucide-sun');
    const moonIcon = screen.getByRole('button').querySelector('.lucide-moon');
    const button = screen.getByRole('button', { name: /switch color mode/i });

    expect(sunIcon).toBeInTheDocument();
    expect(moonIcon).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  /**
   * Test to check if the theme toggles between light and dark on button click.
   */
  it('toggles theme on button click', async () => {
    render(<SwitchModeButton />);
    const user = userEvent.setup();

    expect(document.documentElement).toHaveClass('light');

    const button = screen.getByRole('button', { name: /switch color mode/i });

    await user.click(button);
    await waitFor(() => {
      expect(document.documentElement).toHaveClass('dark');
    });

    await user.click(button);
    await waitFor(() => {
      expect(document.documentElement).toHaveClass('light');
    });
  });
});
