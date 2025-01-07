import { EmptyStringSchema } from '@shared';
import { z } from 'zod';

const PseudonymSchema = z.object({
  firstName: z.string().min(2).max(50).or(EmptyStringSchema).nullable(),
  lastName: z.string().min(2).max(50).or(EmptyStringSchema).nullable(),
});

const SocialSchema = z.object({
  instagram: z.string().url().or(EmptyStringSchema).nullable(),
  telegram: z.string().url().or(EmptyStringSchema).nullable(),
  tiktok: z.string().url().or(EmptyStringSchema).nullable(),
  vk: z.string().url().or(EmptyStringSchema).nullable(),
});

export const UserCreateRequestSchema = z
  .object({
    email: z.string().email().max(255),
    firstName: z.string().min(2).max(50),
    lastName: z.string().min(2).max(50).or(EmptyStringSchema).nullable(),
    middleName: z.string().min(2).max(50).or(EmptyStringSchema).nullable(),
    password: z.string().min(8).max(255),
    passwordConfirm: z.string().min(8).max(255),
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
