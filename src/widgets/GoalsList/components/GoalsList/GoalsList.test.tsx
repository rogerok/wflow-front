import { GoalResponseType } from '@shared/api';
import { render, screen } from '@testing-library/react';
import { ReactNode } from 'react';

import { GoalsList } from './GoalsList';

describe('GoalsList widget', () => {
  const mockData: GoalResponseType = {
    bookId: '8def78ff-19d3-4090-9581-a84bc592fc70',
    createdAt: '2025-03-05T18:25:09Z',
    endDate: '2025-03-20T23:59:59Z',
    goalWords: 200,
    id: 'bb9d4637-b054-440f-b54e-f82ff5e7b13f',
    isFinished: false,
    startDate: '2025-03-05T23:59:59Z',
    title: '232',
    updatedAt: '2025-04-08T00:01:02Z',
    description: '232323',
    isExpired: true,
    writtenWords: 0,
    wordsPerDay: 0,
  };

  const tId = 'action';

  const actions = (): ReactNode => <button data-testid={tId}>1234</button>;

  test('should render correctly', () => {
    render(<GoalsList data={[mockData]} actions={actions} />);

    expect(screen.getByText(mockData.title)).toBeInTheDocument();
    expect(screen.getByTestId(tId)).toBeInTheDocument();
  });
});
