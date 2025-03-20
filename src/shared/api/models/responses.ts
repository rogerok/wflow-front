import { z } from 'zod';

export const CreateResponseSchema = z
  .object({
    id: z.string().uuid(),
  })
  .strict();

export type CreateResponseType = z.infer<typeof CreateResponseSchema>;

export const SuccessResponseSchema = z.object({
  status: z.boolean(),
});

export type SuccessResponseType = z.infer<typeof SuccessResponseSchema>;
