import { z } from 'zod';

export const CreateResponseSchema = z
  .object({
    id: z.string().uuid(),
  })
  .strict();

export type CreateResponseType = z.infer<typeof CreateResponseSchema>;
