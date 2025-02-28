import { UserCreateRequestSchema } from '@shared/api';
import { z } from 'zod';

export const UserCreateFormSchema = UserCreateRequestSchema.merge(
  z.object({
    pseudonymFirstName: z.string(),
    pseudonymLastName: z.string(),
  }),
)
  .omit({ pseudonym: true })
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'Password and passwordConfirm must match',
    path: ['passwordConfirm'],
  });

export type UserCreateFormType = z.infer<typeof UserCreateFormSchema>;
