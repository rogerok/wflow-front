import { describe } from 'vitest';
import { z, ZodIssueCode } from 'zod';

import { ValidationMessages } from '../../const/text/validationMessages';
import { validateDatesPeriod } from './validation';

describe('validateDatesPeriod func', () => {
  const later = new Date().toString();
  const earlier =
    'Fri Apr 11 2024 00:00:00 GMT+0300 (Москва, стандартное время)';

  const fromPath = 'from';

  it('should add an issue', () => {
    const ctxMock: z.RefinementCtx = {
      addIssue: vi.fn(),
      path: [fromPath],
    };

    const validationMsg = {
      required: vi.fn(() => ValidationMessages.datesPeriod()),
    };

    validateDatesPeriod(later, earlier, fromPath, ctxMock);

    expect(ctxMock.addIssue).toHaveBeenCalledWith({
      message: validationMsg.required(),
      path: [fromPath],
      code: ZodIssueCode.custom,
    });

    expect(validationMsg.required).toHaveBeenCalled();
  });

  it('should not add an issue', () => {
    const ctxMock: z.RefinementCtx = {
      addIssue: vi.fn(),
      path: [fromPath],
    };

    const validationMsg = {
      required: vi.fn(() => ValidationMessages.datesPeriod()),
    };

    validateDatesPeriod(earlier, later, fromPath, ctxMock);

    expect(ctxMock.addIssue).not.toHaveBeenCalled();

    expect(validationMsg.required).not.toHaveBeenCalled();
  });
});
