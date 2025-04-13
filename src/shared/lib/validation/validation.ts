import { StringValidation, z } from 'zod';

import {
  DateValidationErrorMsg,
  ValidationMessages,
} from '../../const/text/validationMessages';

export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#@$!%^&*?_+=\-{}[\]:;"'<>,.()|\\`~/])[A-Za-z\d#$@!%^&*?_+=\-{}[\]:;"'<>,.()|\\`~/]{8,30}$/;

export const getInvalidStringErrorMessage = (
  validation: StringValidation,
  isFieldFilled: boolean,
): string => {
  let errorMessage = ValidationMessages.required();

  switch (validation) {
    case 'email':
      errorMessage = isFieldFilled
        ? ValidationMessages.invalidEmail()
        : ValidationMessages.emailRequired();
      break;
  }

  return errorMessage;
};

export const validateDatesPeriod = (
  from: string | null | undefined,
  to: string | null | undefined,
  fromPath: string,
  ctx: z.RefinementCtx,
): void => {
  if (from && to && new Date(from).getTime() > new Date(to).getTime()) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: ValidationMessages.datesPeriod(),
      path: [fromPath],
    });
  }
};

export const setZodErrorMap = (): void =>
  z.setErrorMap((error, ctx) => {
    let errorMessage = ctx.defaultError;

    switch (error.code) {
      case z.ZodIssueCode.custom:
        errorMessage = ValidationMessages.invalidData();
        break;

      case z.ZodIssueCode.invalid_date:
        errorMessage = DateValidationErrorMsg.invalidDate;
        break;

      case z.ZodIssueCode.invalid_type:
        errorMessage =
          ctx.data === null ? ValidationMessages.required() : ctx.defaultError;
        break;

      case z.ZodIssueCode.too_small:
        if (error.minimum === 1) {
          errorMessage = ValidationMessages.required();
        } else if (error.type === 'date') {
          errorMessage = DateValidationErrorMsg.minDate;
        } else {
          errorMessage = ValidationMessages.minLength(Number(error.minimum));
        }
        break;

      case z.ZodIssueCode.too_big:
        if (error.type === 'date') {
          errorMessage = DateValidationErrorMsg.maxDate;
        } else if (error.type === 'number') {
          errorMessage = ValidationMessages.maxNumber(Number(error.maximum));
        } else {
          errorMessage = ValidationMessages.maxLength(Number(error.maximum));
        }
        break;

      case z.ZodIssueCode.invalid_string:
        if (error.path.includes('phone') && ctx.data) {
          errorMessage = ValidationMessages.invalidPhone();
        } else {
          errorMessage = getInvalidStringErrorMessage(
            error.validation,
            !!ctx.data,
          );
        }
        break;
    }

    return {
      message: errorMessage,
    };
  });
