import { z } from 'zod';

export const UserResponseSchema = z.object({}).strict();

export type UserResponseType = z.infer<typeof UserResponseSchema>;
