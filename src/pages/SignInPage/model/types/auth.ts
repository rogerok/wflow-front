import { EmailSchema, PasswordSchema } from '@shared';
import { z } from 'zod';

export const AuthRequestSchema = z.object({
  email: EmailSchema,
  password: PasswordSchema,
});

export type AuthRequestType = z.infer<typeof AuthRequestSchema>;

export const AuthResponseSchema = z.object({
  token: z.string(),
});

export type AuthResponseType = z.infer<typeof AuthResponseSchema>;
