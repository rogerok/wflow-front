import { OrderByCreatedAtRequestType } from '@shared/api';
import { OrderByRequestConstant } from '@shared/const';
import { SortOptionType } from '@shared/types';

export const BooksSortOptions: SortOptionType<OrderByCreatedAtRequestType>[] = [
  {
    label: 'Сначала старые',
    value: OrderByRequestConstant.CreatedAtAsc,
  },
  {
    label: 'Сначала новые',
    value: OrderByRequestConstant.CreatedAtDesc,
  },
];
