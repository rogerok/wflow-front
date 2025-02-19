import { z } from 'zod';

export const validateDatesPeriod = (
  from: string | null | undefined,
  to: string | null | undefined,
  fromPath: string,
  ctx: z.RefinementCtx,
): void => {
  if (from && to && new Date(from).getTime() > new Date(to).getTime()) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Дата начала не может быть раньше даты окончания',
      path: [fromPath],
    });
  }
};
