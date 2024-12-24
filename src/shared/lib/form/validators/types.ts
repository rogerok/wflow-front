import { NoOpValidator } from './NoOpValidator';
import { ZodValidator } from './ZodValidator';

export type ValidationResult<Values> =
  | { isSuccess: true; errorList: null }
  | { isSuccess: false; errorList: ValidationErrorsListModel<Values> };

export type ErrorPathType<Values> = {
  [key in keyof Values]: Values[key] extends Array<infer ArrayType>
    ? [key, number, ...ErrorPathType<ArrayType>]
    : [key];
}[keyof Values];

export type ValidatorErrorModel<Values> = {
  path: ErrorPathType<Values>;
  error: string;
};
export type ValidationErrorsListModel<Values> = ValidatorErrorModel<Values>[];

export type SupportedValidators<
  Values extends Record<string | number, unknown>
> = ZodValidator<Values> | NoOpValidator<Values>;
