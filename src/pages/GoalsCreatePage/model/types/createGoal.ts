import { validateDatesPeriod } from '@shared/lib';
import { GoalCreateRequestSchema } from '@shared/types';
import { z } from 'zod';

export const GoalCreateFormSchema = GoalCreateRequestSchema.merge(
  z.object({
    startDate: z.string().date(),
    endDate: z.string().date(),
  }),
).superRefine((args, ctx) => {
  validateDatesPeriod(args.startDate, args.endDate, 'startDate', ctx);
});

export type GoalCreateFormType = z.infer<typeof GoalCreateFormSchema>;
