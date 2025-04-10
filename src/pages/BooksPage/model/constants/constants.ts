import { OrderByRequestConstant } from '@shared/const';
import { SortOptionsTypes } from '@shared/types';

export const BooksSortOptions: SortOptionsTypes = [
  {
    label: 'Сначала старые',
    value: OrderByRequestConstant.CreatedAtAsc,
  },
  {
    label: 'Сначала новые',
    value: OrderByRequestConstant.CreatedAtAsc,
  },
];
