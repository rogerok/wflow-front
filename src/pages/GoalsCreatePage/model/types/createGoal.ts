import { validateDatesPeriod } from '@shared/lib';
import { GoalCreateRequestSchema } from '@shared/types';
import { z } from 'zod';

export const GoalCreateFormSchema = GoalCreateRequestSchema.merge(
  z.object({
    startDate: z.string(),
    endDate: z.string(),
    goalWords: z.coerce.number(),
  }),
).superRefine((args, ctx) => {
  validateDatesPeriod(args.startDate, args.endDate, 'startDate', ctx);
});

export type GoalCreateFormType = z.infer<typeof GoalCreateFormSchema>;
