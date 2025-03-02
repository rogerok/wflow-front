import { GoalRequestType } from '../../api';
import { OrderByRequestConstant } from '../requestConstants';

export const GoalsListRequestDefaultParams: GoalRequestType = {
  bookId: null,
  page: 1,
  perPage: 0,
  orderById: OrderByRequestConstant.CreatedAtDesc,
};
