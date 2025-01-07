import { z } from 'zod';

export const UserResponseSchema = z.object({});

export type UserResponseType = z.infer<typeof UserResponseSchema>;
