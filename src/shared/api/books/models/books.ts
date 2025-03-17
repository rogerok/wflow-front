import { z } from 'zod';

import {
  OrderByCreatedAtRequestSchema,
  PaginationRequestSchema,
} from '../../models/requests';

export const BookResponseSchema = z
  .object({
    createdAt: z.string(),
    description: z.string().nullable(),
    id: z.string().uuid(),
    name: z.string(),
    updatedAt: z.string(),
    userId: z.string().uuid(),
  })
  .strict();

export type BookResponseType = z.infer<typeof BookResponseSchema>;

export type BooksListResponseType = BookResponseType[];

export const BookFormRequestSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().min(2).max(1000).nullable(),
});

export type BookFormRequestType = z.infer<typeof BookFormRequestSchema>;

export const BooksRequestSchema = z
  .object({
    orderById: OrderByCreatedAtRequestSchema.catch('createdAt desc'),
  })
  .merge(PaginationRequestSchema);

export type BooksRequestType = z.infer<typeof BooksRequestSchema>;
