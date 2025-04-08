import { z } from 'zod';

export const StatisticsUserResponseSchema = z.object({
  // AboveAverageReportsRate - процент отчетов, где количество написанных слов больше среднего числа слов по всем отчетам
  aboveAverageReportsRate: z.number(),
  // ActivityConsistencyRate - процент дней с активностью по отношению к общему числу дней с момента первого отчета
  activityConsistencyRate: z.number(),
  // AverageDaysToComplete - среднее количество дней, которые пользователь тратит на выполнение цели
  averageDaysToComplete: z.number(),
  // AverageWordsPerDay - среднее количество слов, которые пользователь пишет за день
  averageWordsPerDay: z.number(),
  // AverageWordsPerReport - среднее количество слов в одном отчете пользователя
  averageWordsPerReport: z.number(),
  // CompletedGoals - количество целей, которые были выполнены пользователем
  completedGoals: z.number(),
  // CurrentStreak - текущая серия дней, когда пользователь писал каждый день
  currentStreak: z.number(),
  // ExpiredGoalsCompletionRate - процент выполненных просроченных целей
  expiredGoalsCompletionRate: z.number(),
  // GoalCompletionRate - процент завершенных целей из общего числа установленных целей
  goalCompletionRate: z.number(),
  // LongestStreak - самая длинная серия дней, когда пользователь писал каждый день
  longestStreak: z.number(),
  // MaxWordsInDay - максимальное количество слов, написанных пользователем за один день
  maxWordsInDay: z.number(),
  // MostProductiveDay - самый продуктивный день, когда пользователь написал наибольшее количество слов
  mostProductiveDay: z.string().nullable(),
  // OverachievementRate - процент целей, по которым пользователь написал больше слов, чем было запланировано
  overachievementRate: z.number(),
  // TotalBooks - общее количество книг, связанных с пользователем
  totalBooks: z.number(),
  // TotalDaysWithActivity - общее количество дней, когда у пользователя была активность (он писал слова)
  totalDaysWithActivity: z.number(),
  // TotalGoals - общее количество целей, установленных пользователем
  totalGoals: z.number(),
  // TotalReports - общее количество отчетов, отправленных пользователем
  totalReports: z.number(),
  totalWords: z.number(),
  // UserID - уникальный идентификатор пользователя
  userId: z.string().uuid(),
});

export type StatisticsUserResponseType = z.infer<
  typeof StatisticsUserResponseSchema
>;

export const StatisticsGoalResponseSchema = z.object({
  averageWordsPerReport: z.number(),
  averageWordsPerDay: z.number(),
  bookId: z.string().uuid(),
  dailyWordsRequired: z.number(),
  daysElapsed: z.number(),
  daysRemaining: z.number(),
  estimatedEndDate: z.string(),
  goalId: z.string().uuid(),
  percentageComplete: z.number(),
  remainingWords: z.number(),
  reportsCount: z.number(),
  totalWordsWritten: z.number(),
  trendComparedToTarget: z.number(),
});

export type StatisticsGoalResponseType = z.infer<
  typeof StatisticsGoalResponseSchema
>;

export const CumulativeProgressSchema = z.object({
  date: z.string(),
  totalWords: z.number(),
  targetTotalWords: z.number(),
  completionPercent: z.number(),
  goalTitle: z.string(),
  bookName: z.string(),
  bookId: z.string().uuid(),
  goalId: z.string().uuid(),
});

export type CumulativeProgressType = z.infer<typeof CumulativeProgressSchema>;

export const GoalCompletionSchema = z.object({
  goalId: z.string().uuid(),
  bookId: z.string().uuid(),
  goalTitle: z.string(),
  totalWordsWritten: z.number(),
  percentageComplete: z.number(),
  remainingWords: z.number(),
  dailyWordsRequired: z.number(),
  daysElapsed: z.number(),
  daysRemaining: z.number(),
  averageWordsPerDay: z.number(),
  reportsCount: z.number(),
  trendComparedToTarget: z.number(),
  bookTitle: z.string(),
  createdAt: z.string(),
  isFinished: z.boolean(),
  isExpired: z.boolean(),
});

export type GoalCompletionType = z.infer<typeof GoalCompletionSchema>;

export const StatisticChartResponseSchema = z.object({
  cumulativeProgress: z.array(CumulativeProgressSchema),
  goalCompletion: z.array(GoalCompletionSchema),
});

export type StatisticChartResponseType = z.infer<
  typeof StatisticChartResponseSchema
>;
