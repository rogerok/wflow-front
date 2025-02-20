import { z } from 'zod';

import {
  OrderByCreatedAtRequestSchema,
  PaginationRequestSchema,
} from './requests';

export const GoalResponseSchema = z.object({
  bookId: z.string().uuid(),
  createdAt: z.string(),
  description: z.string().nullable(),
  endDate: z.string(),
  id: z.string().uuid(),
  isExpired: z.boolean(),
  isFinished: z.boolean(),
  startDate: z.string(),
  title: z.string(),
  updatedAt: z.string(),
  wordPerDay: z.string(),
  writtenWords: z.string(),
});
export type GoalResponseType = z.infer<typeof GoalResponseSchema>;

export const GoalsListResponseSchema = z.array(GoalResponseSchema);
export type GoalsListResponseType = z.infer<typeof GoalsListResponseSchema>;

export const GoalRequestSchema = z
  .object({
    bookId: z.string().uuid().catch('').nullable(),
    orderById: OrderByCreatedAtRequestSchema.catch('createdAt desc'),
  })
  .merge(PaginationRequestSchema)
  .partial();
export type GoalRequestType = z.infer<typeof GoalRequestSchema>;

export const GoalCreateRequestSchema = z.object({
  bookId: z.string().uuid(),
  description: z.string().max(255).nullable(),
  endDate: z.string(),
  goalWords: z.number().min(2),
  startDate: z.string(),
  title: z.string().min(2).max(255),
});

export type GoalFormRequestType = z.infer<typeof GoalCreateRequestSchema>;
