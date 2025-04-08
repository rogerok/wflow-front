import {
  reportCreateRequest,
  ReportCreateRequestSchema,
  ReportCreateRequestType,
} from '@shared/api';
import { FormStore } from '@shared/lib';
import { userEvent } from '@storybook/test';
import { render, screen } from '@testing-library/react';

import { GoalReportForm } from './GoalReportForm';

vi.mock('@shared/api');

const mockedRequest = vi.mocked(reportCreateRequest);

describe('GoalReportForm test', () => {
  const mockedForm = new FormStore<ReportCreateRequestType>({
    schema: ReportCreateRequestSchema,
    defaultValues: {
      goalId: '8def78ff-19d3-4090-9581-a84bc592fc70',
      bookId: '8def78ff-19d3-4090-9581-a84bc592fc70',
      wordsAmount: 10,
    },
  });

  const onSubmit = vi.fn();

  test('Should submit', async () => {
    render(<GoalReportForm reportForm={mockedForm} onSubmit={onSubmit} />);

    await userEvent.click(screen.getByTestId('GoalReportFormSubmitButton'));

    expect(onSubmit).toHaveBeenCalledOnce();
  });

  test('Should not submit if data invalid', async () => {
    render(<GoalReportForm reportForm={mockedForm} onSubmit={onSubmit} />);
    mockedForm.fields.bookId.setValue('');

    await userEvent.click(screen.getByTestId('GoalReportFormSubmitButton'));

    expect(mockedRequest).not.toHaveBeenCalled();
  });
});
