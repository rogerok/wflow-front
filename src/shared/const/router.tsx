export const routes = {
  main: () => '/',
  signIn: () => '/signIn',
  signUp: () => '/signUp',
  profile: () => '/profile',
  settings: () => '/settings',
  statistic: () => '/statistic',
  books: () => '/books',
  booksCreate: () => '/books/create',
  goals: () => '/goals',
  goalsCreate: () => '/goals/create',
  reports: () => '/reports',
} as const;
