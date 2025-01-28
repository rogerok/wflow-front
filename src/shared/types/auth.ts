import { z } from 'zod';

import { EmailSchema, PasswordSchema } from '../const/validationSchemas';

export const AuthRequestSchema = z.object({
  email: EmailSchema,
  password: PasswordSchema,
});

export type AuthRequestType = z.infer<typeof AuthRequestSchema>;

export const AuthResponseSchema = z.object({
  token: z.string(),
});

export type AuthResponseType = z.infer<typeof AuthResponseSchema>;

export const TokenSchema = z.object({
  exp: z.number(),
  iat: z.number(),
  iss: z.string(),
  sub: z.string(),
});

export type TokenType = z.infer<typeof TokenSchema>;

export const RefreshTokenResponseSchema = z
  .object({
    token: z.string(),
  })
  .strict();

export type RefreshTokenResponseType = z.infer<
  typeof RefreshTokenResponseSchema
>;
