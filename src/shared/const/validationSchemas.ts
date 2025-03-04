import { z } from 'zod';

import { ValidationMessages } from '../const/text/validationMessages';
import { passwordRegex } from '../lib/validation/validation';

export const EmptyStringSchema = z.string().length(0);

export const EmailSchema = z.string().toLowerCase().email().max(255);
export const NameSchema = z.string().max(50);
export const PasswordSchema = z
  .string()
  .regex(passwordRegex, {
    message: ValidationMessages.invalidPassword(),
  })
  .min(8)
  .max(255);
