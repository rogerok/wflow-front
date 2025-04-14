import { GoalResponseType } from '@shared/api';
import { formatDate } from '@shared/lib';
import { differenceInCalendarDays, isBefore } from 'date-fns';

export class GoalModel {
  data: GoalResponseType;

  constructor(data: GoalResponseType) {
    this.data = data;
  }

  dateFormatter(date: string): string {
    return formatDate(date);
  }

  get wordsPerDay(): number {
    return Math.round(this.data.wordsPerDay);
  }

  get createdDate(): string {
    return this.dateFormatter(this.data.createdAt);
  }

  get startDate(): string {
    return this.dateFormatter(this.data.startDate);
  }

  get endDate(): string {
    return this.dateFormatter(this.data.endDate);
  }

  get daysRemaining(): number {
    return differenceInCalendarDays(this.data.endDate, new Date()) + 1;
  }

  get isExpiredOrFinished(): boolean {
    return this.data.isExpired || this.data.isFinished;
  }

  get isTermExpired(): boolean {
    return this.daysRemaining < 0;
  }

  get isNotStarted(): boolean {
    return isBefore(new Date(), this.data.startDate);
  }

  get localizedRemainingDays(): string {
    const rtf = new Intl.RelativeTimeFormat('ru', { numeric: 'auto' });
    return rtf.format(this.daysRemaining, 'day');
  }

  get termLabel(): string | null {
    if (this.isExpiredOrFinished) {
      return null;
    }

    if (this.isTermExpired) {
      return 'Срок истек';
    }

    if (this.isNotStarted) {
      return 'Цель ещё не начата';
    }

    return `До окончания цели ${this.localizedRemainingDays.replace('через ', '')}`;
  }
}
