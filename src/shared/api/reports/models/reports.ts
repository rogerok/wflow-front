import { z } from 'zod';

import { EmptyStringSchema } from '../../../const';

export const ReportCreateRequestSchema = z.object({
  bookId: z.string().uuid(),
  goalId: z.string().uuid(),
  wordsAmount: z.coerce.number().min(2),
  title: z.string().min(2).max(255),
  description: z.string().min(2).max(255).or(EmptyStringSchema).nullable(),
});

export type ReportCreateRequestType = z.infer<typeof ReportCreateRequestSchema>;

export const ReportCreateResponseSchema = z.object({
  reportId: z.string().uuid(),
  writtenWords: z.number(),
  wordsPerDay: z.number(),
});

export type ReportCreateResponseType = z.infer<
  typeof ReportCreateResponseSchema
>;
