import { z } from 'zod';

export const EnvSchema = z.object({
  VITE_API_URL: z.string({
    required_error: 'Не задана переменная окружения VITE_API_URL',
  }),
});
