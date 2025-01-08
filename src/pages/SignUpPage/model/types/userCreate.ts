import {
  EmailSchema,
  EmptyStringSchema,
  NameSchema,
  PasswordSchema,
} from '@shared';
import { z } from 'zod';

const PseudonymSchema = z.object({
  firstName: NameSchema.or(EmptyStringSchema).nullable(),
  lastName: NameSchema.or(EmptyStringSchema).nullable(),
});

const SocialSchema = z.object({
  instagram: z.string().url().or(EmptyStringSchema).nullable(),
  telegram: z.string().url().or(EmptyStringSchema).nullable(),
  tiktok: z.string().url().or(EmptyStringSchema).nullable(),
  vk: z.string().url().or(EmptyStringSchema).nullable(),
});

export const UserCreateRequestSchema = z
  .object({
    email: EmailSchema,
    firstName: NameSchema,
    lastName: NameSchema.or(EmptyStringSchema).nullable(),
    middleName: NameSchema.or(EmptyStringSchema).nullable(),
    password: PasswordSchema,
    passwordConfirm: PasswordSchema,
    pseudonym: PseudonymSchema,
    socialLinks: SocialSchema,
    bornDate: z.string().nullable(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'Password and passwordConfirm must match',
    path: ['passwordConfirm'],
  });

export type UserCreateRequestType = z.infer<typeof UserCreateRequestSchema>;

export const UserCreateResponseSchema = z.object({
  id: z.string().uuid(),
});

export type UserCreateResponseType = z.infer<typeof UserCreateResponseSchema>;
