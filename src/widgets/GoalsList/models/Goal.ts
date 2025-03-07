import { GoalResponseType } from '@shared/api';
import { formatDate } from '@shared/lib';
import { differenceInCalendarDays } from 'date-fns';

export class GoalModel {
  data: GoalResponseType;

  constructor(data: GoalResponseType) {
    this.data = data;
  }

  get wordsPerDay(): number {
    return Math.round(this.data.wordsPerDay);
  }

  get lastDays(): number {
    return differenceInCalendarDays(new Date(this.data.endDate), new Date());
  }

  dateFormatter(date: string): string {
    return formatDate(date, true);
  }

  get formattedCreatedDate(): string {
    return this.dateFormatter(this.data.createdAt);
  }

  get formattedStartDate(): string {
    return this.dateFormatter(this.data.startDate);
  }

  get formattedEndDate(): string {
    return this.dateFormatter(this.data.endDate);
  }
}
