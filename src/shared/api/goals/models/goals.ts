import { z } from 'zod';

import {
  OrderByCreatedAtRequestSchema,
  PaginationRequestSchema,
} from '../../models/requests';

export const GoalResponseSchema = z
  .object({
    bookId: z.string().uuid(),
    createdAt: z.string(),
    description: z.string().nullable(),
    endDate: z.string(),
    goalWords: z.number(),
    id: z.string().uuid(),
    isExpired: z.boolean(),
    isFinished: z.boolean(),
    startDate: z.string(),
    title: z.string(),
    updatedAt: z.string(),
    wordsPerDay: z.number(),
    writtenWords: z.number(),
  })
  .strict();

export type GoalResponseType = z.infer<typeof GoalResponseSchema>;

export const GoalsListResponseSchema = z.array(GoalResponseSchema);
export type GoalsListResponseType = z.infer<typeof GoalsListResponseSchema>;

export const GoalRequestSchema = z
  .object({
    bookId: z.string().uuid().catch('').nullable(),
    orderBy: OrderByCreatedAtRequestSchema.catch('createdAt desc'),
  })
  .merge(PaginationRequestSchema);

export type GoalRequestType = z.infer<typeof GoalRequestSchema>;

export const GoalCreateRequestSchema = z.object({
  bookId: z.string().uuid(),
  description: z.string().max(255).nullable(),
  endDate: z.string(),
  goalWords: z.number().min(2),
  startDate: z.string(),
  title: z.string().min(2).max(255),
});

export type GoalCreateRequestType = z.infer<typeof GoalCreateRequestSchema>;

export const GoalEditRequestSchema = z.object({
  description: z.string().max(255).nullable(),
  endDate: z.string(),
  goalWords: z.number().min(2),
  startDate: z.string(),
  title: z.string().max(255),
});

export type GoalEditRequestType = z.infer<typeof GoalEditRequestSchema>;
