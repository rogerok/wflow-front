import { GoalEditRequestSchema } from '@shared/api';
import { validateDatesPeriod } from '@shared/lib';
import { z } from 'zod';

export const GoalEditFormSchema = GoalEditRequestSchema.merge(
  z.object({
    startDate: z.string(),
    endDate: z.string(),
    goalWords: z.coerce.number().min(2),
  }),
).superRefine((args, ctx) => {
  validateDatesPeriod(args.startDate, args.endDate, 'startDate', ctx);
});

export type GoalEditFormType = z.infer<typeof GoalEditFormSchema>;
