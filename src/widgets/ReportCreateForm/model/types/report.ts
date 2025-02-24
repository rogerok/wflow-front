import { EmptyStringSchema } from '@shared/const';
import { z } from 'zod';

export const ReportCreateRequestSchema = z.object({
  bookId: z.string().uuid(),
  goalId: z.string().uuid(),
  wordsAmount: z.coerce.number().min(2),
  title: z.string().min(2).max(255),
  description: z.string().min(2).max(255).or(EmptyStringSchema).nullable(),
});

export type ReportCreateRequestType = z.infer<typeof ReportCreateRequestSchema>;
