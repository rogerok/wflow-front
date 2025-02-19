import { validateDatesPeriod } from '@shared/lib';
import { GoalCreateRequestSchema } from '@shared/types';
import { z } from 'zod';

export const GoalCreateFormSchema = GoalCreateRequestSchema.merge(
  z.object({
    startDate: z.string().datetime({ offset: true, local: true }),
    endDate: z.string().datetime({ offset: true, local: true }),
    goalWords: z.coerce.number().min(2),
  }),
).superRefine((args, ctx) => {
  validateDatesPeriod(args.startDate, args.endDate, 'startDate', ctx);
});

export type GoalCreateFormType = z.infer<typeof GoalCreateFormSchema>;
