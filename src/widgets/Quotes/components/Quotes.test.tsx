import { getQuote } from '@shared/api';
import { createMockedAxiosResponse } from '@shared/tests';
import { render, screen, waitFor } from '@testing-library/react';

import { Quotes } from './Quotes';

vi.mock('@shared/api');

const mocked = vi.mocked(getQuote);

describe('Quotes widget', () => {
  test('renders correctly', async () => {
    mocked.mockResolvedValueOnce(
      createMockedAxiosResponse({
        text: 'text',
        id: '123',
      }),
    );
    render(<Quotes />);
    expect(mocked).toHaveBeenCalled();

    await waitFor(() => {
      expect(screen.getByTestId('Quotes')).toHaveTextContent('text');
    });
  });

  test('renders nothing if request is loading', async () => {
    render(<Quotes />);

    await waitFor(() => {
      expect(screen.queryByTestId('Quotes')).not.toBeInTheDocument();
    });
  });
});
