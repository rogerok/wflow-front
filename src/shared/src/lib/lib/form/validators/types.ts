import { ZodValidator } from './ZodValidator';
import { NoOpValidator } from './NoOpValidator';

export type ValidationResult<Values> =
  | { isSuccess: true; errorList: null }
  | { isSuccess: false; errorList: ValidationErrorsListModel<Values> };

export type ValidatorErrorModel<Values> = {
  path: keyof Values;
  error: string;
};
export type ValidationErrorsListModel<Values> = ValidatorErrorModel<Values>[];

export type SupportedValidators<
  Values extends Record<string | number, unknown>
> = ZodValidator<Values> | NoOpValidator<Values>;
