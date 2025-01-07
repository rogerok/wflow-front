import { z } from 'zod';

export const EmptyStringSchema = z.string().length(0);
