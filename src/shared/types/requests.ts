import { z } from 'zod';

import { OrderByRequestConstant } from '../const';

export const PaginationRequestSchema = z.object({
  page: z.number(),
  perPage: z.number(),
});

export const OrderByCreatedAtRequestSchema = z.nativeEnum(
  OrderByRequestConstant,
);
