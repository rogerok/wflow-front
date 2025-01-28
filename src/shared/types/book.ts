import { z } from 'zod';

export const BookResponseSchema = z.object({
  createdAt: z.string(),
  description: z.string().nullable(),
  id: z.string().uuid(),
  name: z.string(),
  updatedAt: z.string(),
  userId: z.string().uuid(),
});

export type BooksResponseType = z.infer<typeof BookResponseSchema>;

export type BooksListResponseType = BooksResponseType[];
