import { z } from 'zod';

import { EmailSchema, EmptyStringSchema, NameSchema } from '../const';

export const PseudonymSchema = z.object({
  firstName: NameSchema.or(EmptyStringSchema).nullable(),
  lastName: NameSchema.or(EmptyStringSchema).nullable(),
});

export const SocialSchema = z.object({
  instagram: z.string().url().or(EmptyStringSchema).nullable(),
  telegram: z.string().url().or(EmptyStringSchema).nullable(),
  tiktok: z.string().url().or(EmptyStringSchema).nullable(),
  vk: z.string().url().or(EmptyStringSchema).nullable(),
});

export const UserResponseSchema = z
  .object({
    email: EmailSchema,
    createdAt: z.string(),
    firstName: NameSchema,
    lastName: NameSchema.or(EmptyStringSchema).nullable(),
    middleName: NameSchema.or(EmptyStringSchema).nullable(),
    pseudonym: PseudonymSchema,
    socialLinks: SocialSchema,
    bornDate: z.string().nullable(),
  })
  .strict();

export type UserResponseType = z.infer<typeof UserResponseSchema>;
