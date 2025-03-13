import { z } from 'zod';

export const QuotesResponseSchema = z.object({
  id: z.string().uuid(),
  text: z.string(),
});

export type QuotesResponseType = z.infer<typeof QuotesResponseSchema>;
