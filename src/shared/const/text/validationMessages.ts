export const ValidationMessages = {
  required: () => 'Поле обязательно для заполнения.',
  invalidEmail: () => 'Неверный адрес почты.',
  emailRequired: () => 'Введите адрес электронной почты.',
  invalidPhone: () => 'Неверный формат номера телефона.',
  invalidPassword: () =>
    'Пароль должен содержать только латинские буквы, цифры и спец символы. Должны быть минимум 1 строчная, 1 заглавная, 1 цифра и 1 один спецсимвол',
  invalidData: () => 'Неверный формат данных.',
  minLength: (length: number) =>
    `Обязательно для заполнения, минимальное количество символов ${length}.`,
  maxLength: (length: number) => `Максимальное значение ${length}`,
  maxNumber: (val: number) =>
    `Значение слишком большое.Должно быть равно ${val} или меньше.`,
  datesPeriod: () => 'Дата начала не может быть больше чем дата конца.',
} as const;

export const DateValidationErrorMsg = {
  invalidDate: 'Некорректная дата',
  maxDate: 'Дата слишком поздняя',
  minDate: 'Дата слишком ранняя',
} as const;
