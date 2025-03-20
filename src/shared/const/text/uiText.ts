const concatenateWords = (...args: string[]): string => args.join(' ');

export const UiTextConstant = {
  add: (entity = '') => concatenateWords('Добавить ', entity),
  back: () => 'Назад',
  create: (entity = '') => concatenateWords('Создать ', entity),
  delete: (entity = '') => concatenateWords('Удалить ', entity),
  edit: (entity = '') => concatenateWords('Редактировать ', entity),
  forward: () => 'Вперёд',
  post: (entity = '') => concatenateWords('Отправить ', entity),
  save: (entity = '') => concatenateWords('Сохранить ', entity),
  cancel: (entity = '') => concatenateWords('Отмена ', entity),
} as const;

export const NotificationText = {
  success: () => 'Успешно',
  error: () => 'Ошибка',
  authRequired: () => 'Требуется авторизация',
  notFound: () => 'Не найдено',
  serverError: () => 'Ошибка сервера',
  badRequest: () => 'Что-то пошло не так. Попробуйте обновить страницу.',
  connectionError: () => 'Ошибка. Проверьте соединение с интернетом.',
};
