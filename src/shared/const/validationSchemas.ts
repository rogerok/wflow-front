import { z } from 'zod';

export const EmptyStringSchema = z.string().length(0);

export const EmailSchema = z.string().email().max(255);
export const NameSchema = z.string().max(50);
export const PasswordSchema = z.string().min(8).max(255);
