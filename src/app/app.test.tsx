import { act, fireEvent, render, screen } from '@testing-library/react';
import App from './app';
import { beforeAll } from 'vitest';

describe('App', () => {
  beforeAll(() => {});

  test('renders App component', async () => {
    await act(async () => {
      render(<App />);
    });

    expect(await screen.findByTestId('ThemeSwitcher')).toBeInTheDocument();

    fireEvent.click(await screen.findByTestId('ThemeSwitcher'));
    expect(screen.getByTestId('App')).toHaveClass('App dark');
    fireEvent.click(screen.getByTestId('ThemeSwitcher'));
    expect(screen.getByTestId('App')).toHaveClass('App light');
  });
});
