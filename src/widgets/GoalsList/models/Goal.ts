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

  get daysRemaining(): number {
    return differenceInCalendarDays(this.data.endDate, new Date());
  }

  get localizedRemainingDays(): string | null {
    if (this.data.isExpired || this.data.isFinished) {
      return null;
    }

    if (this.daysRemaining <= 0) {
      return 'Срок истек';
    }

    const rtf = new Intl.RelativeTimeFormat('ru', { numeric: 'auto' });
    return `До окончания цели ${rtf.format(this.daysRemaining, 'day').replace('через ', '')}`;
  }
}
