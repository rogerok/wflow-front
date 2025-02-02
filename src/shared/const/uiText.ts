const concatenateWords = (...args: string[]): string => args.join(' ');

export const UiTextConstant = {
  add: (entity = '') => concatenateWords('Добавить', entity),
  back: () => 'Назад',
  create: (entity = '') => concatenateWords('Создать', entity),
  delete: (entity = '') => concatenateWords('Удалить', entity),
  edit: (entity = '') => concatenateWords('Редактировать', entity),
  forward: () => 'Вперёд',
  post: (entity = '') => concatenateWords('Отправить', entity),
  save: (entity = '') => concatenateWords('Сохранить', entity),
} as const;
