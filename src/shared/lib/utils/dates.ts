import { UTCDate } from '@date-fns/utc';
import { format } from 'date-fns';

export const formatDate = (date: string, withTime?: boolean): string => {
  return format(
    new UTCDate(date),
    withTime ? 'dd-MM-yyyy HH:mm' : 'dd-MM-yyyy',
  );
};
