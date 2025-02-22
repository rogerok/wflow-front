import { z } from 'zod';

import { OrderByRequestConstant, PerPageConstant } from '../const';

export const PaginationRequestSchema = z.object({
  page: z.number().catch(1),
  perPage: z.number().default(PerPageConstant.Default),
});

export const OrderByCreatedAtRequestSchema = z.nativeEnum(
  OrderByRequestConstant,
);
