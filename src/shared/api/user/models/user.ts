import { z } from 'zod';

import {
  EmailSchema,
  EmptyStringSchema,
  NameSchema,
  PasswordSchema,
  RolesConstant,
} from '../../../const';

export const RolesSchema = z.nativeEnum(RolesConstant);

export type RolesType = z.infer<typeof RolesSchema>;

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

export const UserCreateRequestSchema = z.object({
  email: EmailSchema,
  firstName: NameSchema.min(2),
  lastName: NameSchema.or(EmptyStringSchema).nullable(),
  middleName: NameSchema.or(EmptyStringSchema).nullable(),
  password: PasswordSchema,
  passwordConfirm: PasswordSchema,
  pseudonym: PseudonymSchema,
  socialLinks: SocialSchema,
  bornDate: z.string().nullable(),
});

export type UserCreateRequestType = z.infer<typeof UserCreateRequestSchema>;
